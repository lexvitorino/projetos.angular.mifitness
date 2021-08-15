import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-starter-dias',
  templateUrl: './starter-dias.component.html',
  styleUrls: ['./starter-dias.component.scss']
})
export class StarterDiasComponent implements OnInit {

  public name: string;

  constructor(
    private router: Router,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this.name = this.storage.name.split(' ')[0];
  }

  onNext() {
    if (this.storage.workoutDays.length === 0) {
      alert("Você precisa treinar pelo menos um dia!");
      return;
    }

    this.router.navigate(['/starterNivel']);
  }

  onToggleDay(day: number) {
    let newWorkoutDays = [...this.storage.workoutDays];
    if (!this.storage.workoutDayExist(day)) {
      newWorkoutDays.push(day);
    } else {
      newWorkoutDays = newWorkoutDays.filter(f => f != day);
    }
    this.storage.setWorkoutDays(newWorkoutDays);
  }

}
