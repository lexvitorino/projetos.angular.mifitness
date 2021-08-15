import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppTabComponent } from './app-tab.component';
import { TabHomeConfigComponent } from './tab-home-config/tab-home-config.component';
import { TabHomeComponent } from './tab-home/tab-home.component';
import { TabMyworkoutComponent } from './tab-myworkout/tab-myworkout.component';
import { TabWorkoutComponent } from './tab-workout/tab-workout.component';

const routes: Routes = [
  {
    path: '',
    component: AppTabComponent,
    children: [
      { path: 'tabHome', component: TabHomeComponent },
      { path: 'tabHomeConfig', component: TabHomeConfigComponent },
      { path: 'tabWorkout', component: TabWorkoutComponent },
      { path: 'tabMyworkout', component: TabMyworkoutComponent },
      { path: '', pathMatch: 'full', redirectTo: 'tabHome' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppTabRoutingModule { }
