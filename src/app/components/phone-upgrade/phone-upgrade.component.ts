import { Component, OnInit, Input } from '@angular/core';
import { XwingDataService } from '../../services/xwing-data.service';
import { UpgradeModalPage } from '../../modals/upgrade-modal/upgrade-modal.page';
import { ModalController } from '@ionic/angular';
import { Events } from '@ionic/angular';
@Component({
  selector: 'xws-phone-upgrade',
  templateUrl: './phone-upgrade.component.html',
  styleUrls: ['./phone-upgrade.component.scss']
})
export class PhoneUpgradeComponent implements OnInit {
  @Input() upgrade: any = { };

  constructor(public dataService: XwingDataService, 
              private modalController: ModalController,
              private events: Events) { }

  async presentUpgradeModal() {
    let stateString = JSON.stringify(this.upgrade);
    const modal = await this.modalController.create({
      component: UpgradeModalPage,
      componentProps: {
        upgrade: this.upgrade
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (stateString != JSON.stringify(this.upgrade)) {
      this.events.publish("snapshot", "create snapshot");
    }
  }

  ngOnInit() {
  }

  showUpgrade() {
    this.presentUpgradeModal();
  }
}
