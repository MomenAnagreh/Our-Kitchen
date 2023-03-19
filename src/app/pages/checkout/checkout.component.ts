import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DishesService } from '../../services/dishes.service';
import { GeneralService } from '../../services/general.service';
import { Order } from '../../services/interfaces/user.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  form!: FormGroup;
  prices: any = {
    subtotal: 0,
    service: 0,
    tax: 0,
    total: 0,
  };
  spinner: boolean = false;
  done: boolean = false;

  get card(): FormControl {
    return this.form.get('card') as FormControl;
  }
  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get exp(): FormControl {
    return this.form.get('exp') as FormControl;
  }
  get sc(): FormControl {
    return this.form.get('sc') as FormControl;
  }

  constructor(
    public generalService: GeneralService,
    public dishService: DishesService,
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.prices = this.generalService.checkout;
    this.form = this.fb.group({
      card: [
        '',
        [Validators.required, Validators.minLength(19), this.checkCard],
      ],
      name: ['', [this.checkInput(5)]],
      exp: ['', [this.checkInput(7)]],
      sc: ['', [this.checkInput(3)]],
    });
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
    this.generalService.cart = {
      ...this.generalService.cart,
      [key]: e.target.value,
    };
    this.editPrices();
  }

  delete(key: string) {
    delete this.generalService.cart[key];
    this.editPrices();
  }

  editPrices() {
    this.prices.subtotal = 0;
    for (const [key, value] of Object.entries(this.generalService.cart)) {
      let dish = this.dishService.findDish(+key);
      let total = +dish.price.slice(1) * value;
      this.prices.subtotal += total;
    }

    this.prices.service = this.prices.subtotal * 0.05;
    this.prices.tax = this.prices.subtotal * 0.08;
    this.prices.total =
      this.prices.subtotal + this.prices.service + this.prices.tax;
  }

  pay() {
    this.generalService.spinner = false;
    this.spinner = true;
    let date = '' + this.datePipe.transform(new Date(), 'MMM d, y', 'es-ES');
    let time = '' + this.datePipe.transform(new Date(), 'h:mm a', 'es-ES');

    let order: Order = {
      dishes: [],
      quantities: Object.values(this.generalService.cart),
      date: date + ' at ' + time,
    };
    Object.keys(this.generalService.cart).forEach((key) => {
      order.dishes.push(+key);
    });

    setTimeout(() => {
      this.authService.addOrder(order);
      this.spinner = false;
      this.generalService.cart = {};
      this.generalService.checkout = {
        subtotal: 0,
        service: 0,
        tax: 0,
        total: 0,
      };
      this.done = true;
      this.generalService.spinner = true;
    }, 3000);

    setTimeout(() => {
      this.router.navigate(['/orders']);
    }, 6000);
  }

  private checkCard(control: AbstractControl) {
    let length = control.value.length;
    if (length === 4 || length === 9 || length === 14) {
      let newValue = control.value + ' ';
      control.setValue(newValue);
    }
  }

  private checkInput(num: number) {
    let result = {
      valid: false,
    };
    return (control: FormControl) => {
      let value = control.value.split(' ').join('');
      if (value.length >= num) {
        result.valid = true;
        if (num === 7) {
          let date = new Date();
          if (+value.slice(0, 4) === date.getFullYear()) {
            if (+value.slice(5) < date.getMonth() + 1) {
              result.valid = false;
            }
          } else if (+value.slice(0, 4) < date.getFullYear()) {
            result.valid = false;
          }
        }
      }
      return result;
    };
  }
}
