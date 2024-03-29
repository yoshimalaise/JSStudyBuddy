import { Injectable } from '@angular/core';
import { Exercise } from 'src/model/exercise.interface';
import { CodeObject } from 'src/model/problem.interface';
import { state } from 'src/state/state';
import { ChooseCodeSnippetForFlowchartGeneratorService } from './choose-code-snippet-for-flowchart-generator.service';
import { ChooseFlowchartGeneratorService } from './choose-flowchart-generator.service';
import { CommentSlotGeneratorService } from './comment-slot-generator.service';
import { ExGenerator } from './generator.interface';
import { MultipleChoiceGeneratorService } from './multiple-choice-generator.service';
import { ParamChooserGeneratorService } from './param-chooser-generator.service';
import { ParsonsGeneratorService } from './parsons-generator.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseGeneratorService {
  generators: ExGenerator[] = [];
  currCodeObject: CodeObject;

  constructor(parsons: ParsonsGeneratorService, comments: CommentSlotGeneratorService,
    paramChooser: ParamChooserGeneratorService, flowchartToSnippet: ChooseCodeSnippetForFlowchartGeneratorService,
    snippetToFlowchart: ChooseFlowchartGeneratorService, multipleChoice: MultipleChoiceGeneratorService) {
    this.generators =  [parsons, comments, paramChooser, flowchartToSnippet, snippetToFlowchart, multipleChoice, multipleChoice];
   }

  nextExercise(): Exercise {
    // first select a random code oject from the list
    const selectedCodeObject = this.determineNext();

    // then select an applicable generator to generate the exercise
    const applicableGenerators = this.generators.filter(g => g.isApplicable(selectedCodeObject));
    const selectedGenerator = applicableGenerators[Math.floor((Math.random()*applicableGenerators.length))];
    return selectedGenerator.generate(selectedCodeObject);
  }

  
  private determineNext(): CodeObject {
    const codeObjects = state.codeObjects;
    // The max leitner box is 5 so there is always 1 entry
    // cards start in box one so at most there are 5 entries
    const idxs = [];
    for (let i = 0; i < codeObjects.length; i++) {
      const obj = codeObjects[i];
      for (let j = 0; j < 6 - obj.leitner_box; j++) {
        idxs.push(i);
      }
    }
    const randomIdx = idxs[Math.floor((Math.random() * idxs.length))];
    this.currCodeObject = codeObjects[randomIdx];
    return this.currCodeObject;
  }
}
