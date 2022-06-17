import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProblemSetLoaderService } from '../../services/problem-set-loader.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-select-problem',
  templateUrl: 'select-problem.page.html',
  styleUrls: ['select-problem.page.scss'],
})
export class SelectProblemPage {
  fileNames$: Observable<string[]>;

  constructor(private problemSetLoaderService: ProblemSetLoaderService, private barcodeScanner: BarcodeScanner) {
    this.fileNames$ = problemSetLoaderService.allFiles$;
  }

  /**
   * see https://ionicframework.com/docs/v3/native/qr-scanner/
   */
  async  importNewDataset() {
    try {
      const scanData = await this.barcodeScanner.scan();
      if (scanData.text.startsWith('http')) {
        const data = await (await fetch(scanData.text,  {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Bypass-Tunnel-Reminder':'true'
          }
        })).json();
        this.problemSetLoaderService.persistProblemset(prompt('Collection name') , data);
      }
    } catch (ex) {
      alert(ex);
    }
  }

  selectFile(name: string) {
    this.problemSetLoaderService.selectProblemSet(name);
  }

}
