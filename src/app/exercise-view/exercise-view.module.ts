import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExerciseComponent } from './components/exercise-component/exercise-component.component';
import { ParsonsComponent } from './components/parsons/parsons.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [ExerciseComponent, ParsonsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScrollingModule
  ]
})
export class ExerciseViewModule { }
