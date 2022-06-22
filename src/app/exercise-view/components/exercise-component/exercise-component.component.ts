import { Component, OnInit, ViewChild } from '@angular/core';
import { ProblemSetLoaderService } from 'src/app/problem-importer/services/problem-set-loader.service';
import { Exercise } from 'src/model/exercise.interface';
import { CodeObject } from 'src/model/problem.interface';
import { ExerciseGeneratorService } from '../../services/exercise-generator.service';
import { take } from 'rxjs/operators';
import { IonModal } from '@ionic/angular';
import { UserStatisticsService } from '../../services/user-statistics-service.service';

@Component({
  selector: 'app-exercise-component',
  templateUrl: './exercise-component.component.html',
  styleUrls: ['./exercise-component.component.scss'],
})
export class ExerciseComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  currExercise: Exercise;
  minutes: number;
  seconds: number;
  private interval;

  constructor(private exGeneratorService: ExerciseGeneratorService, private userStatsService: UserStatisticsService) {
    this.next();
  }

  ngOnInit() {}

  next() {
    if (this.modal) {
      this.modal.isOpen =  false;
    }
    this.currExercise = this.exGeneratorService.nextExercise();
    this.resetClock();
  }

  userFinished() {
    this.userStatsService.addLog(this.currExercise, `${('00' + this.minutes).slice(-2)}:${('00' + this.seconds).slice(-2)}`);
    this.modal.isOpen =  true;
  }

  resetClock() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.minutes = 0;
    this.seconds = 0;
    this.interval = setInterval(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
    }, 1000);
  }

}
