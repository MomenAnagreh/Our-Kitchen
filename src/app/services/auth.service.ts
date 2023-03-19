import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Dish } from './interfaces/dish.interface';
import { SignUp } from './interfaces/signup.interface';
import {
  BackUser,
  inOrder,
  Order,
  User,
  UserOrders,
} from './interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user!: User | null;
  public initials: string = '';
  public userOrders: UserOrders[] = [];

  private backendApi: string = 'http://localhost:3001';
  private imageApi: string = this.backendApi + '/image/';

  constructor(private http: HttpClient, private router: Router) {}

  checkEmail(email: string) {
    return this.http.post(this.backendApi + '/checkemail', { email: email });
  }

  login(email: string, password: string) {
    return this.http
      .post<BackUser>(this.backendApi + '/login', {
        email: email,
        password: password,
      })
      .pipe(
        map((user: BackUser) => {
          if (!user) {
            return false;
          } else {
            this.user = {
              ...user,
              orders: [],
            };
            this.updateUserOrders(user.orders);
            this.initials = user.username.slice(0, 1).toUpperCase();
            this.updateUserStorage(true);
            return true;
          }
        }),
        catchError((err) => of(true))
      );
  }

  signup(user: SignUp) {
    return this.http
      .post<User>(this.backendApi + '/signup', {
        user,
      })
      .pipe(
        map((user: User) => {
          this.user = user;
          this.initials = user.username.slice(0, 1).toUpperCase();
          this.updateUserStorage(true);
          this.router.navigate(['']);
        }),
        catchError((err) => of())
      )
      .subscribe();
  }

  logout() {
    this.user = null;
    this.initials = '';
    this.userOrders = [];
    this.updateUserStorage(false);
    this.router.navigate(['/signin']);
  }

  deleteUser() {
    let email = this.user?.email;
    this.http
      .post(this.backendApi + '/user/delete', {
        email,
      })
      .subscribe();

    this.logout();
  }

  checkUser() {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }

  updateUserStorage(modify: boolean) {
    if (modify) {
      localStorage.setItem('user', JSON.stringify(this.user));
    } else {
      localStorage.clear();
    }
  }

  addUser(user: User) {
    this.user = user;
    this.initials = user.username.slice(0, 1).toUpperCase();
    this.prepareUserOrders();
  }

  addOrder(order: Order) {
    return this.http
      .post<number[]>(this.backendApi + '/user/addorder?', {
        order: order,
        email: this.user?.email,
      })
      .pipe(
        map((data: number[]) => {
          this.updateUserOrders(data);
        })
      )
      .subscribe();
  }

  updateUserOrders(orders: number[]) {
    return this.http
      .post<inOrder[]>(this.backendApi + '/user/orders', orders)
      .pipe(
        map((items: inOrder[]) => {
          let newOrders: inOrder[] = items.map((order: inOrder) => {
            return order;
          });

          this.user = {
            ...(this.user as User),
            orders: newOrders,
          };

          this.updateUserStorage(true);
          this.prepareUserOrders();
          return newOrders;
        })
      )
      .subscribe();
  }

  prepareUserOrders() {
    this.userOrders = [];
    this.user?.orders.map((order: Order) => {
      let newDish: UserOrders = {
        id: 0,
        quantities: order.quantities,
        date: order.date,
        dishes: [],
      };
      order.dishes.map((dishId: number) => {
        this.http
          .get<Dish>(this.backendApi + '/dish/find/' + dishId)
          .pipe(
            map((dish: Dish) => {
              dish.image = this.imageApi + dish.image;
              newDish.dishes.push(dish);
            })
          )
          .subscribe();
      });
      this.userOrders = [newDish, ...this.userOrders];
    });
  }

  deleteOrder(date: string) {
    this.http
      .post<number[]>(this.backendApi + '/orders/delete', {
        date: date,
        email: this.user?.email,
      })
      .pipe(
        map((data: number[]) => {
          this.updateUserOrders(data);
        })
      )
      .subscribe();
  }
}
