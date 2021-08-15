import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-home-day-scroll',
  templateUrl: './home-day-scroll.component.html',
  styleUrls: ['./home-day-scroll.component.scss']
})
export class HomeDayScrollComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() inMonth: number;
  @Input() inDay: number;
  @Output() outDay = new EventEmitter<number>();

  @ViewChild("dayScroll", { static: false }) dayScroll: ElementRef;
  @ViewChildren("dayButton") dayButton: QueryList<ElementRef>;

  public selected: any;
  public days: Array<number> = [];

  constructor(public storage: StorageService) { }

  ngOnInit(): void {
    this.getDays();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getDays();
    if (!!changes.inMonth) {
      this.selected = this.inDay;
      this.scroolTo();
    }
  }

  ngAfterViewInit() {
    this.scroolTo();
  }

  onSelected(day) {
    this.selected = day;
    this.scroolTo();
    this.outDay.emit(day);
  }

  scroolTo() {
    if (!this.dayScroll || !this.dayScroll.nativeElement || !this.selected) return;

    const center = Math.round(this.dayScroll.nativeElement.clientWidth / 2);
    this.dayScroll.nativeElement.setAttribute('style', `padding: 0 ${center}px`)

    const el = this.dayButton.find(c => +(c.nativeElement.innerText) === this.selected);
    const position = el.nativeElement.offsetLeft - 355;
    this.dayScroll.nativeElement.scrollTo(position + center, 0);
  }

  getDays() {
    this.days = [];
    const daysInMonth = new Date(new Date().getFullYear(), (this.inMonth + 1), 0).getDate();
    for (let index = 1; index <= daysInMonth; index++) {
      this.days.push(index);
    }
  }

  formatDate(day: number): string {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    let classNames: Array<string> = ["day-button"];
    let style = '';

    const thisDate = new Date(new Date().getFullYear(), this.inMonth, day);

    if (this.storage.workoutDays.includes(thisDate.getDay())) {
      if (thisDate.getTime() < today.getTime()) {
        const thisYear = thisDate.getFullYear();
        const thisMonth = thisDate.getMonth() + 1;
        const fMonth = (thisMonth < 10) ? `0${thisMonth}` : thisMonth;
        const thisDay = thisDate.getDate();
        const fDay = (thisDay < 10) ? `0${thisDay}` : thisDay;
        const dateFormat = `${thisYear}-${fMonth}-${fDay}`;
        if (this.storage.dailyProgress.includes(dateFormat)) {
          style = 'treino-feito';
        } else {
          style = 'treino-perdido';
        }
      }
    } else {
      style = 'dia-descanso';
    }

    if (thisDate.getTime() === today.getTime()) {
      style = 'hoje';
    }

    if (this.selected == day) {
      style = 'day-button-active';
    }

    classNames.push(style);
    return classNames.join(' ');
  }

}
