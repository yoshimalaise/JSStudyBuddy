import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProblemSetLoaderService } from '../../services/problem-set-loader.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-select-problem',
  templateUrl: 'select-problem.page.html',
  styleUrls: ['select-problem.page.scss'],
})
export class SelectProblemPage {
  fileNames$: Observable<string[]>;

  constructor(private problemSetLoaderService: ProblemSetLoaderService, private barcodeScanner: BarcodeScanner,
    private router: Router) {
    this.fileNames$ = problemSetLoaderService.allFiles$;
  }

  /**
   * see https://ionicframework.com/docs/v3/native/qr-scanner/
   */
  async  importNewDataset() {
    try {
      const scanData = await this.barcodeScanner.scan();
      if (scanData.text.startsWith('http')) {
        SpinnerDialog.show(undefined, 'Importing code objects, please wait');
        const reqRes = await fetch(scanData.text,  {
          method: 'GET',
          headers: {
            'Bypass-Tunnel-Reminder': 'true'
          }
        });
        const data = await reqRes.json();
        this.problemSetLoaderService.persistProblemset(prompt('Collection name') , data);
        SpinnerDialog.hide();
      }
    } catch (ex) {
      alert(ex);
      SpinnerDialog.hide();
    }
  }

  async selectFile(name: string) {
    await this.problemSetLoaderService.selectProblemSet(name);
    this.router.navigate(['exercise']);
  }

}
