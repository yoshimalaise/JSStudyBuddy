import { Component } from '@angular/core';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { notificationMessages } from './notification-messages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private localNotifications: LocalNotifications) {
    this.scheduleNotifications();
  }

  async scheduleNotifications() {
    const oneDayDuration = 24 * 60 * 60 * 1000;

    const tomorrow = new Date().getTime() + oneDayDuration;
    const inTwoDays = tomorrow + oneDayDuration;
    const inThreeDays = inTwoDays + oneDayDuration;

    await this.localNotifications.cancelAll();
    await this.localNotifications.schedule({
      id: 1,
      title: 'Time for coding practise!',
      text: notificationMessages[Math.floor((Math.random()*notificationMessages.length))],
      trigger: { at: new Date(tomorrow)}
    });

    await this.localNotifications.schedule({
      id: 2,
      title: 'Time for coding practise!',
      text: notificationMessages[Math.floor((Math.random()*notificationMessages.length))],
      trigger: { at: new Date(inTwoDays)}
    });


    await this.localNotifications.schedule({
      id: 3,
      title: 'Time for coding practise!',
      text: notificationMessages[Math.floor((Math.random()*notificationMessages.length))],
      trigger: { at: new Date(inThreeDays)}
    });
  }
}
