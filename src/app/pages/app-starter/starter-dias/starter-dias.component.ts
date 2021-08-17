import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-starter-dias',
  templateUrl: './starter-dias.component.html',
  styleUrls: ['./starter-dias.component.scss']
})
export class StarterDiasComponent implements OnInit {

  public name: string;
  public workoutDays: Array<any> = [];

  constructor(
    private router: Router,
    public storage: StorageService
  ) { }

  async ngOnInit() {
    this.name = this.storage.name.split(' ')[0];

    const snapshot = await this.storage.getUser();
    this.workoutDays = [];
    if (snapshot && snapshot.days) {
      this.workoutDays = snapshot.days;
    }
  }

  onNext() {
    if (this.workoutDays.length === 0) {
      alert("Você precisa treinar pelo menos um dia!");
      return;
    }

    this.storage.setWorkoutDays(this.workoutDays);
    this.router.navigate(['/starterNivel']);
  }

  onToggleDay(day: number) {
    let newWorkoutDays = [...this.workoutDays];
    if (!this.workoutDayExist(day)) {
      newWorkoutDays.push(day);
    } else {
      newWorkoutDays = newWorkoutDays.filter(f => f != day);
    }
    this.workoutDays = newWorkoutDays;
  }

  workoutDayExist(day): boolean {
    if (!this.workoutDays) return false;
    return this.workoutDays.includes(day);
  }

}
