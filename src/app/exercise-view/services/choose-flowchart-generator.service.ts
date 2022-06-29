import { Injectable } from '@angular/core';
import { Exercise } from 'src/model/exercise.interface';
import { CodeObject, CodeObjectType } from 'src/model/problem.interface';
import { ExGenerator } from './generator.interface';
import { parse } from 'acorn';
import * as generator from 'escodegen';
import { FunctionCodeObject } from 'src/model/parson-problem.interface';
import { full } from 'acorn-walk';
import { FlowChartSnippetMappingErcise } from '../model/flowchart-snippet-mapping-exercise.interface';
import { ExerciseType } from '../model/exercise-types.enum';
import { AstMutatorService } from './ast-mutator.service';

@Injectable({
  providedIn: 'root'
})
export class ChooseFlowchartGeneratorService implements ExGenerator {

  constructor(private mutator: AstMutatorService) { }

  isApplicable(c: CodeObject): boolean {
    if(c.type !== CodeObjectType.function){
      return false;
    }

    const o = c as FunctionCodeObject;
    const functionBody = o.lines.map(l => l.line_content).join('\n');
    const ast: any = parse(functionBody, {ecmaVersion: 9});
    let ctr = 0;
    full(ast, node => ctr++);
    // exercise is only applicable to functions of a certain minimum size
    if (ctr < 12) {
      return false;
    }
    return true;
  }
  generate(c: CodeObject): Exercise {
    const o = c as FunctionCodeObject;
    const functionBody = o.lines.map(l => l.line_content).join('\n');
    const ast: any = parse(functionBody, {ecmaVersion: 9});

    const ex: FlowChartSnippetMappingErcise = {
      exerciseType: ExerciseType.chooseFlowchartForCodeSnippet,
      title: o.filename,
      mutations: [ast, ast].map(node => generator.generate(this.mutator.mutateAst(node))),
      originalSnippet: generator.generate(ast)
    };
    return ex;
  }
}
