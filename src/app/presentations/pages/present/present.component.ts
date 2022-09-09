import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppState } from 'src/model/app-state.interface';
import { state } from 'src/state/state';

@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.scss'],
})
export class PresentComponent implements OnInit, AfterViewInit {
  state: AppState;
  remark: any;

  constructor() {
    this.state = state;
    this.remark = (window as any).remark;
   }

  ngAfterViewInit(): void {
    setTimeout(() => { 
      const show = this.remark.create({
        source: this.state.selectedPresentation.body
      });
    }, 2000);
  }

  ngOnInit() {}

}
