import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import { SideNavBarComponent } from './shared/side-nav-bar/side-nav-bar.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RightNavBarComponent } from './pages/right-nav-bar/right-nav-bar.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent, MainPageComponent, RightNavBarComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
