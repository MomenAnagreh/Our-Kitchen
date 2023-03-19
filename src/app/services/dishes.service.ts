import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { Dish } from './interfaces/dish.interface';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  private backUpDishes: Dish[] = [];
  private dishes: Dish[] = [];
  private dishes$ = new BehaviorSubject<Dish[]>(this.dishes);
  public dishList = this.dishes$.asObservable();
  file!: File;

  private backendApi: string = 'http://localhost:3001';
  private imageApi: string = this.backendApi + '/image/';
  private addImageApi: string = this.backendApi + '/adddish';

  constructor(private http: HttpClient) {}

  getDishes() {
    return this.http
      .get<Dish[]>(this.backendApi)
      .pipe(
        map((dishes: Dish[]) => {
          this.dishes = dishes.reverse();
          this.backUpDishes = this.dishes;
          this.dishes$.next(this.dishes);
        }),
        catchError((err) => of())
      )
      .subscribe();
  }

  getImage(name: string) {
    return this.imageApi + name;
  }

  addFile(name: string, description: string, price: string) {
    let data = new FormData();
    data.append('file', this.file);
    data.append('name', name);
    data.append('desc', description);
    data.append('price', price);

    this.http
      .post<Dish>(this.addImageApi, data)
      .pipe(
        map((dish: Dish) => {
          this.dishes.unshift(dish);
          this.dishes$.next(this.dishes);
        }),
        catchError((err) => of())
      )
      .subscribe();
  }

  findDish(id: number) {
    let found = {} as Dish;
    this.dishes.map((dish) => {
      if (dish.id === id) {
        found = dish;
      }
    });
    return found;
  }

  filter(name: string) {
    if (this.dishes.length === 0) {
      this.dishes = this.backUpDishes;
      this.dishes$.next(this.dishes);
    }
    if (name.length > 0) {
      this.dishes = this.dishes.filter((dish) =>
        dish.name.toLowerCase().includes(name.toLowerCase())
      );
      this.dishes$.next(this.dishes);
    } else {
      this.dishes = this.backUpDishes;
      this.dishes$.next(this.dishes);
    }
  }
}
