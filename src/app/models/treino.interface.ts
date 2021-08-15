import { Exercise } from "./exercise.interface";

export interface Treino {
  id?: number;
  name?: string;
  exercises?: Exercise[]
}
