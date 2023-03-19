import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from './interfaces/dish.interface';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private backendApi: string = 'http://localhost:3001';
  private imageApi: string = this.backendApi + '/image/';
  popupShow: boolean = false;
  cart: Record<string, any> = {};
  checkout = {
    subtotal: 0,
    service: 0,
    tax: 0,
    total: 0,
  };

  display!: Dish;
  spinner: boolean = true;

  constructor(private http: HttpClient) {}

  preview(dish: Dish) {
    this.display = {
      id: dish.id,
      name: dish.name,
      desc: dish.desc,
      image: this.imageApi + dish.image,
      price: dish.price,
    };
  }

  addToCart(q: number) {
    let id = this.display.id;
    if (this.cart[id] > 0) {
      this.cart[id] += 1;
    } else {
      this.cart[id] = q;
    }
    this.editCartStorage();
  }

  changeQ(key: string, value: string) {
    this.cart = {
      ...this.cart,
      [key]: value,
    };
    this.editCartStorage();
  }

  delete(key: string) {
    delete this.cart[key];
    this.editCartStorage();
  }

  editCartStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
