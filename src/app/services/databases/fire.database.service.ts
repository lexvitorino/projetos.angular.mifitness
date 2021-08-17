import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cloneable } from '../cloneable .service';
import { Treino } from './../../models/treino.interface';
import { User } from './../../models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class FireDatabaseService {

  public user: User;

  private password = "123456";

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFirestore
  ) { }

  clear({ name, email }) {
    this.db.collection('users').doc(this.id).set({ name, email }).then(() => {
      localStorage.clear();
    });
  }

  stringify(data) {
    return JSON.stringify(data, (key, value) => {
      if (Array.isArray(value) && value.length === 0) {
        return { ...value }; // Converts empty array with string properties into a POJO
      }
      return value;
    });
  }

  get id(): string {
    return localStorage.getItem('mif.id');
  }

  setId(id) {
    localStorage.setItem('mif.id', id);
  }

  get name(): string {
    return localStorage.getItem('mif.name');
  }

  setName(name) {
    localStorage.setItem('mif.name', name);
  }

  get email(): string {
    return localStorage.getItem('mif.email');
  }

  setEmail(email) {
    localStorage.setItem('mif.email', email);
  }

  signIn(): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(this.email, this.password);
  }

  signOut(): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(this.email, this.password);
  }

  setUser(data: any): Promise<any> {
    return this.db.collection('users').doc(this.id).set(data, { merge: true });
  }

  getUser(force: boolean = false): Promise<User> {

    if (!!this.user && !force) {
      return of(this.user).toPromise();
    }

    return this.db.collection('users').doc(this.id).get()
      .pipe(
        map((res: any) => {
          if (!res.data()) {
            return {
              name: '',
              email: '',
              level: '',
              lastWorkout: 0,
              dailyProgress: [] as string[],
              days: [] as number[],
              myWorkouts: [] as Treino[],
            } as User;
          }

          let myWorkouts: Treino[] = [];
          if (res.data().myWorkouts) {
            myWorkouts = res.data().myWorkouts ? JSON.parse(atob(res.data().myWorkouts)) as Treino[] : [] as Treino[];
            myWorkouts.forEach(workout => {
              workout.exercises = JSON.parse(atob(workout.exercises));
            });
          }

          let dailyProgress: string[] = [];
          if (res.data().dailyProgress) {
            dailyProgress = res.data().dailyProgress ? JSON.parse(atob(res.data().dailyProgress)) as string[] : [] as string[]
          }

          let days: number[] = [];
          if (res.data().days) {
            days = res.data().days ? JSON.parse(atob(res.data().days)) as number[] : [] as number[]
          }

          let name: string = "";
          if (res.data().name) {
            name = res.data().name ? atob(res.data().name) : '';
          }

          let email: string = "";
          if (res.data().email) {
            email = res.data().email ? atob(res.data().email) : '';
          }

          let level: string = "";
          if (res.data().level) {
            level = res.data().name ? atob(res.data().level) : '';
          }

          let lastWorkout: number = 0;
          if (res.data().lastWorkout) {
            lastWorkout = res.data().lastWorkout ? +atob(res.data().lastWorkout) : 0;
          }

          this.user = {
            name, email, level, days, myWorkouts, dailyProgress, lastWorkout
          } as User;

          return this.user;
        })
      ).toPromise();
  }

  setUserNameEEmail(name: string, email: string) {
    this.user.name = name;
    this.user.email = email;
    return this.setUser({ 'name': btoa(name), 'email': btoa(email) });
  }

  setLevel(level: string): Promise<any> {
    this.user.level = level;
    const b4level = btoa(level);
    return this.setUser({ 'level': b4level });
  }

  setWorkoutDays(days: number[]) {
    this.user.days = days;
    return this.setUser({ 'days': btoa(this.stringify(days)) });
  }

  getPresetWorkouts(): AngularFirestoreCollection<any> {
    return this.db.collection('preset-workouts');
  }

  setMyWorkout(myWorkouts: Treino[]): Promise<any> {
    this.user.myWorkouts = [];
    myWorkouts.forEach(workout => {
      this.user.myWorkouts.push(Cloneable.deepCopy(workout));
      workout.exercises = btoa(this.stringify(workout.exercises));
    });
    return this.setUser({ 'myWorkouts': btoa(this.stringify(myWorkouts)) });
  }

  setDailyProgress(dailyProgress: string[]) {
    this.user.dailyProgress = dailyProgress;
    return this.setUser({ 'dailyProgress': btoa(this.stringify(dailyProgress)) });
  }

  setLastWorkout(id: number) {
    return this.setUser({ 'lastWorkout': btoa(id.toString()) });
  }

}
