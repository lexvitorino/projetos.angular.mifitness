import { NgModule } from '@angular/core';
import { ChecklistExerciseComponent } from './../../shared/components/checklist-exercise/checklist-exercise.component';
import { ExerciseItemEditComponent } from './../../shared/components/exercise-item-edit/exercise-item-edit.component';
import { ExerciseItemComponent } from './../../shared/components/exercise-item/exercise-item.component';
import { HomeDayScrollComponent } from './../../shared/components/home-day-scroll/home-day-scroll.component';
import { HomeDayStatusComponent } from './../../shared/components/home-day-status/home-day-status.component';
import { HomeMonthScrollComponent } from './../../shared/components/home-month-scroll/home-month-scroll.component';
import { SharedModule } from './../../shared/components/shared.module';
import { AppTabComponent } from './app-tab.component';
import { AppTabRoutingModule } from './app-tab.routing.module';
import { TabHomeConfigComponent } from './tab-home-config/tab-home-config.component';
import { TabHomeComponent } from './tab-home/tab-home.component';
import { TabMyworkoutEditComponent } from './tab-myworkout-edit/tab-myworkout-edit.component';
import { TabMyworkoutComponent } from './tab-myworkout/tab-myworkout.component';
import { TabWorkoutChecklistComponent } from './tab-workout-checklist/tab-workout-checklist.component';
import { TabWorkoutComponent } from './tab-workout/tab-workout.component';

@NgModule({
  declarations: [
    AppTabComponent,
    TabHomeComponent,
    TabHomeConfigComponent,
    TabWorkoutComponent,
    TabWorkoutChecklistComponent,
    TabMyworkoutEditComponent,
    TabMyworkoutComponent,
    HomeMonthScrollComponent,
    HomeDayScrollComponent,
    HomeDayStatusComponent,
    ExerciseItemComponent,
    ExerciseItemEditComponent,
    ChecklistExerciseComponent
  ],
  imports: [
    SharedModule,
    AppTabRoutingModule
  ],
  exports: [
    HomeMonthScrollComponent,
    HomeDayScrollComponent,
    HomeDayStatusComponent,
    ExerciseItemComponent,
    ExerciseItemEditComponent,
    ChecklistExerciseComponent,
  ]
})
export class AppTabModule { }
