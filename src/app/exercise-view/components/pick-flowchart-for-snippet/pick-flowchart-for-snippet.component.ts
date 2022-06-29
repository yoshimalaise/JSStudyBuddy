import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FlowChartSnippetMappingErcise } from '../../model/flowchart-snippet-mapping-exercise.interface';

@Component({
  selector: 'app-pick-flowchart-for-snippet',
  templateUrl: './pick-flowchart-for-snippet.component.html',
  styleUrls: ['./pick-flowchart-for-snippet.component.scss'],
})
export class PickFlowchartForSnippetComponent implements OnInit {
  @Input() exercise?: any;
  @Output() doneEvent = new EventEmitter<boolean>();
  entries = [];

  constructor(public toastController: ToastController) { }

  ngOnInit() {
    this.entries = [this.exercise.originalSnippet, ...this.exercise.mutations]
      .map((s,i) => ({isCorrectOne: i === 0, snippet: s}));

    this.shuffleArray(this.entries);
  }

  async select(entry) {
    if (entry.isCorrectOne) {
      this.doneEvent.emit(true);
    } else {
      const toast = await this.toastController.create({
        message: 'Incorrect answer',
        duration: 2000
      });
      toast.present();
    }
  }

  private shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
