import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DishesService } from '../../services/dishes.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  subtotal: number = 0;
  service: number = 0;
  tax: number = 0;
  total: number = 0;

  constructor(
    public generalService: GeneralService,
    public dishService: DishesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editPrices();
  }

  getDish(id: number) {
    return this.dishService.findDish(id);
  }

  getImage(id: number) {
    let image = this.dishService.findDish(id).image;
    return this.dishService.getImage(image);
  }

  getPrice(key: string, q: number) {
    let price = this.getDish(+key).price.slice(1);
    return +price * q;
  }

  changeQ(key: string, e: any) {
    this.generalService.changeQ(key, e.target.value);
    this.editPrices();
  }

  delete(key: string) {
    this.generalService.delete(key);
    this.editPrices();
  }

  editPrices() {
    this.subtotal = 0;
    for (const [key, value] of Object.entries(this.generalService.cart)) {
      let dish = this.dishService.findDish(+key);
      let total = +dish.price.slice(1) * value;
      this.subtotal += total;
    }

    this.service = this.subtotal * 0.05;
    this.tax = this.subtotal * 0.08;
    this.total = this.subtotal + this.service + this.tax;
  }

  checkout() {
    this.generalService.checkout = {
      subtotal: this.subtotal,
      service: this.service,
      tax: this.tax,
      total: this.total,
    };
    this.router.navigate(['cart/checkout']);
  }
}
