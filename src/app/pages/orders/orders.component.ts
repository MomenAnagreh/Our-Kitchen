import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Order, UserOrders } from '../../services/interfaces/user.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  public userOrders: UserOrders[] = [];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  getPrice(price: string, q: number) {
    return +price.slice(1) * q;
  }

  getTotal(order: UserOrders) {
    let subTotal = 0;
    order.dishes.forEach((dish, i) => {
      subTotal += +dish.price.slice(1) * order.quantities[i];
    });
    let service = subTotal * 0.05;
    let tax = subTotal * 0.08;
    let total = subTotal + service + tax;

    return total.toFixed(2);
  }

  delete(date: string) {
    this.authService.deleteOrder(date);
  }
}
