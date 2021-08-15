import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home-month-scroll',
  templateUrl: './home-month-scroll.component.html',
  styleUrls: ['./home-month-scroll.component.scss']
})
export class HomeMonthScrollComponent implements AfterViewInit, OnChanges {

  @Input() inMonth: number;
  @Output() outMonth = new EventEmitter<number>();

  @ViewChild("monthScroll", { static: false }) monthScroll: ElementRef;
  @ViewChildren("monthButton") monthButton: QueryList<ElementRef>;

  public selected: any;
  public months = [
    { id: 0, description: 'Janeiro' },
    { id: 1, description: 'Fevereiro' },
    { id: 2, description: 'Março' },
    { id: 3, description: 'Abril' },
    { id: 4, description: 'Maio' },
    { id: 5, description: 'Junho' },
    { id: 6, description: 'Julho' },
    { id: 7, description: 'Agosto' },
    { id: 8, description: 'Setembro' },
    { id: 9, description: 'Outubro' },
    { id: 10, description: 'Novembro' },
    { id: 11, description: 'Dezembro' },
  ];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.inMonth) {
      this.selected = this.months.find(c => +c.id === +this.inMonth);
      this.scroolTo();
    }
  }

  ngAfterViewInit() {
    this.scroolTo();
  }

  onSelected(month) {
    this.selected = month;
    this.scroolTo();
    this.outMonth.emit(month.id);
  }

  scroolTo() {
    if (!this.monthScroll || !this.monthScroll.nativeElement || !this.selected) return;

    const center = Math.round(this.monthScroll.nativeElement.clientWidth / 2);
    this.monthScroll.nativeElement.setAttribute('style', `padding: 0 ${center}px`)

    const el = this.monthButton.find(c => c.nativeElement.innerText === this.selected.description);
    const position = el.nativeElement.offsetLeft - 145;
    this.monthScroll.nativeElement.scrollTo(position, 0);
  }

}
