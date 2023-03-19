import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-right-nav-bar',
  templateUrl: './right-nav-bar.component.html',
  styleUrls: ['./right-nav-bar.component.css'],
})
export class RightNavBarComponent implements OnInit {
  quantity: number = 1;

  constructor(public generalService: GeneralService) {}

  ngOnInit(): void {}

  addToCart() {
    this.generalService.addToCart(this.quantity);
  }
}
