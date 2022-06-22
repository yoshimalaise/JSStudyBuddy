import { Exercise } from 'src/model/exercise.interface';

export interface ParsonsExercise extends Exercise {
  codeLines: ParsonCodeLine[];
}

export interface ParsonCodeLine {
  correctLineNumber: number;
  currentLineNumber: number;
  content: string;
}
