import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from './../../../models/exercise.interface';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.scss']
})
export class ExerciseItemComponent {

  @Input() item: Exercise;

  @Output() edit = new EventEmitter();
  @Output() del = new EventEmitter();

  included: boolean = false;

  constructor() { }

  imgMuscle(): string {
    return `assets/images/muscles/${this.item.muscle}.png`;
  }

  onEdit() {
    this.edit.emit(this.item);
  }

  onDel() {
    this.del.emit(this.item);
  }

}
