import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPresentationComponent } from './pages/select-presentation/select-presentation.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [SelectPresentationComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class PresentationsModule { }
