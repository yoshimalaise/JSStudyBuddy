import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MultipleChoiceAnswer, MultipleChoiceExercise } from '../../model/multiple-choice-exercise.interface';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss'],
})
export class MultipleChoiceComponent implements OnInit {
  @Input() exercise?;
  @Output() doneEvent = new EventEmitter<boolean>();
  selectedRadio = '';
  
  constructor(private toastController: ToastController) { }

  ngOnInit() {}

  async handleMultipleAnswer() {
    const answers = (this.exercise as MultipleChoiceExercise).answers;
    answers.forEach(a => {
      if(a.isChecked === undefined) {
        a.isChecked = false;
      }
    });

    if (this.checkMultipleWinCondition(answers)) {
      this.doneEvent.emit(true);
    } else {
      const toast = await this.toastController.create({
        message: 'Incorrect answer',
        duration: 500
      });
      toast.present();
    }
  }

  async handleSingleAnswer() {
    const correct = (this.exercise as MultipleChoiceExercise).answers.find(a => a.message === this.selectedRadio)?.isCorrect;

    if (correct) {
      this.doneEvent.emit(true);
    } else {
      const toast = await this.toastController.create({
        message: 'Incorrect answer',
        duration: 500
      });
      toast.present();
    }
  }

  private checkMultipleWinCondition(answers: MultipleChoiceAnswer[]): boolean {
    for (const answer of answers) {
      if (answer.isChecked !== answer.isCorrect) {
        return false;
      }
    }
    return true;
  }

}
