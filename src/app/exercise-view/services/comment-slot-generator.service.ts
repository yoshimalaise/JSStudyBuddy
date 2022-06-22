import { Injectable } from '@angular/core';
import { Exercise } from 'src/model/exercise.interface';
import { CodeObject, CodeObjectType } from 'src/model/problem.interface';
import { ExGenerator } from './generator.interface';
import { parse } from 'acorn';
import { FunctionCodeObject } from 'src/model/parson-problem.interface';
import { CommentSlot, CommentSlotExercise } from '../model/comment-slot-exercise.interface';
import { ExerciseType } from '../model/exercise-types.enum';

@Injectable({
  providedIn: 'root'
})
export class CommentSlotGeneratorService implements ExGenerator {

  constructor() { }

  isApplicable(c: CodeObject): boolean {
    if(c.type !== CodeObjectType.function){
      return false;
    }

    const o = c as FunctionCodeObject;
    const functionBody = o.lines.map(l => l.line_content).join('\n');

    try {
      const comments = [];
      parse(functionBody, {
        ecmaVersion: 9,
        locations: true,
        onComment: (isBlock, text, start, end, startLoc?, endLoc?) => {
            comments.push({isBlock, text, start});
        },
      });
      return comments.length >= 3;
    }catch{
      return false;
    }
  }

  generate(c: CodeObject): Exercise {
    const o = c as FunctionCodeObject;
    const functionBody = o.lines.map(l => l.line_content).join('\n');
    const comments = [];
    parse(functionBody, {
      ecmaVersion: 9,
      locations: true,
      onComment: (isBlock, text, start, end, startLoc?, endLoc?) => {
          comments.push({isBlock, text, start});
      },
    });

    const commentSlots: any = comments.map((cmnt, i) => ({
      order: i,
      isBlock: cmnt.isBlock,
      text: cmnt.text
    }));

    let sanitisedBody = functionBody;
    commentSlots.forEach(cs => {
      sanitisedBody = sanitisedBody.replace(cs.isBlock ? `/*${cs.text}*/` : `//${cs.text}`, '/*REDACTED COMMENT*/');
    });

    const result: CommentSlotExercise = {
      title: o.filename,
      exerciseType: ExerciseType.commentSlot,
      comments: commentSlots,
      sanitisedBody
    };

    return result;
  }

}
