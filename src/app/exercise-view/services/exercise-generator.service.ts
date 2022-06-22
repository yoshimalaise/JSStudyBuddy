import { Injectable } from '@angular/core';
import { Exercise } from 'src/model/exercise.interface';
import { CodeObject } from 'src/model/problem.interface';
import { state } from 'src/state/state';
import { ExGenerator } from './generator.interface';
import { ParsonsGeneratorService } from './parsons-generator.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseGeneratorService {
  generators: ExGenerator[] = [];

  constructor(parsons: ParsonsGeneratorService) {
    this.generators =  [parsons];
   }

  nextExercise(): Exercise {
    // first select a random code oject from the list
    const selectedCodeObject = this.determineNext();

    // then select an applicable generator to generate the exercise
    const applicableGenerators = this.generators.filter(g => g.isApplicable(selectedCodeObject));
    const selectedGenerator = applicableGenerators[Math.floor((Math.random()*applicableGenerators.length))];
    return selectedGenerator.generate(selectedCodeObject);
  }

  /**
   * TODO: use the Leitner principle here instead of random
   */
  private determineNext(): CodeObject {
    const codeObjects = state.codeObjects;
    return codeObjects[Math.floor((Math.random()*codeObjects.length))];
  }
}
