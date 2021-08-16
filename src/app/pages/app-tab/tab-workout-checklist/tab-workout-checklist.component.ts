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

  public workout: number;
  public data: Treino;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this.data = {} as Treino;

    this.workout = +this.activatedRoute.snapshot.paramMap.get('workout');
    if (!!this.workout) {
      this.data = this.storage.myWorkouts.find(c => +c.id === +this.workout);
    }

  }

  onCheck(res) {
    let exercises = [...this.data.exercises];
    const index = exercises.findIndex(c => c.id === res.id);
    exercises[index].done = res.check;

    this.checkWorkout();
  }

  private checkWorkout() {
    if (this.data.exercises.every(c => c.done)) {
      alert('PARABÉNS, Você Finalizou!');

      this.storage.addProgress(this.formatDate());
      this.storage.setLastWorkout(this.data.id);

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

}
