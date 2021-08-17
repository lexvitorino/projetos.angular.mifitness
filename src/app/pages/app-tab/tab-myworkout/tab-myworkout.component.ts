import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Treino } from './../../../models/treino.interface';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-tab-myworkout',
  templateUrl: './tab-myworkout.component.html',
  styleUrls: ['./tab-myworkout.component.scss']
})
export class TabMyworkoutComponent implements OnInit {

  public myWorkouts: Treino[];

  constructor(
    private router: Router,
    public storage: StorageService
  ) { }

  async ngOnInit() {
    this.myWorkouts = [] as Treino[];
    const snapshot = await this.storage.getUser();
    if (snapshot) {
      this.myWorkouts = snapshot.myWorkouts;
    }
  }

  onAddWorkout() {
    this.router.navigate(['/appTab/tabMyworkoutEdit']);
  }

  onEditWorkout(item) {
    this.router.navigate([`/appTab/tabMyworkoutEdit/${item.id}`]);
  }

  onDelWorkout(item) {
    this.myWorkouts = this.myWorkouts.filter(i => i.id !== item.id) as Treino[];
    this.storage.setMyWorkout(this.myWorkouts);
  }

}
