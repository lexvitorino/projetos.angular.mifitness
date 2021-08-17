import { User } from './../../../models/user.interface';
import { Router } from '@angular/router';
import { AfterContentInit, AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { StorageService } from './../../../services/storage.service';
import { HomeDayStatusComponent } from './../../../shared/components/home-day-status/home-day-status.component';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.component.html',
  styleUrls: ['./tab-home.component.scss']
})
export class TabHomeComponent implements AfterContentInit, OnInit {

  @ViewChild(HomeDayStatusComponent, { static: true }) homeDayStatus: HomeDayStatusComponent;

  public today = new Date();
  public selectedMonth = this.today.getMonth();
  public selectedDay = this.today.getDate();
  public data: User = {
    dailyProgress: [] as string[],
  } as User;

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

  ngAfterContentInit() {
    this.atualizaStatus();
  }

  atualizaStatus() {
    if (!!this.homeDayStatus) {
      this.homeDayStatus.refresh(this.selectedMonth, this.selectedDay);
    }
  }

  onNext() {
    this.router.navigate(['/appTab/tabHomeConfig']);
  }

  onChangeMonth(month) {
    this.selectedDay = 1;
    this.selectedMonth = month;
    this.atualizaStatus();
  }

  onChangeDay(day) {
    this.selectedDay = day;
    this.atualizaStatus();
  }

  onDelProgress(date) {
    const dailyPregress = this.data.dailyProgress.filter(c => c != date);
    this.storage.setDailyProgress(dailyPregress);
    this.atualizaStatus();
  }

  onAddProgress(date) {
    const dailyPregress = this.data.dailyProgress;
    if (!dailyPregress.includes(date)) {
      dailyPregress.push(date);
    }
    this.storage.setDailyProgress(dailyPregress);
    this.atualizaStatus();
  }

}
