import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { RightNavBarComponent } from '../right-nav-bar/right-nav-bar.component';
import { AddPopupComponent } from '../add-popup/add-popup.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  declarations: [
    HomePageComponent,
    MainPageComponent,
    RightNavBarComponent,
    AddPopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class HomePageModule {}
