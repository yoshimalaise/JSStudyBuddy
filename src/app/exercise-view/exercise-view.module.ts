import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExerciseComponent } from './components/exercise-component/exercise-component.component';
import { ParsonsComponent } from './components/parsons/parsons.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProgressComponent } from './components/progress/progress.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { CommentSlotsComponent } from './components/comment-slots/comment-slots.component';
import { ParamChooserComponent } from './components/param-chooser/param-chooser.component';
import { PickSnippetForFlowchartComponent } from './components/pick-snippet-for-flowchart/pick-snippet-for-flowchart.component';
import { PickFlowchartForSnippetComponent } from './components/pick-flowchart-for-snippet/pick-flowchart-for-snippet.component';
import { JsFlowchartComponent } from './components/js-flowchart/js-flowchart.component';
import { MultipleChoiceComponent } from './components/multiple-choice/multiple-choice.component';

@NgModule({
  declarations: [ExerciseComponent, ParsonsComponent, ProgressComponent, CommentSlotsComponent,
    ParamChooserComponent, PickSnippetForFlowchartComponent, PickFlowchartForSnippetComponent,
    JsFlowchartComponent, MultipleChoiceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScrollingModule,
    RoundProgressModule
  ]
})
export class ExerciseViewModule { }
