import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CheckoutGuard } from '../../core/checkout.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CartComponent },
      {
        path: 'checkout',
        loadChildren: () =>
          import('../checkout/checkout.module').then(
            (data) => data.CheckoutModule
          ),
        canActivate: [CheckoutGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class CartModule {}
