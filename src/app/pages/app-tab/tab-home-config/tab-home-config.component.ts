import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-tab-home-config',
  templateUrl: './tab-home-config.component.html',
  styleUrls: ['./tab-home-config.component.scss'],
  providers: [TitleCasePipe]
})
export class TabHomeConfigComponent implements OnInit {

  public name: string;

  constructor(
    private titleCasePipe: TitleCasePipe,
    private router: Router,
    public storage: StorageService,
  ) { }

  ngOnInit(): void {
    this.name = this.storage.name;
  }

  onReset() {
    this.storage.clear();
    this.router.navigate(['/']);
  }

  onBlur() {
    this.name = this.titleCasePipe.transform(this.name);
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
