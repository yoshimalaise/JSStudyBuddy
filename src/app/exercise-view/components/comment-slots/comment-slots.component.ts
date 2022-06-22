import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentSlotExercise } from '../../model/comment-slot-exercise.interface';

@Component({
  selector: 'app-comment-slots',
  templateUrl: './comment-slots.component.html',
  styleUrls: ['./comment-slots.component.scss'],
})
export class CommentSlotsComponent implements OnInit {
  @Input() exercise?;
  @Output() doneEvent = new EventEmitter<boolean>();

  elements = [];
  comments = [];
  answers = {};

  constructor() { }

  ngOnInit(): void {
    this.answers = {};
    this.elements = [];
    const commentEx = this.exercise as CommentSlotExercise;
    commentEx.sanitisedBody.split('/*REDACTED COMMENT*/').forEach(p => {
      this.elements.push({type: 'code', body: p.trim()});
      this.elements.push({type: 'comment'});
    });
    this.elements.pop();
    this.comments = this.shuffle(commentEx.comments.map(c => ({body: c.isBlock ? `/*${c.text}*/` : `//${c.text}`, id: c.order})));
  }

  handleSelect(event, elementId) {
    const selectedIndex = event.detail.value;
    const comboBoxId = Math.floor(elementId / 2);
    this.answers[`${comboBoxId}`] = selectedIndex;
    this.checkIfUserWon();
  }

  private checkIfUserWon() {
    if (Object.entries(this.answers).length !== this.comments.length) {
      return false;
    }
    for (const [key, value] of Object.entries(this.answers)) {
      if (`${key}` !== `${value}`) {
        return false;
      }
    }
    this.doneEvent.emit(true);
  }

  private shuffle(array) {
    let currentIndex = array.length;
    let randomIndex: number;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

}
