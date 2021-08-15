import { NgModule } from '@angular/core';
import { HomeDayScrollComponent } from './../../shared/components/home-day-scroll/home-day-scroll.component';
import { HomeDayStatusComponent } from './../../shared/components/home-day-status/home-day-status.component';
import { HomeMonthScrollComponent } from './../../shared/components/home-month-scroll/home-month-scroll.component';
import { SharedModule } from './../../shared/components/shared.module';
import { AppTabComponent } from './app-tab.component';
import { AppTabRoutingModule } from './app-tab.routing.module';
import { TabHomeConfigComponent } from './tab-home-config/tab-home-config.component';
import { TabHomeComponent } from './tab-home/tab-home.component';
import { TabMyworkoutComponent } from './tab-myworkout/tab-myworkout.component';
import { TabWorkoutComponent } from './tab-workout/tab-workout.component';

@NgModule({
  declarations: [
    AppTabComponent,
    TabHomeComponent,
    TabHomeConfigComponent,
    TabWorkoutComponent,
    TabMyworkoutComponent,
    HomeMonthScrollComponent,
    HomeDayScrollComponent,
    HomeDayStatusComponent,
  ],
  imports: [
    SharedModule,
    AppTabRoutingModule
  ],
  exports: [
    HomeMonthScrollComponent,
    HomeDayScrollComponent,
    HomeDayStatusComponent,
  ]
})
export class AppTabModule { }
