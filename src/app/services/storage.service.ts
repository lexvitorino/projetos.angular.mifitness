import { Treino } from './../models/treino.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clear() {
    localStorage.clear();
  }

  setName(name) {
    localStorage.setItem('mif.name', name);
  }

  get name(): string {
    return localStorage.getItem('mif.name');
  }

  setDailyProgress(dailyProgress: string[]) {
    localStorage.setItem('mif.dailyProgress', JSON.stringify(dailyProgress));
  }

  get dailyProgress(): string[] {
    if (!localStorage.getItem('mif.dailyProgress')) return [];
    return JSON.parse(localStorage.getItem('mif.dailyProgress'))
  }

  delProgress(date) {
    const dailyPregress = this.dailyProgress.filter(c => c != date);
    this.setDailyProgress(dailyPregress);
  }

  addProgress(date) {
    const dailyPregress = this.dailyProgress;
    if (!dailyPregress.includes(date)) {
      dailyPregress.push(date);
    }
    this.setDailyProgress(dailyPregress);
  }

  setLevel(level: string) {
    localStorage.setItem('mif.level', level);
  }

  get level(): string {
    return localStorage.getItem('mif.level');
  }

  get isBeginner(): boolean {
    return this.level === 'beginner';
  }

  get isIntermediate(): boolean {
    return this.level === 'intermediate';
  }

  get isAdvanced(): boolean {
    return this.level === 'advanced';
  }

  setWorkoutDays(workoutDays: number[]) {
    localStorage.setItem('mif.workoutDays', JSON.stringify(workoutDays));
  }

  get workoutDays(): number[] {
    if (!localStorage.getItem('mif.workoutDays')) return [];
    return JSON.parse(localStorage.getItem('mif.workoutDays'));
  }

  workoutDayExist(day): boolean {
    if (!this.workoutDays) return false;
    return this.workoutDays.includes(day);
  }

  get myWorkouts(): any[] {
    if (!localStorage.getItem('mif.myWorkouts')) return [] as Treino[];
    return JSON.parse(localStorage.getItem('mif.myWorkouts'));
  }

  addWorkout(workout: Treino) {
    let myWorkouts = [...this.myWorkouts];
    if (myWorkouts.findIndex(i => i.id === workout.id) < 0) {
      myWorkouts.push(workout);
    }
    localStorage.setItem('mif.myWorkouts', JSON.stringify(myWorkouts));
  }

  editWorkout(workout: Treino) {
    let myWorkouts = [...this.myWorkouts];
    const idx = myWorkouts.findIndex(i => i.id === workout.id);
    myWorkouts[idx] = workout;
    localStorage.setItem('mif.my  Workouts', JSON.stringify(myWorkouts));
  }

  delWorkout(workout: Treino) {
    let myWorkouts = this.myWorkouts.filter(i => i.id !== workout.id) as Treino[];
    localStorage.setItem('mif.myWorkouts', JSON.stringify(myWorkouts));
  }

  setLastWorkout(id: number) {
    localStorage.setItem('mif.lastWorkout', id.toString());
  }

  get last(): Treino {
    const id = +localStorage.getItem('mif.lastWorkout');
    if (!id) return null;
    return this.myWorkouts.find(c => +c.id === +id);
  }

  get funnyPhrase(): string {
    switch (this.workoutDays.length) {
      case 1:
        return "Só 1 dia não vai adiantar muito, mas...";
      case 2:
        return "2 dias eu acho pouco, mas quem sou eu pra te julgar?";
      case 3:
        return "Legal, 3 dias dá pro  gasto...";
      case 4:
        return "Legal, 4 dias vai ser TOP!";
      case 5:
        return "É isso ai, 5 dias é o mínimo, lets GO!";
      case 6:
        return "É, 6 dias não é pra todo mundo!";
      case 7:
        return "Wooow! Todo dia?! WTF!?";
    }
  }

}
