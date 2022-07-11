import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  navigateToSelectProblemsetScreen() {
    this.router.navigate(['select-problemset']);
  }

  navigateToOverview() {
    this.router.navigate(['overview']);
  }

}
