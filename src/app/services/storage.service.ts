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

  get myWorkouts(): any[] {
    if (!localStorage.getItem('mif.myWorkouts')) return [];
    return JSON.parse(localStorage.getItem('mif.myWorkouts'));
  }

  addWorkout(item) {
    let myWorkouts = [...this.myWorkouts];
    if (myWorkouts.findIndex(i => i.id === item.id) < 0) {
      myWorkouts.push(item);
    }
    localStorage.setItem('mif.myWorkouts', JSON.stringify(myWorkouts));
  }

  delWorkout(item) {
    let myWorkouts = this.myWorkouts.filter(i => i.id !== item.id);
    localStorage.setItem('mif.myWorkouts', JSON.stringify(myWorkouts));
  }

}
