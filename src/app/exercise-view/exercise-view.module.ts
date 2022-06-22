import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExerciseComponent } from './components/exercise-component/exercise-component.component';
import { ParsonsComponent } from './components/parsons/parsons.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProgressComponent } from './components/progress/progress.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [ExerciseComponent, ParsonsComponent, ProgressComponent],
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
