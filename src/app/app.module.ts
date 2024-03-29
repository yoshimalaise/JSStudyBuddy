import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProblemImporterModule } from './problem-importer/problem-importer.module';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ExerciseViewModule } from './exercise-view/exercise-view.module';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { ProgressModule } from './progress/progress.module';
import { NgCalendarModule  } from 'ionic2-calendar';
import { PresentationsModule } from './presentations/presentations.module';



@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ProblemImporterModule,
    ExerciseViewModule, ProgressModule, PresentationsModule, NgCalendarModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, BarcodeScanner, LocalNotifications],
  bootstrap: [AppComponent],
})
export class AppModule {}
