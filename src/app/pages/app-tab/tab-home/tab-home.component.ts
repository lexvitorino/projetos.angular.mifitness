import { Router } from '@angular/router';
import { AfterContentInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { StorageService } from './../../../services/storage.service';
import { HomeDayStatusComponent } from './../../../shared/components/home-day-status/home-day-status.component';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.component.html',
  styleUrls: ['./tab-home.component.scss']
})
export class TabHomeComponent implements AfterContentInit {

  @ViewChild(HomeDayStatusComponent, { static: true }) homeDayStatus: HomeDayStatusComponent;

  today = new Date();
  selectedMonth = this.today.getMonth();
  selectedDay = this.today.getDate();

  constructor(
    private router: Router,
    public storage: StorageService,
  ) { }

  ngAfterContentInit() {
    this.atualizaStatus();
  }

  private atualizaStatus() {
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
    const dailyPregress = this.storage.dailyProgress.filter(c => c != date);
    this.storage.setDailyProgress(dailyPregress);
    this.atualizaStatus();
  }

  onAddProgress(date) {
    const dailyPregress = this.storage.dailyProgress;
    if (!dailyPregress.includes(date)) {
      dailyPregress.push(date);
    }
    this.storage.setDailyProgress(dailyPregress);
    this.atualizaStatus();
  }

}
