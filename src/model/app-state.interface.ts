import { Exercise } from './exercise.interface';
import { CodeObject } from './problem.interface';

export interface AppState {
  currProblemSet: string;
  codeObjects: CodeObject[];
  exercise: Exercise;
}
