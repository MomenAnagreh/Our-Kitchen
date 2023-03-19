import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Our-Kitchen';

  constructor(
    private authService: AuthService,
    public generalService: GeneralService,
    private router: Router
  ) {}

  ngOnInit() {
    let user = localStorage.getItem('user');
    let cart = localStorage.getItem('cart');
    if (user) {
      this.authService.addUser(JSON.parse(user));
    }
    if (cart) {
      let cartLength = Object.keys(JSON.parse(cart)).length;
      if (cartLength) {
        this.generalService.cart = JSON.parse(cart);
        this.router.navigate(['']);
      }
    }
  }
}
