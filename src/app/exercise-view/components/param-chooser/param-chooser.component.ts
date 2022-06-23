import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as parser from 'acorn';
import * as generator from 'escodegen';

@Component({
  selector: 'app-param-chooser',
  templateUrl: './param-chooser.component.html',
  styleUrls: ['./param-chooser.component.scss'],
})
export class ParamChooserComponent implements AfterViewInit {
  @Input() exercise?;
  @Output() doneEvent = new EventEmitter<boolean>();
  @ViewChild('code') codeEl: any;

  values = [];
  slotCount: number;

  constructor() { }

  ngAfterViewInit(): void {
    this.values = [];
    const options = this.exercise.params.map(p => `<option value="${p}">${p}</option>`).join('');
    const comboBoxStr = `<select><option value="none">_______</option>${options}</select>`;

    if (!this.codeEl) {
      return;
    }

    setTimeout(() => {
      const field = this.codeEl.nativeElement.getElementsByTagName('code')[0];
      this.slotCount = field.innerHTML.split('_______').length - 1;
      field.innerHTML = field.innerHTML.split('_______').join(comboBoxStr);

      setTimeout(() => this.registerHandlers(), 300);
    }, 300);
  }

  private registerHandlers() {
    const selectFields =  this.codeEl.nativeElement.getElementsByTagName('select');
    for (let i = 0; i < selectFields.length; i++) {
      const f = selectFields[i];
      f.addEventListener('change', ($event) => {
        this.values = this.values.filter(v => v.index !== i);

        let selected;
        for (const o of f.getElementsByTagName('option')) {
          if (o.selected) {
            selected = o.value;
          }
        }

        this.values.push({index: i, value: selected});
        if (this.values.length === this.slotCount) {
          this.checkForWin();
        }
      });
    }
  }

  private checkForWin() {
    // fill in the user selected values in the code
    let userComposedCode = this.exercise.sanitisedBody;
    this.values.forEach(v => {
      userComposedCode = userComposedCode.replace('_______', v.value);
    });

    if (generator.generate(parser.parse(userComposedCode, {ecmaVersion: 9}))
          === generator.generate(parser.parse(this.exercise.rawBody, {ecmaVersion: 9}))) {
      this.doneEvent.emit(true);
    }
  }

}
