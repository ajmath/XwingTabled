
export interface Remaining {
  remaining: number;
}
export interface Chargeable {
  value: number;
  recovers: number;
}

export interface PilotStat {
  type: string;
  remaining: number;
}

export type DamageCardType = 'Pilot'; // TODO add more
export interface DamageCardDef {
  type: DamageCardType;
  title: string;
  text: string;
  amount: number;
}

export interface DamageCard extends DamageCardDef {
  exposed: boolean;
  initials: string;
}

export interface ManifestFaction {
  xws: string;
  name: string;
  ffg: number;
}

export interface ManifestDamageDeck {
  cards: DamageCardDef[];
}

export interface ManifestShipStats {
  type: string;
  arc: string;
  value: string;
}

export interface Action {
  type: string;
  difficulty: 'White' | 'Green' | 'Red';
  linked: Action;
}

export interface Keyed {
  keyname: string;
}

export interface FactionShipBase {
  stats: ManifestShipStats[];
  name: string;
  actions: Action[];
  xws: string;
  ffg: number;
  dial: string[];
  faction: string;
  size: BaseSize;
}
export interface FactionShip extends FactionShipBase {
  pilots: FactionShipPilot[];
}

export type SlotType = string; // TODO enumerate list of slots

export interface ManifestFactionAction {
  xws: string;
  ffg: number;
  name: string;
}
export interface FactionShipPilot {
  slots: SlotType[];
  xws: string;
  ffg: number;
  ability: string;
  initiative: number;
  cost: number;
  name: string;
  artwork: string;
  caption: string;
  image: string;
  charges: Chargeable;
  limited: number;
}

export interface FactionPilots {
  faction: string;
  ships: {[shipName: string]: FactionShip};
}

export interface CardType {
  xws: string;
  ffg: number;
  type: string;
}

export interface Condition {
  xws: string;
  name: string;
  artwork: string;
  ability: string;
  image?: string;
}

export interface Shims {
  xwsShip: {[s: string]: string};
  xwsUpgrade: {[s: string]: string};
  xwsPilot: {[s: string]: string};
}

export interface UpgradeSide {
  ffg: number;
  slots: SlotType[];
  artwork: string;
  type: SlotType;
  ability: string;
  image: string;
  title: string;
  charges: {
    recovers: number;
    value: number;
  };
}

type BaseSize = 'Medium' | 'Large' | 'Small' | 'Huge';

export interface BaseRestriction {
  sizes: BaseSize[];
}

export type Restrictions = BaseRestriction;

export interface Upgrade {
  sides: UpgradeSide[];
  xws: string;
  limited: number;
  name: string;
  cost: {
    value: number;
  };
  restrictions: Restrictions;
}

export interface Manifest {
  factions: ManifestFaction[];
  damagedecks: ManifestDamageDeck[];
  pilots: FactionPilots[];
  actions: Array<ManifestFactionAction[]>;
  'card-types': CardType[];
  upgrades: {[upgradeType: string]: Upgrade[]};
  stats: never; // TODO type this
  shims: Shims;
  yasb: {[yasbUpgradeId: string]: {
    slot: string;
    xws: string;
  }};
  version: string;
  'upgrade-types': never[]; // TODO type me
  conditions: Condition[];
  'quick-builds': never[]; // TODO type me
}

export interface SquadronPilot {
  card_text: string;
  conditions: Condition[];
  damagecards: DamageCard[];
  id: string;
  num: number;
  pilot: FactionShipPilot;
  points: number;
  pointsDestroyed: number;
  ship: FactionShipBase;
  stats: PilotStat[];
  upgrades: SquadronUpgrade[];
}

export interface SquadronUpgrade extends Upgrade {
  type: string;
}

export interface SquadronShip {
  actions: Action[];
  dial: string[];
  faction: string;
  ffg: number;
  keyname: number;
  name: string;
  stats: ManifestShipStats[];
  xws: string;
}

export interface Squadron {
  damagedeck: DamageCard[];
  damagediscard: DamageCard[];
  faction: string;
  name: string;
  pilots: SquadronPilot[];
  points: number;
  pointsDestroyed: number;
}

export interface XwsSquadronPilot {
  id: string;
  ship: string;
  upgrades: {[upgradeType: string]: string[]};
  points?: number;
  name?: string;
}
export interface XwsSquadron {
  faction: string;
  name: string;
  pilots: XwsSquadronPilot[];
  points?: number;
  description?: string;
}
