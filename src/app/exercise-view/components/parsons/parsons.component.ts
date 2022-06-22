import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';
import { Exercise } from 'src/model/exercise.interface';
import { ParsonCodeLine, ParsonsExercise } from '../../model/parsons-exercise.interface';

@Component({
  selector: 'app-parsons',
  templateUrl: './parsons.component.html',
  styleUrls: ['./parsons.component.scss'],
})
export class ParsonsComponent implements OnInit {
  @Input() exercise?;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  @Output() doneEvent = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
    this.checkIfUserHasWon((this.exercise as ParsonsExercise).codeLines);
  }

  onReorder(event) {
    try {
      const ex = this.exercise as ParsonsExercise;
      const line = ex.codeLines.find(l => l.currentLineNumber === event.detail.from + 1);
      const idx = event.detail.to;
      ex.codeLines = ex.codeLines.filter(l => l !== line);
      ex.codeLines.splice(idx, 0, line);

      // renumber them
      for (let i = 0; i < ex.codeLines.length; i++) {
        ex.codeLines[i].currentLineNumber = i + 1;
      }

      event.detail.complete([... ex.codeLines]);
      this.checkIfUserHasWon(ex.codeLines);
    } catch (exception) {
      event.detail.complete(this.exercise.codeLines);
      alert(`Error occured:\n ${exception}`);
    }

  }

  private checkIfUserHasWon(codeLines: ParsonCodeLine[]): boolean {
    if (!codeLines) {
      return false;
    }
    for (const l of codeLines) {
      if (l.currentLineNumber !== l.correctLineNumber) {
        return false;
      }
    }
    this.doneEvent.emit(true);
    return true;
  }

}
