import { User } from './../../../models/user.interface';
import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-home-day-status',
  templateUrl: './home-day-status.component.html',
  styleUrls: ['./home-day-status.component.scss']
})
export class HomeDayStatusComponent implements OnInit, OnDestroy {

  @Output() addProgress = new EventEmitter<string>();
  @Output() delProgress = new EventEmitter<string>();

  public isHoje: boolean = false;
  public isTreinoFeito: boolean = false;
  public isDiaDescanso: boolean = false;
  public isFuturo: boolean = false;
  public timeLeft: string;
  public data: User = {
    days: []
  };

  private month: number;
  private day: number;
  private timer: any;

  constructor(
    private router: Router,
    public storage: StorageService
  ) { }

  async getUser() {
    const snapshot = await this.storage.getUser();
    if (snapshot) {
      this.data = snapshot;
    }
  }

  async ngOnInit() {
    await this.getUser();

    const timeFunction = () => {
      const now = Date.now();

      let today = new Date();
      today.setHours(23);
      today.setMinutes(59);
      today.setSeconds(59);

      const endtoday = today.getTime();
      const diff = endtoday - now;

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) - (h * 60));
      const s = Math.floor((diff / 1000) - (m * 60) - ((h * 60) * 60));

      const fh = (h < 10) ? `0${h}` : h;
      const fm = (m < 10) ? `0${m}` : m;
      const fs = (s < 10) ? `0${s}` : s;

      this.timeLeft = `${fh}h ${fm}m ${fs}s`;
    };

    this.timer = setInterval(timeFunction, 1000);

    timeFunction();
  }

  ngOnDestroy(): void {
    if (!!this.timer) clearInterval(this.timer);
  }

  formatDate(): string {
    const thisDate = new Date(new Date().getFullYear(), this.month, this.day);
    const thisYear = thisDate.getFullYear();
    const thisMonth = thisDate.getMonth() + 1;
    const fMonth = (thisMonth < 10) ? `0${thisMonth}` : thisMonth;
    const thisDay = thisDate.getDate();
    const fDay = (thisDay < 10) ? `0${thisDay}` : thisDay;
    return `${thisYear}-${fMonth}-${fDay}`;
  }

  async refresh(month, day) {
    await this.getUser();

    this.month = month;
    this.day = day;

    this.isHoje = false;
    this.isTreinoFeito = false;
    this.isDiaDescanso = false;
    this.isFuturo = false;

    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    const dateFormat = this.formatDate();

    const thisDate = new Date(new Date().getFullYear(), month, day);
    if (thisDate.getTime() > today.getTime()) {
      this.isFuturo = true;
    } else if (!this.data.days.includes(thisDate.getDay())) {
      this.isDiaDescanso = true;
    } else {
      if (this.data.dailyProgress.includes(dateFormat)) {
        this.isTreinoFeito = true;
      } else {
        this.isTreinoFeito = false;
      }
    }
    if (thisDate.getTime() === today.getTime()) {
      this.isHoje = true;
    }
  }

  onGoToWorkout() {
    this.router.navigate(['/appTab/tabWorkout']);
  }

  onAddProgress() {
    this.addProgress.emit(this.formatDate());
  }

  onDelProgress() {
    this.delProgress.emit(this.formatDate());
  }

  get titulo(): string {
    if (this.isDiaDescanso) {
      return "Dia de descanso!";
    } else if (this.isFuturo) {
      return "Data no futuro!";
    } else if (this.isTreinoFeito) {
      return "Parabéns, você treinou!";
    } else if (!this.isHoje && !this.isTreinoFeito) {
      return "Fraco, você falhou neste dia!";
    } else if (this.isHoje && !this.isTreinoFeito) {
      return "HOJE TEM TREINO 🚀";
    }
    return "";
  }

  get subTitulo(): string {
    if (this.isHoje && !this.isTreinoFeito) {
      return `Você tem ${this.timeLeft} para treinar!`;
    }
    return "";
  }

}
