import { Injectable } from '@angular/core';
import { parse } from 'acorn';
import { full } from 'acorn-walk';
import { Exercise } from 'src/model/exercise.interface';
import { FunctionCodeObject } from 'src/model/parson-problem.interface';
import { CodeObject, CodeObjectType } from 'src/model/problem.interface';
import { ExerciseType } from '../model/exercise-types.enum';
import { FlowChartSnippetMappingErcise } from '../model/flowchart-snippet-mapping-exercise.interface';
import { AstMutatorService } from './ast-mutator.service';
import { ExGenerator } from './generator.interface';
import * as generator from 'escodegen';

@Injectable({
  providedIn: 'root'
})
export class ChooseCodeSnippetForFlowchartGeneratorService implements ExGenerator {

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
      exerciseType: ExerciseType.chooseCodeSnippetForFlowchart,
      title: o.filename,
      mutations: [ast, ast].map(node => generator.generate(this.mutator.mutateAst(node))),
      originalSnippet: generator.generate(ast)
    };
    return ex;
  }
}
