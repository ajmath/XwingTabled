import { Component, OnInit, Input } from '@angular/core';
import { XwingDataService } from '../../services/xwing-data.service';
import { LayoutService } from '../../services/layout.service';
import { PilotModalPage } from '../../modals/pilot-modal/pilot-modal.page';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { XwingStateService } from '../../services/xwing-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'xws-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.scss']
})
export class PilotComponent implements OnInit {
  @Input() pilot: any;
  groups: any[][] = [];
  img_url: string = null;
  shipData: any;
  pilotData: any;

  constructor(public dataService: XwingDataService,
              public modalController: ModalController,
              public platform: Platform,
              public events: Events,
              public layout: LayoutService,
              public state: XwingStateService,
              private router: Router) { }

  getStatString(statname: string): string {
    this.pilot.ship.stats.forEach(
      (stat) => {
        if (stat['type'] === statname) {
          if (stat.value !== stat.remaining) {
            return '(' + stat.remaining + ')';
          } else {
            return stat.value;
          }
        }
      }
    );
    return '';
  }

  ngOnInit() {
    const numGroups = this.pilot.upgrades >= 9 ? 3 : 2;
    const groupSize = Math.ceil(this.pilot.upgrades.length / numGroups);
    for (let i = 0; i < numGroups; i++) {
      const group: any[] = [];
      for (let j = 0; j < groupSize; j++) {
        const index = i * groupSize + j;
        if (this.pilot.upgrades[index]) {
          group.push(this.pilot.upgrades[index]);
        }
      }
      this.groups.push(group);
    }

    let get_url = this.pilot.pilot.artwork;
    if (!get_url) {
      get_url = this.pilot.pilot.image;
    }
    if (get_url) {
      this.dataService.get_image_by_url(get_url).then(
        (url) => {
          this.img_url = url;
        }
      );
    }
  }

  numFacedown() {
    if (this.pilot.damagecards) {
      const facedown = this.pilot.damagecards.filter(card => !card.exposed);
      if (facedown) {
        return facedown.length;
      }
    }
    return 0;
  }

  async presentPilotModal() {
    const stateString = JSON.stringify(this.pilot);
    const modal = await this.modalController.create({
      component: PilotModalPage,
      componentProps: {
        pilot: this.pilot,
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (stateString !== JSON.stringify(this.pilot)) {
      this.state.snapshot();
    }
  }

  showPilot() {
    if (this.layout.isPhone()) {
      this.router.navigateByUrl('pilot/' + this.pilot.num);
    } else {
      this.presentPilotModal();
    }
  }
}
