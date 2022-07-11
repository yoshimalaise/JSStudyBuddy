import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './components/overview/overview.component';
import { IonicModule } from '@ionic/angular';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule,
    RoundProgressModule
  ]
})
export class ProgressModule { }
