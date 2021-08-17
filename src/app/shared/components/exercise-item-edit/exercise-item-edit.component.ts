import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from './../../../models/exercise.interface';

@Component({
  selector: 'app-exercise-item-edit',
  templateUrl: './exercise-item-edit.component.html',
  styleUrls: ['./exercise-item-edit.component.scss']
})
export class ExerciseItemEditComponent implements OnInit {

  @Output() save = new EventEmitter();

  public data: Exercise = {} as Exercise;
  public muscles: Array<string> = [
    "abs", "back", "biceps", "chest", "gluteos", "legs", "shoulders", "triceps"
  ];

  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.data = {} as Exercise;
    document.getElementById("exercise-edit").style.width = "0%";
    document.getElementById("exercise-modal").classList.add("opacity");
  }

  openModal() {
    document.getElementById("exercise-edit").style.width = "100%";
    setTimeout(() => {
      document.getElementById("exercise-modal").classList.remove("opacity");
    }, 500)
  }

  getMuscle(muscle) {
    return `assets/images/muscles/${muscle}.png`;
  }

  onSave() {
    if (!this.data.muscle) {
      alert("Músculo não informado");
      return;
    }
    else if (!this.data.name) {
      alert("Nome não informado");
      return;
    }
    else if (!this.data.sets || +this.data.sets === 0) {
      alert("Séries não informada");
      return;
    }
    else if (!this.data.reps || +this.data.reps === 0) {
      alert("Repetições não informada");
      return;
    }

    this.save.emit(this.data);
  }

}
