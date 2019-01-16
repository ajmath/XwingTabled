import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { NgZone } from '@angular/core';
import { XwingDataService } from '../../services/xwing-data.service';
import { XwingStateService } from '../../services/xwing-state.service';
import { ConditionMenuComponent } from '../../popovers/condition-menu/condition-menu.component';
import { DamagePopoverComponent } from '../../popovers/damage-popover/damage-popover.component';
import { DamageCardSelectComponent } from '../../popovers/damage-card-select/damage-card-select.component';
import { ModalController } from '@ionic/angular';
import { LayoutService } from '../../services/layout.service';
import { ActivatedRoute } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SquadronPilot, DamageCard, PilotStat } from '../../types';

@Component({
  selector: 'app-pilot-modal',
  templateUrl: './pilot-modal.page.html',
  styleUrls: ['./pilot-modal.page.scss'],
})
export class PilotModalPage implements OnInit {
  pilot!: SquadronPilot & { idNumber?: number };
  img_url?: string;
  card_text?: string;

  shields?: PilotStat;
  charges?: PilotStat;
  force?: PilotStat;
  faBars = faBars;
  expanded = false;

  maneuverChart: any[] = new Array(7);

  constructor(public toastController: ToastController,
              private popoverController: PopoverController,
              private dataService: XwingDataService,
              public state: XwingStateService,
              private alertController: AlertController,
              private events: Events,
              private ngZone: NgZone,
              public modalController: ModalController,
              public layout: LayoutService,
              private route: ActivatedRoute) { }


  drawHit() {
    if (!this.state.drawHit(this.pilot)) {
      this.presentDamageDeckEmpty();
    }
  }

  drawCrit() {
    if (!this.state.drawCrit(this.pilot)) {
      this.presentDamageDeckEmpty();
    }
  }

  async presentDamageDeckEmpty() {
    const toast = await this.toastController.create({
      message: 'Your Damage Deck is empty.',
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  recycleAvailable(): boolean {
    const hull = this.pilot.stats.find((stat) => stat.type === 'hull');
    if (!hull) {
      throw new Error('Illegal state, no hull for ship');
    }
    return hull.remaining <= 0 && this.pilot.damagecards.length > 0;
  }

  async recycleDamageCards() {
    this.pilot.damagecards.forEach(
      (card) => {
        card.exposed = false;
        this.state.discard(card);
      }
    );
    this.pilot.damagecards = [ ];
  }

  async assignIdNumber() {
    const alert = await this.alertController.create({
      header: 'Assign ID',
      message: 'Which ID/Lock token number should this pilot have?',
      inputs: [
        {
          name: 'id',
          type: 'number'
        }
      ],
      buttons: [
        { text: 'OK',
          handler: (data) => {
            this.ngZone.run(
              () => {
                if (data.id > 0) {
                  this.pilot.idNumber = data.id;
                } else {
                  this.pilot.idNumber = -1;
                }
              }
            );
          }
        },
        { text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary' }
      ]
    });
    return await alert.present();
  }

  async thaneKyrell() {
    const popover = await this.popoverController.create({
      component: DamageCardSelectComponent,
      componentProps: {
        title: 'Thane Kyrell',
        cards: this.pilot.damagecards.filter((card) => !card.exposed),
        callback: (card) => {
          card.exposed = true;
        }
      }
    });
    await popover.present();
  }

  async maarekStele() {
    const cards: DamageCard[] = [ ];
    for (let i = 0; i < 3; i++) {
      const card = this.state.draw();
      if (card) {
        cards.push(card);
      }
    }
    const popover = await this.popoverController.create({
      component: DamageCardSelectComponent,
      componentProps: {
        title: 'Maarek Stele',
        cards: cards,
        callback: (card) => {
          card.exposed = true;
          this.pilot.damagecards.push(card);
          cards.forEach(
            (remaining) => {
              if (remaining !== card) {
                this.state.discard(remaining);
              }
            }
          );
        }
      }
    });
    await popover.present();
  }

  async assignCrit() {
    const cards: DamageCard[] = [ ];
    // Fill cards with unique titles from damage deck
    this.state.damagedeck.forEach(
      (draw) => {
        const found = cards.find(card => draw.title === card.title);
        if (!found) {
          cards.push(draw);
        }
      }
    );

    cards.sort((a, b) => a.title.localeCompare(b.title));

    const popover = await this.popoverController.create({
      component: DamageCardSelectComponent,
      componentProps: {
        title: 'Assign Crit',
        cards: cards,
        callback: (card) => {
          card.exposed = true;
          this.pilot.damagecards.push(card);
          const index = this.state.damagedeck.indexOf(card);
          this.state.damagedeck.splice(index, 1);
       }
      }
    });
    await popover.present();
  }

  async showConditionMenu() {
    const popover = await this.popoverController.create({
      component: ConditionMenuComponent,
      componentProps: {
        pilot: this.pilot
      }
    });
    await popover.present();
  }

  expandToggle() {
    this.expanded = !this.expanded;
  }

  fleeShip() {
    this.pilot.pointsDestroyed = this.pilot.points;
    this.state.squadron.pointsDestroyed = 0;
    this.state.squadron.pilots.forEach(
      (pilot) => {
        this.state.squadron.pointsDestroyed += pilot.pointsDestroyed;
      }
    );
    if (this.state.squadron.pointsDestroyed === this.state.squadron.points) {
      this.state.squadron.pointsDestroyed = 200;
    }
  }

  hitCardAvailable(): boolean {
    let result = false;
    this.pilot.damagecards.forEach(
      (card) => {
        if (!card.exposed) {
          result = true;
        }
      }
    );
    return result;
  }

  mutateCard(card: any) {
    const cardCopy = JSON.parse(JSON.stringify(card));
    const index = this.pilot.damagecards.indexOf(card);
    if (index > -1) {
      this.pilot.damagecards.splice(index, 1);
      this.pilot.damagecards.splice(index, 0, cardCopy);
    }
  }

  exposeRandomHit() {
    this.ngZone.run(
      async () => {
        const hitIndexes: number[] = [];
        for (let i = 0; i < this.pilot.damagecards.length; i++) {
          if (!this.pilot.damagecards[i].exposed) {
            hitIndexes.push(i);
          }
        }
        const index = hitIndexes[Math.floor(Math.random() * Math.floor(hitIndexes.length))];
        const card = this.pilot.damagecards[index];
        card.exposed = true;
        this.mutateCard(card);
        const popover = await this.popoverController.create({
          component: DamagePopoverComponent,
          componentProps: {
            card: card
          }
        });
        await popover.present();
      }
    );
  }

  ngOnInit() {
    const pilotNum = this.route.snapshot.paramMap.get('pilotNum');
    this.pilot = this.state.squadron.pilots.find(pilot => pilot.num === pilotNum);
    if (!this.pilot) {
      throw new Error('Illegal state, missing pilot for pilot modal');
    }
    console.log('pilot modal', this.pilot);
    // Find stats with tokens to display
    this.shields = this.pilot.stats.find((stat) => stat.type === 'shields');
    this.charges = this.pilot.stats.find((stat) => stat.type === 'charges');
    this.force = this.pilot.stats.find((stat) => stat.type === 'force');

    this.fillManeuverChart(this.pilot.ship.dial);

    // Load pilot card
    if (this.pilot.pilot.image) {
      this.dataService.get_image_by_url(this.pilot.pilot.image).then(
        (url) => {
          this.img_url = url;
        },
        (error) => {
        }
      );
    }
  }

  fillManeuverChart(dial: string[]) {
    // Fill maneuver chart
    // map is for middle letter of maneuver code
    // 2NB would be 2 bank left blue
    const map: any = {
      'O' : { name: 'stop', index: 2 },
      'F' : { name: 'straight', index: 2 },
      'B' : { name: 'bankleft', index: 1 },
      'N' : { name: 'bankright', index: 3 },
      'T' : { name: 'turnleft', index: 0 },
      'Y' : { name: 'turnright', index: 4 },
      'K' : { name: 'kturn', index: 5 },
      'S' : { name: 'reversestraight', index: 2 },
      'E' : { name: 'trollleft', index: 5 },
      'R' : { name: 'trollright', index: 6 },
      'L' : { name: 'sloopleft', index: 5 },
      'P' : { name: 'sloopright', index: 6 },
      'A' : { name: 'reversebankleft', index: 1 },
      'D' : { name: 'reversebankright', index: 3 }
    };
    for (let i = 0; i < 8; i++) {
      const speed = (7 - i) - 2;
      this.maneuverChart[i] = { speed: speed, maneuvers: new Array(7) };
    }
    dial.forEach(
      (maneuverCode: string) => {
        let difficulty = 'white';
        if (maneuverCode[2] === 'R') {
          difficulty = 'red';
        }
        if (maneuverCode[2] === 'B') {
          difficulty = 'blue';
        }
        const index = map[maneuverCode[1]].index;
        const name = map[maneuverCode[1]].name;
        const speed = parseInt(maneuverCode[0], 10);
        const row: any = this.maneuverChart.find((r) => r.speed === speed);
        const maneuver = { name: name, difficulty: difficulty };
        row.maneuvers[index] = maneuver;
      }
    );
  }

  hasManeuvers(row: any): boolean {
    const maneuvers = row.maneuvers;
    for (const cell of maneuvers) {
      if (cell) {
        return true;
      }
    }
    return false;
  }
}
