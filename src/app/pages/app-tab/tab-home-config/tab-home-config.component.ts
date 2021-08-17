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

  public data: any;

  constructor(
    private titleCasePipe: TitleCasePipe,
    private router: Router,
    public storage: StorageService,
  ) { }

  async ngOnInit() {
    this.data = { name: "" };
    const snapshot = await this.storage.getUser();
    console.log(snapshot);
    if (snapshot) {
      this.data = snapshot;
    }
  }

  onSave() {
    if (confirm("Deseja realmente alterar dados?")) {
      this.storage.setUser({
        email: btoa(this.data.email),
        name: btoa(this.data.name),
        level: btoa(this.data.level),
        days: btoa(this.storage.stringify(this.data.days)),
      });
    }
  }

  onReset() {
    if (confirm("Deseja realmente limpar dados?")) {
      this.storage.clear(this.data);
      this.router.navigate(['/']);
    }
  }

  onBlur() {
    this.data.name = this.titleCasePipe.transform(this.data.name);
  }

  onToggleDay(day: number) {
    let days = [...this.data.days];
    if (!this.workoutDayExist(day)) {
      days.push(day);
    } else {
      days = days.filter(f => f != day);
    }
    this.data.days = days;
  }

  workoutDayExist(day): boolean {
    if (!this.data.days) return false;
    return this.data.days.includes(day);
  }
}
