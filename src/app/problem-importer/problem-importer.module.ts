import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SelectProblemPage } from './components/select-problem/select-problem.page';
import { QRScanner } from '@ionic-native/qr-scanner';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [],
  declarations: [SelectProblemPage]
})
export class ProblemImporterModule {}
