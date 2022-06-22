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
  todayCount: number;

  constructor(private statService: UserStatisticsService) {
    this.message = '';
    this.todayCount = 0;
  }

  ngOnInit() {
    // this method will be called every time we open the modal
    // update the values here
    this.todayCount = this.statService.getEntriesFromToday().length;
    if (this.todayCount >= this.dailyGoal) {
      this.message = `Good job! You have reached your daily goal of ${this.dailyGoal} exercises!`;
    } else {
      const remaining = this.dailyGoal - this.todayCount;
      this.message = `Complete ${remaining} more ${remaining === 1 ? 'exercise' : 'exercises'} to complete you goal!`;
    }
  }

}
