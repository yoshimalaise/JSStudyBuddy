import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppState } from 'src/model/app-state.interface';
import { state } from 'src/state/state';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';

@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.scss'],
})
export class PresentComponent implements OnInit, AfterViewInit {
  state: AppState;
  deck: any;

  constructor() {
    this.state = state;
   }

  ngAfterViewInit(): void {
    if (!this.deck) {
      this.deck = new Reveal({plugins: [
        Markdown,
        Highlight,
      ]});
    }
    
    this.deck.initialize(document.querySelector( '.slides' ), {
      embedded: true,
      markdown: {
        smartypants: true
      }
    });
  }

  ngOnInit() {}

}
