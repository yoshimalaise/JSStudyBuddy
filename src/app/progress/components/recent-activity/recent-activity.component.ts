import { Component, OnInit } from '@angular/core';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { UserStatisticsService } from 'src/app/exercise-view/services/user-statistics-service.service';

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
})
export class RecentActivityComponent implements OnInit {
  calendar = undefined;

  constructor(private statService: UserStatisticsService) {
    setTimeout(() => {
      this.calendar = {
        mode: 'month' as CalendarMode,
        currentDate: new Date(),
        step: 60,
        showEventDetail: false,
        startingDayWeek: 1,
        lockSwipes: true,
        eventSource: this.loadEvents()
      };
    }, 200);
   }

  ngOnInit() {}

  loadEvents() {
    return this.statService.entries.map(e => ({
      allDay: true,
      title: '',
      startTime: e.timestamp,
      endTime: e.timestamp
    }));
  }
}
