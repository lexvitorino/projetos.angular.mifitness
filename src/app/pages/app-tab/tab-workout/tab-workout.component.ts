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

  constructor(
    private router: Router,
    public storage: StorageService,
  ) { }

  ngOnInit() {
  }

  onGo(workout) {
    this.router.navigate([`/appTab/tabWorkoutChecklist/${workout.id}`]);
  }

}
