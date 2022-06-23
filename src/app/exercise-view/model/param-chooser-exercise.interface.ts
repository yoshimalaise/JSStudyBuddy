import { Exercise } from 'src/model/exercise.interface';

export interface ParamChooserExercise extends Exercise {
  sanitisedBody: string;
  rawBody: string;
  params: string[];
}
