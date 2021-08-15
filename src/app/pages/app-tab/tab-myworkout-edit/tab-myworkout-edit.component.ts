import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from './../../../models/exercise.interface';
import { Treino } from './../../../models/treino.interface';
import { StorageService } from './../../../services/storage.service';
import { ExerciseItemEditComponent } from './../../../shared/components/exercise-item-edit/exercise-item-edit.component';

@Component({
  selector: 'app-tab-myworkout-edit',
  templateUrl: './tab-myworkout-edit.component.html',
  styleUrls: ['./tab-myworkout-edit.component.scss']
})
export class TabMyworkoutEditComponent implements OnInit {

  @ViewChild("exerciseItemEdit", { static: true }) exerciseItemEdit: ExerciseItemEditComponent;

  public workout: string;
  public data: Treino;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this.data = {} as Treino;

    this.workout = this.activatedRoute.snapshot.paramMap.get('workout');
    if (!!this.workout) {
      this.data = this.storage.myWorkouts.find(c => c.id === this.workout);
    }
  }

  get title(): string {
    return !!this.workout ? "Editar Treino" : "Novo Treino";
  }

  save() {
    if (this.data.exercises.length === 0) {
      alert("Você precisa ter pelo menos 1 exercício");
      return;
    }

    if (confirm("Deseja salvar treino?")) {
      if (!!this.data.id) {
        this.storage.editWorkout(this.data);
      } else {
        this.storage.addWorkout(this.data);
      }
    }

    this.router.navigate(['/appTab/tabMyworkout']);
  }

  onSaveExercises(data) {
    let exercises = !!this.data.exercises ? [...this.data.exercises] : [] as Exercise[];
    if (!!data.id) {
      const idx = exercises.findIndex(i => i.id === data.id);
      exercises[idx] = Object.assign({}, data);
    } else {
      data.id = exercises.length + 1;
      exercises.push(Object.assign({}, data));
    }
    this.data.exercises = exercises;
    this.exerciseItemEdit.closeModal();
  }

  onAddExercises() {
    this.exerciseItemEdit.data = [] as Exercise;
    this.exerciseItemEdit.openModal();
  }

  onEditExercises(data: Exercise) {
    this.exerciseItemEdit.data = data;
    this.exerciseItemEdit.openModal();
  }

  onDelExercises(item: Exercise) {
    let exercises = [...this.data.exercises];
    exercises = exercises.filter(i => +i.id !== +item.id)
    this.data.exercises = exercises;
  }

}
