import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../../services/storage.service';
import { WorkoutsService } from './../../../services/workouts.service';

@Component({
  selector: 'app-starter-recommendations',
  templateUrl: './starter-recommendations.component.html',
  styleUrls: ['./starter-recommendations.component.scss']
})
export class StarterRecommendationsComponent implements OnInit {

  workouts: Array<any> = [];

  constructor(
    private router: Router,
    public storage: StorageService,
    public workoutsService: WorkoutsService
  ) { }

  ngOnInit() {
    this.workoutsService.getPresetWorkouts().subscribe(resp => this.workouts = resp);
  }

  get actionText(): string {
    return this.storage.myWorkouts.length > 0 ? 'Concluir' : 'Ignorar';
  }

  onFinished() {
    this.router.navigate(['/appTab']);
  }

  onAddWorkout(item) {
    if (this.storage.myWorkouts.findIndex(i => i.id === item.id) < 0) {
      this.storage.addWorkout(item);
    } else {
      this.storage.delWorkout(item);
    }
  }

}
