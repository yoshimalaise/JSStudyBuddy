import { Injectable } from '@angular/core';
import { parse } from 'acorn';
import { Exercise } from 'src/model/exercise.interface';
import { FunctionCodeObject } from 'src/model/parson-problem.interface';
import { CodeObject, CodeObjectType } from 'src/model/problem.interface';
import { ExerciseType } from '../model/exercise-types.enum';
import { ParamChooserExercise } from '../model/param-chooser-exercise.interface';
import { ExGenerator } from './generator.interface';
import * as walker from 'acorn-walk';
import * as generator from 'escodegen';

@Injectable({
  providedIn: 'root'
})
export class ParamChooserGeneratorService implements ExGenerator {

  constructor() { }

  isApplicable(c: CodeObject): boolean {
    // this problem is only applicable in functions with at least 2 arguments
    if(c.type !== CodeObjectType.function){
      return false;
    }

    const o = c as FunctionCodeObject;
    const functionBody = o.lines.map(l => l.line_content).join('\n');
    const ast: any = parse(functionBody, {ecmaVersion: 9});
    const params = ast?.body[0]?.params; // we know this will be the array of params since the codeobject is exactly one function
    return params?.length >= 2;
  }

  generate(c: CodeObject): Exercise {
    const o = c as FunctionCodeObject;
    const functionBody = o.lines.map(l => l.line_content).join('\n');
    const ast: any = parse(functionBody, {ecmaVersion: 9});
    const params = ast?.body[0].params.map(p => p.name);
    const functionBodyAst = ast.body[0].body;
    const rawBody = generator.generate(ast);
    // perform a treewalk and remove all param names from the body
    walker.full(functionBodyAst, (node: any) => {
      if (node.type === 'Identifier' && params.includes(node.name)) {
        node.name = '_______';
      }
    });
    const sanitisedBody = generator.generate(ast);


    const result: ParamChooserExercise = {
      title: o.filename,
      exerciseType: ExerciseType.paramChooser,
      params,
      rawBody,
      sanitisedBody
    };
    return result;
  }
}
