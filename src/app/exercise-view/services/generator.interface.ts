import { Exercise } from 'src/model/exercise.interface';
import { CodeObject } from 'src/model/problem.interface';

export interface ExGenerator {
  /** code takes the code object, should return true if the service can generate an exercise for this code object, false otherwise */
  isApplicable(c: CodeObject): boolean;
  /** generate the exercise based on the code object */
  generate(c: CodeObject): Exercise;
}
