import { Treino } from './../../../models/treino.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-starter-recommendations',
  templateUrl: './starter-recommendations.component.html',
  styleUrls: ['./starter-recommendations.component.scss']
})
export class StarterRecommendationsComponent implements OnInit {

  workouts: Treino[] = [];
  myWorkouts: Treino[] = [];

  constructor(
    private router: Router,
    public storage: StorageService,
  ) { }

  async ngOnInit() {
    this.storage.getPresetWorkouts().valueChanges().subscribe(res => {
      this.workouts = res;
    })
  }

  get actionText(): string {
    return this.myWorkouts.length > 0 ? 'Concluir' : 'Ignorar';
  }

  onFinished() {
    this.storage.setMyWorkout(this.myWorkouts);
    this.router.navigate(['/appTab']);
  }

  onWorkout(workout: Treino) {
    let myWorkouts = [...this.myWorkouts];
    if (myWorkouts.findIndex(i => i.id === workout.id) < 0) {
      myWorkouts.push(workout);
    } else {
      myWorkouts = this.myWorkouts.filter(i => i.id !== workout.id) as Treino[];
    }
    this.myWorkouts = myWorkouts;
  }

}
