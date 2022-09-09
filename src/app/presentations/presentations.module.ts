import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPresentationComponent } from './pages/select-presentation/select-presentation.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PresentComponent } from './pages/present/present.component';



@NgModule({
  declarations: [SelectPresentationComponent, PresentComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class PresentationsModule { }
