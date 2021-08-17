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

  public myWorkouts: Treino[];
  public workout: string;
  public data: Treino;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public storage: StorageService
  ) { }

  async ngOnInit() {
    this.data = {} as Treino;
    this.myWorkouts = [] as Treino[];

    const snapshot = await this.storage.getUser();
    if (snapshot) {
      this.myWorkouts = snapshot.myWorkouts;
    }

    this.workout = this.activatedRoute.snapshot.paramMap.get('workout');
    if (!!this.workout) {
      this.data = this.myWorkouts.find(c => +c.id === +this.workout);
    }
  }

  get title(): string {
    return !!this.workout ? "Editar Treino" : "Novo Treino";
  }

  save() {
    if (!this.data.exercises || this.data.exercises.length === 0) {
      alert("Você precisa ter pelo menos 1 exercício");
      return;
    }

    if (confirm("Deseja salvar treino?")) {
      if (!!this.data.id) {
        this.editWorkout(this.data);
      } else {
        this.addWorkout(this.data);
      }
      this.storage.setMyWorkout(this.myWorkouts);
    }

    this.router.navigate(['/appTab/tabMyworkout']);
  }

  addWorkout(workout: Treino) {
    let myWorkouts = [...this.myWorkouts];
    if (myWorkouts.findIndex(i => i.id === workout.id) < 0) {
      workout.id = (myWorkouts.length + 1).toString();
      workout.check = true;
      myWorkouts.push(workout);
    }
    this.myWorkouts = myWorkouts;
  }

  editWorkout(workout: Treino) {
    let myWorkouts = [...this.myWorkouts];
    const idx = myWorkouts.findIndex(i => i.id === workout.id);
    myWorkouts[idx] = workout;
    this.myWorkouts = myWorkouts;
  }

  onSaveExercises(data) {
    let exercises = !!this.data.exercises ? [...this.data.exercises] : [] as Exercise[];
    if (!!data.id) {
      const idx = exercises.findIndex(i => i.id === data.id);
      exercises[idx] = data;
    } else {
      data.id = exercises.length + 1;
      exercises.push(data);
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
