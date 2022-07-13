import { Injectable } from '@angular/core';
import { Exercise } from 'src/model/exercise.interface';
import { CodeObject, CodeObjectType } from 'src/model/problem.interface';
import { ExGenerator } from './generator.interface';
import { full } from 'acorn-walk';
import { parse } from 'acorn';
import { FunctionCodeObject } from 'src/model/parson-problem.interface';
import { MultipleChoiceExercise } from '../model/multiple-choice-exercise.interface';
import { ExerciseType } from '../model/exercise-types.enum';


@Injectable({
  providedIn: 'root'
})
export class MultipleChoiceGeneratorService implements ExGenerator {

  constructor() { }

  isApplicable(c: CodeObject): boolean {
    if(c.type !== CodeObjectType.function){
      return false;
    }

    return true;
  }

  generate(c: CodeObject): Exercise {
    const functionRaw = (c as FunctionCodeObject).lines.map(l => l.line_content).join('\n');
    const ast = parse(functionRaw, { ecmaVersion: 9});

    const x = this.generateRandomQuestion(ast);
    const result: MultipleChoiceExercise = {...x,
        title: (c as FunctionCodeObject).filename, exerciseType: ExerciseType.multipleChoice, codeSnippet: functionRaw};
    return result;
  }

  // types of questions to support:

  // is your function asynchronous? v
  // what is he name of the function? v
  // select all arguments. v
  // which of the following variables are defined as constants? v
  // which of the following variables are declared in loop initialisers? v
  // which of the following variables get reassigned? v

  private generateRandomQuestion(ast) {
    const generators = [this.generateFunctionIsAsyncQuestion, this.generateFunctionArgsQuestion,
        this.generateFunctionNameQuestion, this.generateWhichAreConstantsQuestion,
        this.generateWhichAreDeclaredInLoopInitializersQuestion, this.generateWhichAreReassignedQuestion];
    return generators[Math.floor(Math.random() * generators.length)](ast);
  }

  private generateFunctionIsAsyncQuestion(ast) {
    let isAsync = false;
    full(ast, (node: any, state, type) => {
        if (type==='Function') {
            isAsync = node.async;
        }
    });
    return {
        question: 'Is the function asynchronous?',
        allowMultiple: false,
        answers: [
            { message: 'Yes', isCorrect: isAsync },
            { message: 'No', isCorrect: !isAsync }
        ]
    };
  }

  private generateFunctionNameQuestion(ast) {
    const possibleAnswers = [];
    full(ast, (node: any, state, type) => {
        if (type==='Function') {
            node.params.forEach( p => possibleAnswers.push({ message: p.name, isCorrect: false}));
            possibleAnswers.push({message: node.id.name, isCorrect: true});
            possibleAnswers.push({message: 'function', isCorrect: false});
            if(node.async) {
                possibleAnswers.push({message: 'async', isCorrect: false});
            }
        }
    });

    return {
        question: 'What is the name of the function?',
        allowMultiple: false,
        answers: shuffle(possibleAnswers)
    };
  }

  private generateFunctionArgsQuestion(ast) {
    const possibleAnswers = [];
    full(ast, (node: any, state, type) => {
        if (type==='Function') {
            node.params.forEach( p => possibleAnswers.push({ message: p.name, isCorrect: true}));
            possibleAnswers.push({message: node.id.name, isCorrect: false});
            possibleAnswers.push({message: 'function', isCorrect: false});
            if(node.async) {
                possibleAnswers.push({message: 'async', isCorrect: false});
            }
        }
    });

    return {
        question: 'Select all the arguments.',
        allowMultiple: true,
        answers: shuffle(possibleAnswers)
    };
  }

  private generateWhichAreConstantsQuestion(ast) {
    const constants = [];
    const otherVars = [];

    full(ast, (node: any, state, type) => {
        if (type==='Function') {
            node.params.forEach( p => otherVars.push(p.name));
        }

        if (type==='VariableDeclaration') {
            node.declarations.forEach(d => node.kind === 'let' ? otherVars.push(d.id.name) : constants.push(d.id.name));
        }
    });

    return {
        question: 'Which of the following are declared as constants?',
        allowMultiple: true,
        answers: shuffle([...constants.map( c => ({message: c, isCorrect: true})),
            ...otherVars.map( c => ({message: c, isCorrect: false}))])
    };
  }

  private generateWhichAreDeclaredInLoopInitializersQuestion(ast) {
    const allVars = [];
    const declaredInLoopInitializers = [];

    full(ast, (node: any, state, type) => {
        if (type==='Function') {
            node.params.forEach( p => allVars.push(p.name));
        }

        if (type==='VariableDeclaration') {
            node.declarations.forEach(d => allVars.push(d.id.name));
        }

        if (type==='ForStatement') {
            node.init.declarations.forEach(dec => declaredInLoopInitializers.push(dec.id.name));
        }
    });

    return {
        question: 'Which of the following variables are declared in loop initialisers?',
        allowMultiple: true,
        answers: shuffle([...allVars.filter(v => !declaredInLoopInitializers.includes(v))
                        .map(v => ({message: v, isCorrect: false})),
                ...declaredInLoopInitializers.map(v => ({message: v, isCorrect: true}))])
    };
  }

  private generateWhichAreReassignedQuestion(ast) {
    const allVars = [];
    const reassignedVars = [];

    full(ast, (node: any, state, type) => {
        if (type==='Function') {
            node.params.forEach( p => allVars.push(p.name));
        }

        if (type==='VariableDeclaration') {
            node.declarations.forEach(d => allVars.push(d.id.name));
        }

        if (type === 'UpdateExpression') {
            reassignedVars.push(node.argument.name);
        }
        if (type === 'AssignmentExpression' && node.left.name) {
            reassignedVars.push(node.left.name);
        }
    });

    return {
        question: 'which of the following variables get reassigned?',
        allowMultiple: true,
        answers: shuffle([
            ...allVars.filter(v => !reassignedVars.includes(v)).map(v => ({message: v, isCorrect: false})),
            ...reassignedVars.map(v => ({message: v, isCorrect: true}))
        ])
    };
  }
}


const shuffle = (arr) =>
  arr.map(s => ({el: s, c: Math.random()}))
          .sort((a, b) => a.c - b.c)
          .map(x => x.el);
