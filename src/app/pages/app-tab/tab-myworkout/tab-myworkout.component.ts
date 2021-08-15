import { StorageService } from './../../../services/storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-myworkout',
  templateUrl: './tab-myworkout.component.html',
  styleUrls: ['./tab-myworkout.component.scss']
})
export class TabMyworkoutComponent implements OnInit {

  constructor(
    private router: Router,
    public storage: StorageService,
  ) { }

  ngOnInit() {
  }

  onAddWorkout() {
    this.router.navigate(['/appTab/tabMyworkoutEdit']);
  }

  onEditWorkout(item) {
    this.router.navigate([`/appTab/tabMyworkoutEdit/${item.id}`]);
  }

  onDelWorkout(item) {
    this.storage.delWorkout(item);
  }

}
