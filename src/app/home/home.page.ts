import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ProblemSetLoaderService } from '../problem-importer/services/problem-set-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private problemSetLoaderService: ProblemSetLoaderService, private barcodeScanner: BarcodeScanner) {}

  navigateToSelectProblemsetScreen() {
    this.router.navigate(['select-problemset']);
  }

  navigateToOverview() {
    this.router.navigate(['overview']);
  }

  navigateToSelectPresentationsScreen() {
    this.router.navigate(['select-presentation']);
  }

  /**
   * see https://ionicframework.com/docs/v3/native/qr-scanner/
   */
  async importCurriculum() {
    try {
      const scanData = await this.barcodeScanner.scan();
      if (scanData.text.startsWith('http')) {
        SpinnerDialog.show(undefined, 'Importing objects, please wait');
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

}
