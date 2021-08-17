import { User } from './../../../models/user.interface';
import { StorageService } from './../../../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Treino } from './../../../models/treino.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-workout-checklist',
  templateUrl: './tab-workout-checklist.component.html',
  styleUrls: ['./tab-workout-checklist.component.scss']
})
export class TabWorkoutChecklistComponent implements OnInit {

  public data: User;
  public workout: Treino = {
    exercises: []
  };

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public storage: StorageService
  ) { }

  async ngOnInit() {
    this.data = {} as Treino;

    const snapshot = await this.storage.getUser();
    if (snapshot) {
      this.data = snapshot;
    }

    const id = +this.activatedRoute.snapshot.paramMap.get('workout');
    if (!!id) {
      this.workout = this.data.myWorkouts.find(c => +c.id === +id);
    }

  }

  onCheck(res) {
    let exercises = [...this.workout.exercises];
    const index = exercises.findIndex(c => c.id === res.id);
    exercises[index].done = res.check;

    this.checkWorkout();
  }

  private checkWorkout() {
    if (this.workout.exercises.every(c => c.done)) {
      alert('PARABÉNS, Você Finalizou!');

      this.addProgress(this.formatDate());
      this.storage.setLastWorkout(+this.workout.id);

      this.router.navigate(['/appTab/tabHome']);
    }
  }

  formatDate(): string {
    const thisDate = new Date();
    const thisYear = thisDate.getFullYear();
    const thisMonth = thisDate.getMonth() + 1;
    const fMonth = (thisMonth < 10) ? `0${thisMonth}` : thisMonth;
    const thisDay = thisDate.getDate();
    const fDay = (thisDay < 10) ? `0${thisDay}` : thisDay;
    return `${thisYear}-${fMonth}-${fDay}`;
  }

  addProgress(date) {
    const dailyPregress = this.data.dailyProgress;
    if (!dailyPregress.includes(date)) {
      dailyPregress.push(date);
    }
    this.storage.setDailyProgress(dailyPregress);
  }

}
