import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './components/overview/overview.component';
import { IonicModule } from '@ionic/angular';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { BrowserModule } from '@angular/platform-browser';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [OverviewComponent, RecentActivityComponent],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule,
    RoundProgressModule,
    NgCalendarModule
  ]
})
export class ProgressModule { }
