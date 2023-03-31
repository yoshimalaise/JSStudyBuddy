import { Injectable } from '@angular/core';
import { Exercise } from 'src/model/exercise.interface';
import { FunctionCodeObject } from 'src/model/parson-problem.interface';
import { CodeObject, CodeObjectType } from 'src/model/problem.interface';
import { ExerciseType } from '../model/exercise-types.enum';
import { ParsonsExercise } from '../model/parsons-exercise.interface';
import { ExGenerator } from './generator.interface';

@Injectable({
  providedIn: 'root'
})
export class ParsonsGeneratorService implements ExGenerator{

  constructor() { }

  isApplicable(c: CodeObject): boolean {
    return c.type === CodeObjectType.function 
      && (c as FunctionCodeObject).lines.length > 2
      && (c as FunctionCodeObject).lines.length < 30;
  }

  generate(c: CodeObject): Exercise {
    const codeObject = c as FunctionCodeObject;
    const e: ParsonsExercise = {
      title: codeObject.filename,
      exerciseType: ExerciseType.parsons,
      codeLines: codeObject.lines.map(l => ({correctLineNumber: l.line_number, currentLineNumber: l.line_number, content: l.line_content}))
    };

    // shuffle the array so the lines are out of order
    e.codeLines = e.codeLines.sort(() => (Math.random() > .5) ? 1 : -1);
    for (let i = 0; i < e.codeLines.length; i++) {
      e.codeLines[i].currentLineNumber = i + 1;
    }

    return e;
  }
}
