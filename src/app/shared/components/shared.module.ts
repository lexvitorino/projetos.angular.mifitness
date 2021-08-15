import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StackComponent } from './stack/stack.component';
import { WorkoutComponent } from './workout/workout.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [
    StackComponent,
    WorkoutComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    StackComponent,
    WorkoutComponent,
  ],
  providers: [
  ]
})
export class SharedModule { }
