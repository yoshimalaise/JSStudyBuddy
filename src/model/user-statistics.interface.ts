import { Exercise } from './exercise.interface';

export interface UserStatistics {
  entries: UserEntry[];
}

export interface UserEntry {
  exercise: Exercise;
  timestamp: Date;
  duration: string;
}
