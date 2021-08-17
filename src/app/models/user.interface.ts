import { Treino } from './treino.interface';

export interface User {
  name?: string;
  email?: string;
  level?: string;
  lastWorkout?: number;
  days?: number[];
  myWorkouts?: Treino[];
  dailyProgress?: string[];
}
