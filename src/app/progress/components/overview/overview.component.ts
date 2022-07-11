import { Component, OnInit } from '@angular/core';
import { MedalService } from 'src/app/exercise-view/services/medal.service';
import { UserStatisticsService } from 'src/app/exercise-view/services/user-statistics-service.service';
import { Medal } from 'src/model/medal.interface';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  dailyGoal = 10;
  todayCount: number;
  dailyProgress: number;
  playTime: string;
  medals: Medal[];

  constructor(private statService: UserStatisticsService, private medalService: MedalService) {
    this.todayCount = 0;
   }

  ngOnInit() {
    setTimeout(() => {
      this.todayCount = this.statService.getEntriesFromToday().length;
      this.dailyProgress = this.todayCount / this.dailyGoal;
      const playTimeInMin = Math.round(this.statService.getTotalPlaytime() / 60);
      const min = playTimeInMin % 60;
      const hours = (playTimeInMin - min) / 60;
      this.playTime = `${hours} hours ${min} minutes`;
      this.medals = this.medalService.getMedals();
      console.log('medals', this.medals);
    }, 100);
  }

}
