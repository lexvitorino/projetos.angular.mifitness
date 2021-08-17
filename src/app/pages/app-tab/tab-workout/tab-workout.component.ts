import { User } from './../../../models/user.interface';
import { Treino } from './../../../models/treino.interface';
import { StorageService } from './../../../services/storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-workout',
  templateUrl: './tab-workout.component.html',
  styleUrls: ['./tab-workout.component.scss']
})
export class TabWorkoutComponent implements OnInit {

  public data: User = {
    myWorkouts: [],
    lastWorkout: 0
  };

  constructor(
    private router: Router,
    public storage: StorageService,
  ) { }

  async ngOnInit() {
    const snapshot = await this.storage.getUser();
    if (snapshot) {
      this.data = snapshot;
    }
  }

  onGo(workout) {
    this.router.navigate([`/appTab/tabWorkoutChecklist/${workout.id}`]);
  }

  get last(): Treino {
    const id = +this.data.lastWorkout;
    if (!id) return null;
    return this.data.myWorkouts.find(c => +c.id === +id);
  }

}
