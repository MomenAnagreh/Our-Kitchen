import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';

@NgModule({
  declarations: [SideNavBarComponent, TopNavBarComponent],
  exports: [SideNavBarComponent, TopNavBarComponent],
  imports: [CommonModule],
})
export class SharedModule {}
