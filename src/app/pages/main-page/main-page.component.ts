import { Component, OnInit } from '@angular/core';
import { Dish } from '../../services/interfaces/dish.interface';
import { DishesService } from '../../services/dishes.service';
import { GeneralService } from '../../services/general.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  constructor(
    public dishesService: DishesService,
    public generalService: GeneralService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.dishesService.getDishes();
  }

  popup() {
    this.generalService.popupShow = true;
  }

  display(dish: Dish) {
    this.generalService.preview(dish);
  }
}
