import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {convertCodeToSvg } from 'js2flowchart';

@Component({
  selector: 'app-js-flowchart',
  templateUrl: './js-flowchart.component.html',
  styleUrls: ['./js-flowchart.component.scss'],
})
export class JsFlowchartComponent implements AfterViewInit {
  @Input() snippet: string;
  @ViewChild('chart') chartContainer;


  constructor() { }

  ngAfterViewInit(): void {
      console.log('snippet', this.snippet);
      const svg = convertCodeToSvg(this.snippet);
      this.chartContainer.nativeElement.innerHTML = svg;
  }

}
