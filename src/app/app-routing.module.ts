import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { RegisterGuard } from './core/register.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/pages/home-page/home-page.module').then(
        (data) => data.HomePageModule
      ),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('../app/pages/sign-in/sign-in.module').then(
        (data) => data.SignInModule
      ),
    canActivate: [RegisterGuard],
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('../app/pages/register/register.module').then(
        (data) => data.RegisterModule
      ),
    canActivate: [RegisterGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('../app/pages/cart/cart.module').then((data) => data.CartModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('../app/pages/orders/orders.module').then(
        (data) => data.OrdersModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('../app/pages/account/account.module').then(
        (data) => data.AccountModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
