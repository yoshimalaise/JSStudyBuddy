import { Exercise } from 'src/model/exercise.interface';

export interface CommentSlotExercise extends Exercise {
  sanitisedBody: string;
  comments: CommentSlot[];
}

export interface CommentSlot {
  isBlock: boolean;
  text: string;
  order: number;
}
