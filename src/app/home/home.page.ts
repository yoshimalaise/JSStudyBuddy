import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { ProblemSetLoaderService } from '../problem-importer/services/problem-set-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private problemSetLoaderService: ProblemSetLoaderService, 
    private barcodeScanner: BarcodeScanner, private toastController: ToastController) {}

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
        for (const entry of data.entries) {
          await this.problemSetLoaderService.persistProblemset(entry.name , entry);
        }
        SpinnerDialog.hide();
        const toast = await this.toastController.create({
          message: 'Content successfully added',
          duration: 500
        });
        toast.present();
      }
    } catch (ex) {
      alert(ex);
      SpinnerDialog.hide();
      const toast = await this.toastController.create({
        message: 'Error importing content',
        duration: 500
      });
      toast.present();
    }
  }

}
