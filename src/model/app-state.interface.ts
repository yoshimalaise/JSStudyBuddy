import { Exercise } from './exercise.interface';
import { Presentation } from './presentation.interface';
import { CodeObject } from './problem.interface';

export interface AppState {
  currProblemSet: string;
  codeObjects: CodeObject[];
  presentations: Presentation[];
  exercise: Exercise;
  selectedPresentation: Presentation
}
