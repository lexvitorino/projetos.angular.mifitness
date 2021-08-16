import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from './../../../models/exercise.interface';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-checklist-exercise',
  templateUrl: './checklist-exercise.component.html',
  styleUrls: ['./checklist-exercise.component.scss']
})
export class ChecklistExerciseComponent implements OnInit {

  @Input() index: number;
  @Input() item: Exercise;

  @Output() check = new EventEmitter();

  constructor(private storage: StorageService) { }

  ngOnInit() {

  }

  imgMuscle(): string {
    return `assets/images/muscles/${this.item.muscle}.png`;
  }

  onCheck(check) {
    this.check.emit({
      id: this.item.id,
      check
    });
  }

}
