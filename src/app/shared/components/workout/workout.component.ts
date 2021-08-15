import { StorageService } from './../../../services/storage.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  @Input() item: any;

  @Input() showAdd: boolean = true;
  @Input() showEdit: boolean = false;
  @Input() showDel: boolean = false;

  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() del = new EventEmitter();

  muscleGroups: Array<any> = [];
  included: boolean = false;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.muscleGroups = [];
    for (let i in this.item.exercises) {
      if (!this.muscleGroups.includes(this.item.exercises[i].muscle)) {
        this.muscleGroups.push(this.item.exercises[i].muscle);
      }
    }
  }

  imgMuscle(img): string {
    return `assets/images/muscles/${img}.png`;
  }

  get imgAction(): string {
    this.included = this.storage.myWorkouts.findIndex(c => c.id === this.item.id) >= 0;
    return `assets/images/icons/` + (!this.included ? "add.png" : "check-black.png");
  }

  onAdd() {
    this.included = !this.included;
    this.add.emit(this.item);
  }

  onEdit() {
    this.edit.emit(this.item);
  }

  onDel() {
    this.del.emit(this.item);
  }

}
