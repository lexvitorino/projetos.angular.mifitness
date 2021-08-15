import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Exercise } from './../../../models/exercise.interface';
import { StorageService } from './../../../services/storage.service';
import { ExerciseItemEditComponent } from './../exercise-item-edit/exercise-item-edit.component';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.scss']
})
export class ExerciseItemComponent implements OnInit, AfterContentInit {

  @Input() item: Exercise;

  @Output() edit = new EventEmitter();
  @Output() del = new EventEmitter();

  included: boolean = false;

  constructor(private storage: StorageService) { }

  ngAfterContentInit(): void {
  }

  ngOnInit() {

  }

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
