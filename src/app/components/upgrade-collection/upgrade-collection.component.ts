import { Component, OnInit, Input } from '@angular/core';
import { isArray } from 'util';

@Component({
  selector: 'xws-upgrade-collection',
  templateUrl: './upgrade-collection.component.html',
  styleUrls: ['./upgrade-collection.component.scss']
})
export class UpgradeCollectionComponent implements OnInit {
  @Input() upgrades;

  upgradeList = [ ];

  constructor() { }

  ngOnInit() {
    Object.entries(this.upgrades).forEach(
      ( [upgradeType, upgradeArray] ) => {
        if (isArray(upgradeArray)) {
          upgradeArray.forEach(
            (upgradeName) => {
              this.upgradeList.push( { upgradeType: upgradeType, upgradeName: upgradeName })
            }
          )
        } else {
          // Just in case an one of the type/array pairs is actually a type/name pair
          this.upgradeList.push( {upgradeType: upgradeType, upgradeName: upgradeArray });
        }
      }
    )
  }
}
