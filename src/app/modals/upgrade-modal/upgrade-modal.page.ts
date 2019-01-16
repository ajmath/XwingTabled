import { Component, OnInit } from '@angular/core';
import { XwingDataService } from '../../services/xwing-data.service';
import { ModalController } from '@ionic/angular';
import { LayoutService } from '../../services/layout.service';
import { XwingStateService } from '../../services/xwing-state.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-upgrade-modal',
  templateUrl: './upgrade-modal.page.html',
  styleUrls: ['./upgrade-modal.page.scss'],
})
export class UpgradeModalPage implements OnInit {
  upgrade;
  img_urls: Array<string|null> = [ null, null ];

  constructor(private dataService: XwingDataService,
              public modalController: ModalController,
              public layout: LayoutService,
              private route: ActivatedRoute,
              public state: XwingStateService) { }

  ngOnInit() {
    const pilotNum = this.route.snapshot.paramMap.get('pilotNum');
    const upgradeNum = this.route.snapshot.paramMap.get('upgradeNum');
    if (pilotNum) {
      const pilot = this.state.squadron.pilots.find(p => p.num === pilotNum);
      this.upgrade = pilot.upgrades.find(u => u.num === upgradeNum);
    }
    console.log('upgrade modal', this.upgrade);
    for (let i = 0; i < this.upgrade.sides.length; i++) {
      if (this.upgrade.sides[i].image) {
        this.dataService.get_image_by_url(this.upgrade.sides[i].image).then(
          (url) => {
            this.img_urls[i] = url;
          }
        );
      }
    }
  }

  flipCard() {
    if (this.upgrade.side === 0) {
      this.upgrade.side = 1;
    } else {
      this.upgrade.side = 0;
    }
  }

}
