import { Injectable } from '@angular/core';
import { XwingDataService } from './xwing-data.service';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { DamageCard } from '../types';

@Injectable({
  providedIn: 'root'
})
export class XwingStateService {
  public initialized = false;
  public squadron: any = { };
  public snapshots: any[ ] = [ ];
  public damagedeck: DamageCard[ ] = [ ];
  public damagediscard: any[ ] = [ ];

  constructor(public dataService: XwingDataService,
              private events: Events,
              private storage: Storage,
              public toastController: ToastController) {

  }

  reset() {
    this.squadron = { };
    this.snapshots = [ ];
    this.initialized = false;
  }

  async restoreFromDisk() {
    await this.storage.ready();
    const snapshots = await this.storage.get('snapshots');

    if (snapshots) {
      this.snapshots = snapshots;
      const lastSnapshot = JSON.parse(JSON.stringify(this.snapshots[this.snapshots.length - 1]));
      if (lastSnapshot.squadrons) {
        console.log('Legacy snapshot found');
        lastSnapshot.squadron = lastSnapshot.squadrons[0];
        lastSnapshot.damagedeck = lastSnapshot.squadrons[0].damagedeck;
        lastSnapshot.damagediscard = lastSnapshot.squadrons[0].damagediscard;
        this.snapshots = [ lastSnapshot ];
      }
      this.squadron = lastSnapshot.squadron;
      this.damagedeck = lastSnapshot.damagedeck;
      this.damagediscard = lastSnapshot.damagediscard;
      this.injectNums();
      console.log('Squadron restored', this.squadron);
      this.initialized = true;
    } else {
      this.squadron = null;
      this.initialized = false;
    }
  }

  getLastSnapshotTime() {
    return this.snapshots[this.snapshots.length - 1].time;
  }

  resetSquadron() {
    this.squadron.pointsDestroyed = 0;
    this.damagediscard = [ ];
    this.damagedeck = this.dataService.getDamageDeck();
    this.shuffleDamageDeck();
    this.squadron.pilots.forEach(
      (pilot) => {
        pilot.damagecards = [ ];
        pilot.conditions = [ ];
        pilot.pointsDestroyed = 0;
        pilot.stats.forEach(
          (stat) => {
            stat.remaining = stat.value;
          }
        );
        pilot.upgrades.forEach(
          (upgrade) => {
            upgrade.side = 0;
            if (upgrade.sides[0].charges) {
              upgrade.sides[0].charges.remaining = upgrade.sides[0].charges.value;
            }
          }
        );
      }
    );
    this.snapshot();
  }

  rechargeAllRecurring() {
    const recover = (stat) => {
      stat.remaining += stat.recovers;
      if (stat.remaining > stat.value) {
        stat.remaining = stat.value;
      }
    };

    this.squadron.pilots.forEach(
      (pilot) => {
        for (let i = 0; i < pilot.stats.length; i++) {
          const stat = pilot.stats[i];
          if (stat.recovers) {
            recover(stat);
            pilot.stats.splice(i, 1, JSON.parse(JSON.stringify(stat)));
          }
        }
        pilot.upgrades.forEach(
          (upgrade) => {
            const side = upgrade.sides[0];
            if (side.charges && side.charges.recovers) {
              recover(side.charges);
              side.charges = JSON.parse(JSON.stringify(side.charges));
            }
          }
        );
      }
    );
    this.snapshot();
  }

  async snapshot() {
    if (this.snapshots.length >= 5) {
      this.snapshots.shift();
    }
    this.snapshots.push({ time: new Date().toISOString(),
                          squadron: JSON.parse(JSON.stringify(this.squadron)),
                          damagedeck: JSON.parse(JSON.stringify(this.damagedeck)),
                          damagediscard: JSON.parse(JSON.stringify(this.damagediscard)) });
    this.storage.set('snapshots', this.snapshots);
    console.log('snapshot created', this.snapshots);
    const toast = await this.toastController.create({
      message: 'Snapshot created ' + this.getLastSnapshotTime(),
      duration: 2000,
      position: 'bottom'
    });
    return toast.present();
  }

  snapshotCheck() {
    if (this.snapshots.length) {
      const lastSnapshot = this.snapshots[this.snapshots.length - 1];
      if (JSON.stringify(lastSnapshot.squadron) !== JSON.stringify(this.squadron) ||
          JSON.stringify(lastSnapshot.damagedeck) !== JSON.stringify(this.damagedeck) ||
          JSON.stringify(lastSnapshot.damagediscard) !== JSON.stringify(this.damagediscard)) {
        this.snapshot();
      }
    }
  }

  undo() {
    this.snapshots.pop();
    const snapshot = this.snapshots.pop();
    this.squadron = snapshot.squadron;
    this.damagedeck = snapshot.damagedeck;
    this.damagediscard = snapshot.damagediscard;
    this.snapshot();
    return snapshot.time;
  }

  injectNums() {
    for (let pilotNum = 0; pilotNum < this.squadron.pilots.length; pilotNum++) {
      const pilot = this.squadron.pilots[pilotNum];
      pilot.num = pilotNum;
      for (let upgradeNum = 0; upgradeNum < pilot.upgrades.length; upgradeNum++) {
        pilot.upgrades[upgradeNum].num = upgradeNum;
      }
    }
  }

  setSquadron(squadron: any) {
    this.squadron = squadron;
    this.damagedeck = this.dataService.getDamageDeck();
    this.damagediscard = [ ];
    this.injectNums();
    this.shuffleDamageDeck();
    this.initialized = true;
    this.snapshot();
  }

  async shuffleDamageDeck() {
    const newDeck: DamageCard[] = [ ];
    while (this.damagedeck.length > 0) {
      const index = Math.floor(Math.random() * Math.floor(this.damagedeck.length));
      const card = this.damagedeck[index];
      this.damagedeck.splice(index, 1);
      newDeck.push(card);
    }
    this.damagedeck = newDeck;
    this.snapshot();
    const toast = await this.toastController.create({
      message: 'Damage Deck shuffled',
      duration: 2000,
      position: 'top'
    });
    return toast.present();
  }

  shuffleDamageDiscard() {
    this.damagediscard.forEach(
      (card) => {
        this.damagedeck.push(card);
      }
    );
    this.damagediscard = [ ];
    this.shuffleDamageDeck();
  }

  discard(card: DamageCard) {
    this.damagediscard.push(card);
  }

  draw(): DamageCard | undefined {
    return this.damagedeck.shift();
  }

  async postDamage(pilot: any) {
    // Get the hull stat
    const hull = pilot.stats.find((stat) => stat.type === 'hull');
    // Compute hull remaining based on number of damage cards
    hull.remaining = hull.value - pilot.damagecards.length;
    // Calculate points destroyed
    if (hull.remaining <= 0) {
      pilot.pointsDestroyed = pilot.points;
      const toast = await this.toastController.create({
        message: pilot.pilot.name + ' destroyed',
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    } else {
      let totalPoints = hull.value;
      let remainingPoints = hull.remaining;
      const shields = pilot.stats.find((stat) => stat.type === 'shields');
      if (shields) {
        totalPoints += shields.value;
        remainingPoints += shields.remaining;
      }
      const threshold = Math.floor(totalPoints / 2);
      if (remainingPoints === threshold ||
          remainingPoints === threshold - 1) {
        pilot.pointsDestroyed = Math.ceil(pilot.points / 2);
        const toast = await this.toastController.create({
          message: pilot.name + ' at half points',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    }
    this.squadron.pointsDestroyed = 0;
    this.squadron.pilots.forEach((p) => {
      this.squadron.pointsDestroyed += p.pointsDestroyed;
    });
    if (this.squadron.pointsDestroyed === this.squadron.points) {
      this.squadron.pointsDestroyed = 200;
    }
  }

  drawHit(pilot: any) {
    const card = this.damagedeck.shift();
    if (card) {
      card.exposed = false;
      pilot.damagecards.push(card);
      this.postDamage(pilot);
      return true;
    } else {
      return false;
    }
  }

  drawCrit(pilot: any) {
    const card = this.damagedeck.shift();
    if (card) {
      card.exposed = true;
      pilot.damagecards.push(card);
      this.postDamage(pilot);
      return true;
    } else {
      return false;
    }
  }
}
