import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
  },
];

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, MatIconModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersModule {}
