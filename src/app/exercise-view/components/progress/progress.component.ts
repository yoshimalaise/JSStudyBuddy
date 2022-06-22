import { Component, OnInit } from '@angular/core';
import { UserStatisticsService } from '../../services/user-statistics-service.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  dailyGoal = 10;
  message: string;
  percentageFilled: number;

  constructor(private statService: UserStatisticsService) {
    this.message = '';
    this.percentageFilled = 0;
  }

  ngOnInit() {
    // this method will be called every time we open the modal
    // update the values here
    const todayCount = this.statService.getEntriesFromToday().length;
    this.percentageFilled  = Math.min(1, todayCount / this.dailyGoal);
    if (this.percentageFilled >= 1) {
      this.message = `Good job! You have reached your daily goal of ${this.dailyGoal} exercises!`;
    } else {
      const remaining = this.dailyGoal - todayCount;
      this.message = `Complete ${remaining} more ${remaining === 1 ? 'exercise' : 'exercises'} to complete you goal!`;
    }
  }

}
