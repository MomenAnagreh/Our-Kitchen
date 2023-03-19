import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { DishesService } from '../../services/dishes.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css'],
})
export class TopNavBarComponent implements OnInit {
  one: string = 'innerWrappOne';
  two: string = 'innerWrappTwo';
  search: string = '';

  constructor(
    public authService: AuthService,
    public generalService: GeneralService,
    private dishesService: DishesService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

  getCount() {
    let count = Object.keys(this.generalService.cart).length;
    return count;
  }

  filter() {
    this.dishesService.filter(this.search);
  }

  getUrl() {
    return this.router.url === '/signin' || this.router.url === '/signup'
      ? false
      : true;
  }
}
