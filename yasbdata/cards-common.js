/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS104: Avoid inline assignments
 * DS202: Simplify dynamic range loops
 * DS204: Change includes calls to have a more natural evaluation order
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// This must be loaded before any of the card language modules!
const exportObj = typeof exports !== 'undefined' && exports !== null ? exports : this;

exportObj.unreleasedExpansions = [
];

exportObj.isReleased = function(data) {
    for (let source of Array.from(data.sources)) {
        if (!Array.from(exportObj.unreleasedExpansions).includes(source)) { return true; }
    }
    return false;
};

exportObj.secondEditionExpansions = [
    'Second Edition Core Set',
    "Saw's Renegades Expansion Pack",
    'TIE Reaper Expansion Pack',
    'T-65 X-Wing Expansion Pack',
    'BTL-A4 Y-Wing Expansion Pack',
    'TIE/ln Fighter Expansion Pack',
    'TIE Advanced x1 Expansion Pack',
    'Slave I Expansion Pack',
    'Fang Fighter Expansion Pack',
    "Lando's Millennium Falcon Expansion Pack",
    'T-70 X-Wing Expansion Pack',
    'RZ-2 A-Wing Expansion Pack',
    'Mining Guild TIE Expansion Pack',
    'TIE/FO Fighter Expansion Pack'
];

exportObj.secondEditionCheck = function(data, faction) {
    // Handle special cases
    if (faction == null) { faction = ''; }
    if ((data.name === 'Y-Wing') && (faction === 'Scum and Villainy')) {
        return false;
    } else if ((data.name === 'TIE Fighter') && (faction === 'Rebel Alliance')) {
        return false;
    }
    for (let source of Array.from(data.sources)) {
        if (Array.from(exportObj.secondEditionExpansions).includes(source)) { return true; }
    }
    return false;
};

String.prototype.canonicalize = function() {
    return this.toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .replace(/\s+/g, '-');
};

exportObj.hugeOnly = ship => ship.data.huge != null ? ship.data.huge : false;

// Returns an independent copy of the data which can be modified by translation
// modules.
exportObj.basicCardData = () =>
    ({
        ships: {
            "X-Wing": {
                name: "X-Wing",
                xws: "T-65 X-Wing".canonicalize(),
                factions: [ "Rebel Alliance", ],
                attack: 3,
                agility: 2,
                hull: 4,
                shields: 2,
                actions: [
                    "Focus",
                    "Lock",
                    "Barrel Roll"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 0, 2, 2, 2, 0, 0, 0, 0, 0, 0],
                  [ 1, 2, 2, 2, 1, 0, 0, 0, 0, 0],
                  [ 1, 1, 1, 1, 1, 0, 0, 0, 3, 3],
                  [ 0, 0, 1, 0, 0, 3, 0, 0, 0, 0]
                ]
            },
            "Y-Wing": {
                name: "Y-Wing",
                xws: "BTL-A4 Y-Wing".canonicalize(),
                factions: [ "Rebel Alliance", "Scum and Villainy" ],
                attack: 2,
                agility: 1,
                hull: 6,
                shields: 2,
                actions: [
                    "Focus",
                    "Lock"
                ],
                actionsred: [
                    "Barrel Roll",
                    "Reload"
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0],
                  [ 0, 2, 2, 2, 0, 0],
                  [ 1, 1, 2, 1, 1, 0],
                  [ 3, 1, 1, 1, 3, 0],
                  [ 0, 0, 3, 0, 0, 3]
                ]
            },
            "A-Wing": {
                name: "A-Wing",
                xws: "RZ-1 A-Wing".canonicalize(),
                factions: [ "Rebel Alliance" ],
                attack: 2,
                agility: 3,
                hull: 2,
                shields: 2,
                actions: [
                    "Focus",
                    "Evade",
                    "Lock",
                    "Barrel Roll",
                    "Boost"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 1, 0, 0, 0, 1, 0, 0, 0],
                  [ 2, 2, 2, 2, 2, 0, 0, 0],
                  [ 1, 1, 2, 1, 1, 0, 3, 3],
                  [ 0, 0, 2, 0, 0, 0, 0, 0],
                  [ 0, 0, 2, 0, 0, 3, 0, 0]
                ]
            },
            "YT-1300": {
                name: "YT-1300",
                xws: "Modified YT-1300 Light Freighter".canonicalize(),
                factions: [ "Rebel Alliance" ],
                attackdt: 3,
                agility: 1,
                hull: 8,
                shields: 5,
                actions: [
                    "Focus",
                    "Lock",
                    "Rotate Arc"
                ],
                actionsred: [
                    "Boost"
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 0, 1, 2, 1, 0, 0, 0, 0],
                  [ 1, 2, 2, 2, 1, 0, 0, 0],
                  [ 1, 1, 2, 1, 1, 0, 3, 3],
                  [ 0, 0, 1, 0, 0, 3, 0, 0]
                ],
                large: true
            },
            "Customized YT-1300": {
                name: "Customized YT-1300",
                canonical_name: 'Customized YT-1300'.canonicalize(),
                xws: "Customized YT-1300 Light Freighter".canonicalize(),
                factions: [ "Scum and Villainy" ],
                attackdt: 2,
                agility: 1,
                hull: 8,
                shields: 3,
                actions: [
                    "Focus",
                    "Lock",
                    "Rotate Arc"
                ],
                actionsred: [
                    "Boost"
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 0, 2, 2, 2, 0, 0, 0, 0],
                  [ 1, 1, 2, 1, 1, 0, 0, 0],
                  [ 1, 1, 2, 1, 1, 0, 3, 3],
                  [ 0, 0, 1, 0, 0, 3, 0, 0]
                ],
                large: true
            },
            "TIE Fighter": {
                name: "TIE Fighter",
                xws: "TIE/LN Fighter".canonicalize(),
                factions: ["Rebel Alliance", "Galactic Empire"],
                attack: 2,
                agility: 3,
                hull: 3,
                shields: 0,
                actions: [
                    "Focus",
                    "Barrel Roll",
                    "Evade"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0],
                  [ 1, 0, 0, 0, 1, 0],
                  [ 1, 2, 2, 2, 1, 0],
                  [ 1, 1, 2, 1, 1, 3],
                  [ 0, 0, 1, 0, 0, 3],
                  [ 0, 0, 1, 0, 0, 0]
                ]
            },
            "TIE Advanced": {
                name: "TIE Advanced",
                xws: "TIE Advanced X1".canonicalize(),
                factions: [ "Galactic Empire" ],
                attack: 2,
                agility: 3,
                hull: 3,
                shields: 2,
                actions: [
                    "Focus", 
                    "R> Barrel Roll",
                    "Lock",
                    "Barrel Roll"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 0, 2, 1, 2, 0, 0, 0, 0, 0, 0],
                  [ 1, 2, 2, 2, 1, 0, 0, 0, 0, 0],
                  [ 1, 1, 2, 1, 1, 0, 0, 0, 3, 3],
                  [ 0, 0, 1, 0, 0, 3, 0, 0, 0, 0],
                  [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
                ]
            },
            "TIE Interceptor": {
                name: "TIE Interceptor",
                xws: "TIE Interceptor".canonicalize(),
                factions: [ "Galactic Empire" ],
                attack: 3,
                agility: 3,
                hull: 3,
                shields: 0,
                actions: [
                    "Focus",
                    "Barrel Roll",
                    "Boost",
                    "Evade"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 1, 0, 0, 0, 1, 0, 0, 0],
                  [ 2, 2, 2, 2, 2, 0, 0, 0],
                  [ 1, 1, 2, 1, 1, 0, 3, 3],
                  [ 0, 0, 2, 0, 0, 3, 0, 0],
                  [ 0, 0, 1, 0, 0, 0, 0, 0]
                ]
            },
            "Firespray-31": {
                name: "Firespray-31",
                xws: "Firespray-Class Patrol Craft".canonicalize(),
                factions: [ "Scum and Villainy", ],
                attack: 3,
                attackb: 3,
                agility: 2,
                hull: 6,
                shields: 4,
                medium: true,
                actions: [
                    "Focus",
                    "Lock",
                    "Boost"
                ],
                actionsred: [
                    "Reinforce"
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 1, 2, 2, 2, 1, 0, 0, 0, 0, 0],
                  [ 1, 1, 2, 1, 1, 0, 0, 0, 0, 0],
                  [ 0, 1, 2, 1, 0, 0, 0, 0, 3, 3],
                  [ 0, 0, 1, 0, 0, 3, 0, 0, 0, 0]
                ]
            },
            "HWK-290": {
                name: "HWK-290",
                xws: "Hwk-290 Light Freighter".canonicalize(),
                factions: [ "Rebel Alliance", "Scum and Villainy" ],
                attackt: 2,
                agility: 2,
                hull: 3,
                shields: 2,
                actions: [
                    "Focus",
                    "R> Rotate Arc",
                    "Lock", 
                    "R> Rotate Arc",
                    "Rotate Arc"
                ],
                actionsred: [
                    "Boost",
                    "Jam"
                ],
                maneuvers: [
                  [ 0, 0, 3, 0, 0],
                  [ 0, 2, 2, 2, 0],
                  [ 1, 1, 2, 1, 1],
                  [ 3, 1, 2, 1, 3],
                  [ 0, 0, 1, 0, 0]
                ]
            },
            "Lambda-Class Shuttle": {
                name: "Lambda-Class Shuttle",
                xws: "Lambda-Class T-4a Shuttle".canonicalize(),
                factions: [ "Galactic Empire", ],
                attack: 3,
                attackb: 2,
                agility: 1,
                hull: 6,
                shields: 4,
                actions: [
                    "Focus",
                    "Coordinate",
                    "Reinforce"
                ],
                actionsred: [
                    "Jam"
                ],
                maneuvers: [
                  [ 0, 0, 3, 0, 0],
                  [ 0, 2, 2, 2, 0],
                  [ 3, 1, 2, 1, 3],
                  [ 0, 3, 1, 3, 0]
                ],
                large: true
            },
            "B-Wing": {
                name: "B-Wing",
                xws: "A/SF-01 B-Wing".canonicalize(),
                factions: [ "Rebel Alliance", ],
                attack: 3,
                agility: 1,
                hull: 4,
                shields: 4,
                actions: [
                    "Focus",
                    "R> Barrel Roll",
                    "Lock",
                    "Barrel Roll"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 3, 2, 2, 2, 3, 0, 0, 0, 3, 3],
                  [ 1, 1, 2, 1, 1, 3, 0, 0, 0, 0],
                  [ 0, 3, 2, 3, 0, 0, 0, 0, 0, 0],
                  [ 0, 0, 3, 0, 0, 0, 0, 0, 0, 0]
                ]
            },
            "TIE Bomber": {
                name: "TIE Bomber",
                xws: "TIE/SA Bomber".canonicalize(),
                factions: [ "Galactic Empire", ],
                attack: 2,
                agility: 2,
                hull: 6,
                shields: 0,
                actions: [
                    "Focus",
                    "Lock",
                    "Barrel Roll",
                    "R> Lock"
                ],
                actionsred: [
                    "Reload"
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0],
                  [ 0, 1, 2, 1, 0, 0],
                  [ 1, 2, 2, 2, 1, 0],
                  [ 1, 1, 2, 1, 1, 3],
                  [ 0, 0, 1, 0, 0, 0],
                  [ 0, 0, 0, 0, 0, 3]
                ]
            },
            "Z-95 Headhunter": {
                name: "Z-95 Headhunter",
                xws: "Z-95-AF4 Headhunter".canonicalize(),
                factions: [ "Rebel Alliance", "Scum and Villainy", ],
                attack: 2,
                agility: 2,
                hull: 2,
                shields: 2,
                actions: [
                    "Focus",
                    "Lock"
                ],
                actionsred: [
                    "Barrel Roll"
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0],
                  [ 0, 1, 2, 1, 0, 0],
                  [ 1, 2, 2, 2, 1, 0],
                  [ 1, 1, 2, 1, 1, 3],
                  [ 0, 0, 1, 0, 0, 3]
                ]
            },
            "TIE Defender": {
                name: "TIE Defender",
                xws: "TIE/D Defender".canonicalize(),
                factions: [ "Galactic Empire", ],
                attack: 3,
                agility: 3,
                hull: 3,
                shields: 4,
                actions: [
                    "Focus",
                    "Evade",
                    "Lock",
                    "Barrel Roll",
                    "Boost"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0],
                  [ 3, 2, 0, 2, 3, 0],
                  [ 3, 1, 2, 1, 3, 3],
                  [ 1, 1, 2, 1, 1, 0],
                  [ 0, 0, 2, 0, 0, 1],
                  [ 0, 0, 2, 0, 0, 0]
                ]
            },
            "E-Wing": {
                name: "E-Wing",
                xws: "E-Wing".canonicalize(),
                factions: [ "Rebel Alliance", ],
                attack: 3,
                agility: 3,
                hull: 3,
                shields: 3,
                actions: [
                    "Focus",
                    "Evade",
                    "Lock",
                    "Barrel Roll",
                    "R> Lock",
                    "Boost",
                    "R> Lock"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 3, 2, 2, 2, 3, 0, 0, 0 ],
                    [ 1, 1, 2, 1, 1, 0, 0, 0 ],
                    [ 1, 1, 2, 1, 1, 0, 3, 3 ],
                    [ 0, 0, 2, 0, 0, 3, 0, 0 ],
                    [ 0, 0, 1, 0, 0, 0, 0, 0 ]
                ]
            },
            "TIE Phantom": {
                name: "TIE Phantom",
                xws: "TIE/PH Phantom".canonicalize(),
                factions: [ "Galactic Empire", ],
                attack: 3,
                agility: 2,
                hull: 3,
                shields: 2,
                actions: [
                    "Focus",
                    "Evade",
                    "Barrel Roll",
                    "Cloak"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0],
                    [ 1, 1, 0, 1, 1, 0],
                    [ 1, 2, 2, 2, 1, 0],
                    [ 1, 1, 2, 1, 1, 3],
                    [ 0, 0, 1, 0, 0, 3]
                ]
            },
            "YT-2400": {
                name: "YT-2400",
                xws: "YT-2400 Light Freighter".canonicalize(),
                factions: [ "Rebel Alliance", ],
                attackdt: 4,
                agility: 2,
                hull: 6,
                shields: 4,
                actions: [
                    "Focus",
                    "Lock",
                    "Rotate Arc"
                ],
                actionsred: [
                    "Barrel Roll"
                ],
                large: true,
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0],
                    [ 1, 2, 2, 2, 1, 0],
                    [ 1, 1, 2, 1, 1, 0],
                    [ 1, 1, 1, 1, 1, 0],
                    [ 0, 0, 1, 0, 0, 3]
                ]
            },
            "VT-49 Decimator": {
                name: "VT-49 Decimator",
                xws: "VT-49 Decimator".canonicalize(),
                factions: [ "Galactic Empire", ],
                attackdt: 3,
                agility: 0,
                hull: 12,
                shields: 4,
                actions: [
                    "Focus",
                    "Lock",
                    "Reinforce",
                    "Rotate Arc"
                ],
                actionsred: [
                    "Coordinate"
                ],
                large: true,
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0],
                    [ 3, 2, 2, 2, 3, 0],
                    [ 1, 1, 2, 1, 1, 0],
                    [ 1, 1, 1, 1, 1, 0],
                    [ 0, 0, 1, 0, 0, 0]
                ]
            },
            "StarViper": {
                name: "StarViper",
                xws: "Starviper-Class Attack Platform".canonicalize(),
                factions: ["Scum and Villainy"],
                attack: 3,
                agility: 3,
                hull: 4,
                shields: 1,
                actions: [
                    "Focus",
                    "Lock",
                    "Barrel Roll",
                    "R> Focus",
                    "Boost",
                    "R> Focus"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0, 0, 0],
                    [ 1, 2, 2, 2, 1, 0, 0, 0],
                    [ 1, 2, 2, 2, 1, 0, 0, 0],
                    [ 0, 1, 2, 1, 0, 0, 3, 3],
                    [ 0, 0, 1, 0, 0, 0, 0, 0]
                ]
            },
            "M3-A Interceptor": {
                name: "M3-A Interceptor",
                xws: "M3-A Interceptor".canonicalize(),
                factions: [ "Scum and Villainy" ],
                attack: 2,
                agility: 3,
                hull: 3,
                shields: 1,
                actions: [
                    "Focus",
                    "Evade",
                    "Lock",
                    "Barrel Roll"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0 ],
                    [ 1, 2, 0, 2, 1, 0 ],
                    [ 1, 1, 2, 1, 1, 0 ],
                    [ 0, 1, 2, 1, 0, 3 ],
                    [ 0, 0, 1, 0, 0, 0 ],
                    [ 0, 0, 1, 0, 0, 3 ]
                ]
            },
            "Aggressor": {
                name: "Aggressor",
                xws: "Aggressor Assault Fighter".canonicalize(),
                factions: [ "Scum and Villainy" ],
                attack: 3,
                agility: 3,
                hull: 5,
                shields: 3,
                actions: [
                    "Calculate",
                    "Evade",
                    "Lock",
                    "Boost"
                ],
                actionsred: [
                ],
                medium: true,
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 1, 2, 2, 2, 1, 0, 0, 0 ],
                    [ 1, 2, 2, 2, 1, 0, 0, 0 ],
                    [ 0, 2, 2, 2, 0, 0, 3, 3 ],
                    [ 0, 0, 1, 0, 0, 3, 0, 0 ]
                ]
            },
            "YV-666": {
                name: "YV-666",
                xws: "YV-666 Light Freighter".canonicalize(),
                factions: [ "Scum and Villainy" ],
                attackf: 3,
                agility: 1,
                hull: 9,
                shields: 3,
                large: true,
                actions: [
                    "Focus",
                    "Reinforce",
                    "Lock"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 3, 0, 0, 0 ],
                    [ 0, 2, 2, 2, 0, 0 ],
                    [ 3, 1, 2, 1, 3, 0 ],
                    [ 1, 1, 2, 1, 1, 0 ],
                    [ 0, 0, 1, 0, 0, 0 ]
                ]
            },
            "Kihraxz Fighter": {
                name: "Kihraxz Fighter",
                xws: "Kihraxz Fighter".canonicalize(),
                factions: ["Scum and Villainy"],
                attack: 3,
                agility: 2,
                hull: 5,
                shields: 1,
                actions: [
                    "Focus",
                    "Lock",
                    "Barrel Roll"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 1, 2, 0, 2, 1, 0, 0, 0, 0, 0 ],
                    [ 1, 2, 2, 2, 1, 0, 0, 0, 3, 3 ],
                    [ 0, 1, 2, 1, 0, 0, 0, 0, 0, 0 ],
                    [ 0, 0, 1, 0, 0, 3, 0, 0, 0, 0 ]
                ]
            },
            "K-Wing": {
                name: "K-Wing",
                xws: "BTL-S8 K-Wing".canonicalize(),
                factions: ["Rebel Alliance"],
                attackdt: 2,
                agility: 1,
                hull: 6,
                shields: 3,
                medium: true,
                actions: [
                    "Focus",
                    "Lock",
                    "Slam",
                    "Rotate Arc",
                    "Reload"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0 ],
                    [ 0, 2, 2, 2, 0, 0 ],
                    [ 1, 1, 2, 1, 1, 0 ],
                    [ 0, 1, 1, 1, 0, 0 ]
                ]
            },
            "TIE Punisher": {
                name: "TIE Punisher",
                xws: "TIE/CA Punisher".canonicalize(),
                factions: ["Galactic Empire"],
                attack: 2,
                agility: 1,
                hull: 6,
                shields: 3,
                medium: true,
                actions: [
                    "Focus",
                    "Lock",
                    "Boost", 
                    "R> Lock",
                    "Reload"
                ],
                actionsred: [
                    "Barrel Roll"
                ],
                maneuvers: [
                    [ 0, 0, 3, 0, 0, 0 ],
                    [ 0, 2, 2, 2, 0, 0 ],
                    [ 1, 1, 2, 1, 1, 0 ],
                    [ 3, 1, 1, 1, 3, 0 ],
                    [ 0, 0, 0, 0, 0, 3 ]
                ]
            },
            "VCX-100": {
                name: "VCX-100",
                xws: "VCX-100 Light Freighter".canonicalize(),
                factions: ["Rebel Alliance"],
                attack: 4,
                agility: 0,
                hull: 10,
                shields: 4,
                large: true,
                actions: [
                    "Focus",
                    "Lock",
                    "Reinforce"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0 ],
                    [ 3, 1, 2, 1, 3, 0 ],
                    [ 1, 2, 2, 2, 1, 0 ],
                    [ 3, 1, 1, 1, 3, 0 ],
                    [ 0, 0, 1, 0, 0, 3 ]
                ]
            },
            "Attack Shuttle": {
                name: "Attack Shuttle",
                xws: "Attack Shuttle".canonicalize(),
                factions: ["Rebel Alliance"],
                attack: 3,
                agility: 2,
                hull: 3,
                shields: 1,
                actions: [
                    "Focus",
                    "Evade",
                    "Barrel Roll",
                    "R> Evade"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0 ],
                    [ 3, 2, 2, 2, 3, 0 ],
                    [ 1, 1, 2, 1, 1, 0 ],
                    [ 3, 1, 1, 1, 3, 0 ],
                    [ 0, 0, 1, 0, 0, 3 ]
                ]
            },
            "TIE Advanced Prototype": {
                name: "TIE Advanced Prototype",
                xws: "TIE Advanced V1".canonicalize(),
                factions: ["Galactic Empire"],
                attack: 2,
                agility: 3,
                hull: 2,
                shields: 2,
                actions: [
                    "Focus",
                    "Evade",
                    "Lock",
                    "Barrel Roll",
                    "R> Focus",
                    "Boost",
                    "R> Focus"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 2, 2, 0, 2, 2, 0, 0, 0, 0, 0 ],
                    [ 1, 1, 2, 1, 1, 0, 0, 0, 3, 3 ],
                    [ 1, 1, 2, 1, 1, 0, 0, 0, 0, 0 ],
                    [ 0, 0, 1, 0, 0, 3, 0, 0, 0, 0 ],
                    [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ]
                ]
            },
            "G-1A Starfighter": {
                name: "G-1A Starfighter",
                xws: "G-1A Starfighter".canonicalize(),
                factions: ["Scum and Villainy"],
                attack: 3,
                agility: 1,
                hull: 5,
                shields: 4,
                medium: true,
                actions: [
                    "Focus",
                    "Lock",
                    "Jam"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 3, 0, 0, 0 ],
                    [ 3, 2, 2, 2, 3, 0 ],
                    [ 1, 1, 2, 1, 1, 3 ],
                    [ 0, 3, 1, 3, 0, 0 ],
                    [ 0, 0, 3, 0, 0, 3 ]
                ]
            },
            "JumpMaster 5000": {
                name: "JumpMaster 5000",
                xws: "JumpMaster 5000".canonicalize(),
                factions: ["Scum and Villainy"],
                large: true,
                attackt: 2,
                agility: 2,
                hull: 6,
                shields: 3,
                actions: [
                    "Focus",
                    "R> Rotate Arc",
                    "Lock",
                    "R> Rotate Arc"
                ],
                actionsred: [
                    "Barrel Roll"
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 1, 2, 2, 1, 3, 0, 0, 0 ],
                    [ 1, 2, 2, 1, 3, 0, 0, 0 ],
                    [ 0, 2, 2, 1, 0, 0, 3, 0 ],
                    [ 0, 0, 1, 0, 0, 3, 0, 0 ]
                ]
            },
            "ARC-170": {
                name: "ARC-170",
                xws: "Arc-170 Starfighter".canonicalize(),
                factions: ["Rebel Alliance","Galactic Republic"],
                attack: 3,
                attackb: 2,
                agility: 1,
                hull: 6,
                shields: 3,
                medium: true,
                actions: [
                    "Focus",
                    "Lock"
                ],
                actionsred: [
                    "Barrel Roll"
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0 ],
                    [ 0, 2, 2, 2, 0, 0 ],
                    [ 1, 2, 2, 2, 1, 0 ],
                    [ 3, 1, 1, 1, 3, 0 ],
                    [ 0, 0, 3, 0, 0, 3 ]
                ]
            },
            "Fang Fighter": {
                name: "Fang Fighter",
                canonical_name: 'Protectorate Starfighter'.canonicalize(),
                xws: "Fang fighter".canonicalize(),
                factions: ["Scum and Villainy"],
                attack: 3,
                agility: 3,
                hull: 4,
                shields: 0,
                actions: [
                    "Focus",
                    "Lock",
                    "Barrel Roll",
                    "R> Focus",
                    "Boost",
                    "R> Focus"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 1, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
                    [ 2, 2, 2, 2, 2, 0, 0, 0, 3, 3 ],
                    [ 1, 1, 2, 1, 1, 0, 0, 0, 0, 0 ],
                    [ 0, 0, 1, 0, 0, 3, 0, 0, 0, 0 ],
                    [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ]
                ]
            },
            "Lancer-Class Pursuit Craft": {
                name: "Lancer-Class Pursuit Craft",
                xws: "Lancer-Class Pursuit Craft".canonicalize(),
                factions: ["Scum and Villainy"],
                large: true,
                attack: 3,
                attackt: 2,
                agility: 2,
                hull: 8,
                shields: 2,
                actions: [
                    "Focus",
                    "Evade",
                    "Lock",
                    "Rotate Arc"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0],
                    [ 0, 1, 1, 1, 0, 0],
                    [ 1, 1, 2, 1, 1, 0],
                    [ 2, 2, 2, 2, 2, 0],
                    [ 0, 0, 2, 0, 0, 0],
                    [ 0, 0, 1, 0, 0, 3]
                ]
            },
            "Quadjumper": {
                name: "Quadjumper",
                xws: "Quadrijet Transfer Spacetug".canonicalize(),
                factions: ["Scum and Villainy"],
                attack: 2,
                agility: 2,
                hull: 5,
                shields: 0,
                actions: [
                    "Barrel Roll",
                    "Focus"
                ],
                actionsred: [
                    "Evade"
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 3, 0, 3 ],
                    [ 1, 2, 2, 2, 1, 0, 3, 3, 0, 0, 0, 3, 0 ],
                    [ 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
                ]
            },
            "U-Wing": {
                name: "U-Wing",
                xws: "UT-60D U-Wing".canonicalize(),
                factions: ["Rebel Alliance"],
                medium: true,
                attack: 3,
                agility: 2,
                hull: 5,
                shields: 3,
                actions: [
                    "Focus",
                    "Lock"
                ],
                actionsred: [
                    "Coordinate"
                ],
                maneuvers: [
                    [ 0, 0, 3, 0, 0 ],
                    [ 0, 2, 2, 2, 0 ],
                    [ 1, 2, 2, 2, 1 ],
                    [ 0, 1, 1, 1, 0 ],
                    [ 0, 0, 1, 0, 0 ]
                ]
            },
            "TIE Striker": {
                name: "TIE Striker",
                xws: "TIE/SK Striker".canonicalize(),
                factions: ["Galactic Empire"],
                attack: 3,
                agility: 2,
                hull: 4,
                shields: 0,
                actions: [
                    "Focus",
                    "Evade",
                    "Barrel Roll"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 1, 2, 2, 2, 1, 3, 0, 0 ],
                    [ 1, 2, 2, 2, 1, 0, 3, 3 ],
                    [ 0, 1, 2, 1, 0, 0, 0, 0 ]
                ]
            },
            "Auzituck Gunship": {
                name: "Auzituck Gunship",
                xws: "Auzituck Gunship".canonicalize(),
                factions: ["Rebel Alliance"],
                attackf: 3,
                agility: 1,
                hull: 6,
                shields: 2,
                actions: [
                    "Focus",
                    "Reinforce"
                ],
                actionsred: [
                    "Barrel Roll"
                ],
                maneuvers: [
                    [ 0, 0, 3, 0, 0, 0, 0, 0 ],
                    [ 0, 2, 2, 2, 0, 0, 0, 0 ],
                    [ 1, 1, 2, 1, 1, 0, 0, 0 ],
                    [ 1, 1, 2, 1, 1, 0, 0, 0 ],
                    [ 0, 0, 1, 0, 0, 0, 0, 0 ]
                ]
            },
            "Scurrg H-6 Bomber": {
                name: "Scurrg H-6 Bomber",
                xws: "Scurrg H-6 Bomber".canonicalize(),
                factions: ["Scum and Villainy"],
                attack: 3,
                agility: 1,
                hull: 6,
                shields: 4,
                medium: true,
                actions: [
                    "Focus",
                    "Lock"
                ],
                actionsred: [
                    "Barrel Roll"
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 0, 2, 2, 2, 0, 0, 0, 0, 0, 0 ],
                    [ 1, 1, 2, 1, 1, 0, 0, 0, 0, 0 ],
                    [ 3, 1, 1, 1, 3, 0, 0, 0, 3, 3 ],
                    [ 0, 0, 3, 0, 0, 0, 0, 0, 0, 0 ]
                ]
            },
            "TIE Aggressor": {
                name: "TIE Aggressor",
                xws: "TIE/AG Aggressor".canonicalize(),
                factions: ["Galactic Empire"],
                attack: 2,
                agility: 2,
                hull: 4,
                shields: 1,
                actions: [
                    "Focus",
                    "Lock",
                    "Barrel Roll", 
                    "R> Evade"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 0, 1, 2, 1, 0, 0, 0, 0, 0, 0 ],
                    [ 1, 2, 2, 2, 1, 0, 0, 0, 0, 0 ],
                    [ 1, 1, 2, 1, 1, 0, 0, 0, 0, 0 ],
                    [ 0, 0, 1, 0, 0, 3, 0, 0, 0, 0 ]
                ]
            },
            "Alpha-Class Star Wing": {
                name: "Alpha-Class Star Wing",
                xws: "Alpha-Class Star Wing".canonicalize(),
                factions: ["Galactic Empire"],
                attack: 2,
                agility: 2,
                hull: 4,
                shields: 3,
                actions: [
                    "Focus",
                    "Lock",
                    "Slam",
                    "Reload"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                    [ 0, 1, 2, 1, 0, 0, 0, 0 ],
                    [ 1, 2, 2, 2, 1, 0, 0, 0 ],
                    [ 1, 1, 1, 1, 1, 0, 0, 0 ],
                    [ 0, 0, 3, 0, 0, 0, 0, 0 ]
                ]
            },
            "M12-L Kimogila Fighter": {
                name: "M12-L Kimogila Fighter",
                xws: "M12-L Kimogila Fighter".canonicalize(),
                factions: ["Scum and Villainy"],
                attack: 3,
                agility: 1,
                hull: 7,
                shields: 2,
                medium: true,
                actions: [
                    "Focus",
                    "Lock",
                    "Reload"
                ],
                actionsred: [
                    "Barrel Roll"
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0],
                    [ 3, 1, 2, 1, 3, 0],
                    [ 1, 2, 2, 2, 1, 0],
                    [ 1, 1, 2, 1, 1, 0],
                    [ 0, 0, 0, 0, 0, 3]
                ]
            },
            "Sheathipede-Class Shuttle": {
                name: "Sheathipede-Class Shuttle",
                xws: "Sheathipede-Class Shuttle".canonicalize(),
                factions: ["Rebel Alliance"],
                attack: 2,
                attackb: 2,
                agility: 2,
                hull: 4,
                shields: 1,
                actions: [
                    "Focus",
                    "Coordinate"
                ],
                actionsred: [
                ],
                maneuvers: [
                    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [ 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0],
                    [ 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                    [ 3, 1, 2, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0],
                    [ 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            },
            "TIE Reaper": {
                name: "TIE Reaper",
                xws: "TIE Reaper".canonicalize(),
                factions: ["Galactic Empire"],
                attack: 3,
                agility: 1,
                hull: 6,
                shields: 2,
                medium: true,
                actions: [
                    "Focus",
                    "Evade",
                    "Jam"
                ],
                actionsred: [
                    "Coordinate"
                ],
                maneuvers: [
                    [ 0, 0, 3, 0, 0, 0, 0, 0 ],
                    [ 3, 2, 2, 2, 3, 0, 3, 3 ],
                    [ 3, 1, 2, 1, 3, 0, 0, 0 ],
                    [ 0, 1, 2, 1, 0, 0, 0, 0 ]
                ]
            },
            "Escape Craft": {
                name: "Escape Craft",
                xws: "Escape Craft".canonicalize(),
                factions: ["Scum and Villainy"],
                attack: 2,
                agility: 2,
                hull: 2,
                shields: 2,
                actions: [
                    "Focus",
                    "Barrel Roll"
                ],
                actionsred: [
                    "Coordinate"
                ],
                maneuvers: [
                    [ 0, 0, 3, 0, 0, 0, 0, 0 ],
                    [ 0, 2, 2, 2, 0, 0, 0, 0 ],
                    [ 3, 1, 2, 1, 3, 0, 0, 0 ],
                    [ 0, 1, 1, 1, 0, 3, 0, 0 ]
                ]
            },
            "T-70 X-Wing": {
                name: "T-70 X-Wing",
                xws: "T-70 X-Wing".canonicalize(),
                factions: [ "Resistance"],
                attack: 3,
                agility: 2,
                hull: 4,
                shields: 3,
                actions: [
                    "Focus",
                    "Lock",
                    "Boost"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 0, 2, 2, 2, 0, 0, 0, 0, 0, 0],
                  [ 1, 2, 2, 2, 1, 0, 0, 0, 0, 0],
                  [ 1, 1, 2, 1, 1, 0, 0, 0, 3, 3],
                  [ 0, 0, 1, 0, 0, 3, 0, 0, 0, 0]
                ]
            },
            "RZ-2 A-Wing": {
                name: "RZ-2 A-Wing",
                xws: "RZ-2 A-Wing".canonicalize(),
                factions: ["Resistance"],
                attackt: 2,
                agility: 3,
                hull: 2,
                shields: 2,
                actions: [
                    "Focus",
                    "Evade",
                    "Lock",
                    "Barrel Roll",
                    "Boost"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 1, 0, 0, 0, 1, 0, 0, 0],
                  [ 2, 2, 2, 2, 2, 0, 0, 0],
                  [ 1, 2, 2, 2, 1, 0, 3, 3],
                  [ 0, 0, 2, 0, 0, 0, 0, 0],
                  [ 0, 0, 2, 0, 0, 3, 0, 0]
                ]
            },
            "TIE/FO Fighter": {
                name: "TIE/FO Fighter",
                xws: "TIE/FO Fighter".canonicalize(),
                factions: ["First Order"],
                attack: 2,
                agility: 3,
                hull: 3,
                shields: 1,
                actions: [
                    "Focus",
                    "Evade",
                    "Lock",
                    "Barrel Roll"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 1, 0, 0, 0, 1, 0, 0, 0],
                  [ 2, 2, 2, 2, 2, 0, 3, 3],
                  [ 1, 1, 2, 1, 1, 0, 0, 0],
                  [ 0, 0, 1, 0, 0, 3, 0, 0],
                  [ 0, 0, 1, 0, 0, 0, 0, 0]
                ]
            },
            "TIE Silencer": {
                name: "TIE Silencer",
                xws: "TIE Silencer".canonicalize(),
                factions: ["First Order"],
                attack: 3,
                agility: 3,
                hull: 4,
                shields: 2,
                actions: [
                    "Focus",
                    "Boost",
                    "Lock",
                    "Barrel Roll"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                  [ 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
                  [ 1, 1, 2, 1, 1, 0, 0, 0, 3, 3],
                  [ 0, 0, 2, 0, 0, 3, 0, 0, 0, 0],
                  [ 0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
                ]
            },
            "TIE/SF Fighter": {
                name: "TIE/SF Fighter",
                xws: "TIE/SF Fighter".canonicalize(),
                factions: ["First Order"],
                attack: 2,
                attackt: 2,
                agility: 2,
                hull: 3,
                shields: 3,
                actions: [
                    "Focus",
                    "> Rotate Arc",
                    "Evade",
                    "> Rotate Arc",
                    "Lock",
                    "> Rotate Arc",
                    "Barrel Roll",
                    "> Rotate Arc"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 3, 2, 2, 2, 3, 0, 0, 0, 0, 0],
                  [ 1, 2, 2, 2, 1, 0, 0, 0, 0, 0],
                  [ 1, 1, 2, 1, 1, 0, 3, 3, 0, 0],
                  [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                  [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
                ]
            },
            "Upsilon-Class Shuttle": {
                name: "Upsilon-Class Shuttle",
                xws: "Upsilon-Class Shuttle".canonicalize(),
                factions: ["First Order"],
                attack: 4,
                agility: 1,
                hull: 6,
                shields: 6,
                actions: [
                    "Focus",
                    "Lock",
                    "Reinforce",
                    "Coordinate",
                    "Jam"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
                  [ 3, 1, 2, 1, 3, 0, 0, 0, 0, 0],
                  [ 1, 2, 2, 2, 1, 0, 0, 0, 0, 0],
                  [ 3, 1, 1, 1, 3, 0, 0, 0, 0, 0],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                large: true
            },
            "MG-100 StarFortress": {
                name: "MG-100 StarFortress",
                xws: "MG-100 StarFortress".canonicalize(),
                factions: ["Resistance"],
                attack: 3,
                attackdt: 2,
                agility: 1,
                hull: 9,
                shields: 3,
                actions: [
                    "Focus",
                    "Lock",
                    "Rotate Arc",
                    "Reload"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
                  [ 3, 2, 2, 2, 3, 0, 0, 0, 0, 0],
                  [ 1, 1, 2, 1, 1, 0, 0, 0, 0, 0],
                  [ 0, 3, 1, 3, 0, 0, 0, 0, 0, 0],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                large: true
            },
            "Scavenged YT-1300": {
                name: "Scavenged YT-1300",
                canonical_name: 'Scavenged YT-1300'.canonicalize(),
                xws: "Scavenged YT-1300 Light Freighter".canonicalize(),
                factions: [ "Resistance" ],
                attackdt: 3,
                agility: 1,
                hull: 8,
                shields: 3,
                actions: [
                    "Focus",
                    "Lock"
                ],
                actionsred: [
                    "Boost",
                    "Rotate Arc"
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 0, 1, 2, 1, 0, 0, 0, 0],
                  [ 1, 2, 2, 2, 1, 0, 0, 0],
                  [ 1, 1, 1, 1, 1, 0, 3, 3],
                  [ 0, 0, 3, 0, 0, 0, 0, 0]
                ],
                large: true
            },
            "Mining Guild TIE Fighter": {
                name: "Mining Guild TIE Fighter",
                xws: "Modified TIE/LN Fighter".canonicalize(),
                factions: ["Scum and Villainy"],
                attack: 2,
                agility: 3,
                hull: 3,
                shields: 0,
                actions: [
                    "Focus",
                    "Barrel Roll",
                    "Evade"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0],
                  [ 1, 0, 0, 0, 1, 0],
                  [ 1, 2, 2, 2, 1, 0],
                  [ 1, 1, 2, 1, 1, 3],
                  [ 0, 0, 1, 0, 0, 0],
                  [ 0, 0, 3, 0, 0, 0]
                ]
            },
            "V-19 Torrent": {
                name: "V-19 Torrent",
                xws: "V-19 Torrent".canonicalize(),
                factions: ["Galactic Republic"],
                attack: 2,
                agility: 2,
                hull: 5,
                shields: 0,
                actions: [
                    "Focus",
                    "Evade",
                    "Lock",
                    "R> Evade"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 3, 2, 2, 2, 3, 0, 0, 0, 0, 0],
                  [ 1, 1, 2, 1, 1, 0, 0, 0, 3, 3],
                  [ 0, 1, 2, 1, 0, 3, 0, 0, 0, 0],
                  [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            },
            "Delta-7 Aethersprite": {
                name: "Delta-7 Aethersprite",
                xws: "Delta-7 Aethersprite".canonicalize(),
                factions: ["Galactic Republic"],
                attack: 2,
                agility: 3,
                hull: 3,
                shields: 1,
                actions: [
                    "Focus",
                    "F-Evade",
                    "Lock",
                    "Barrel Roll",
                    "Boost"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 1, 2, 0, 2, 1, 0, 0, 0, 0, 0],
                  [ 1, 2, 2, 2, 1, 0, 3, 3, 0, 0],
                  [ 0, 1, 2, 1, 0, 0, 0, 0, 0, 0],
                  [ 0, 0, 1, 0, 0, 3, 0, 0, 0, 0],
                  [ 0, 0, 1, 0, 0, 3, 0, 0, 0, 0]
                ]
            },
            "Sith Infiltrator": {
                name: "Sith Infiltrator",
                xws: "Sith Infiltrator".canonicalize(),
                factions: ["Separatist Alliance"],
                attack: 3,
                agility: 1,
                hull: 6,
                shields: 4,
                actions: [
                    "Focus",
                    "Lock"
                ],
                actionsred: [
                    "Barrel Roll"
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 3, 2, 2, 2, 3, 0, 0, 0, 0, 0],
                  [ 1, 2, 2, 2, 1, 0, 3, 3, 0, 0],
                  [ 1, 1, 2, 1, 1, 0, 0, 0, 0, 0],
                  [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                  [ 0, 0, 0, 0, 0, 3, 0, 0, 0, 0]
                ]
            },
            "Vulture-class Droid Fighter": {
                name: "Vulture-class Droid Fighter",
                xws: "Vulture-class Droid Fighter".canonicalize(),
                factions: ["Separatist Alliance"],
                attack: 2,
                agility: 2,
                hull: 3,
                shields: 0,
                actions: [
                    "Calculate",
                    "Lock",
                    "Barrel Roll",
                    "R> Calculate"
                ],
                actionsred: [
                ],
                maneuvers: [
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [ 1, 0, 0, 0, 1, 3, 0, 0, 0, 0],
                  [ 2, 1, 2, 1, 2, 0, 0, 0, 3, 3],
                  [ 1, 3, 2, 3, 1, 0, 0, 0, 0, 0],
                  [ 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
                  [ 0, 0, 1, 0, 0, 3, 0, 0, 0, 0]
                ]
            }
        },
        // name field is for convenience only
        pilotsById: [
            {
                name: "Cavern Angels Zealot",
                id: 0,
                faction: "Rebel Alliance",
                ship: "X-Wing",
                skill: 1,
                points: 41,
                slots: [
                    "Illicit",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Blue Squadron Escort",
                id: 1,
                faction: "Rebel Alliance",
                ship: "X-Wing",
                skill: 2,
                points: 41,
                slots: [
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Red Squadron Veteran",
                id: 2,
                faction: "Rebel Alliance",
                ship: "X-Wing",
                skill: 3,
                points: 43,
                slots: [
                    "Talent",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Jek Porkins",
                id: 3,
                unique: true,
                faction: "Rebel Alliance",
                ship: "X-Wing",
                skill: 4,
                points: 46,
                slots: [
                    "Talent",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Luke Skywalker",
                id: 4,
                unique: true,
                faction: "Rebel Alliance",
                ship: "X-Wing",
                skill: 5,
                force: 2,
                points: 62,
                slots: [
                    "Force",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Wedge Antilles",
                id: 5,
                unique: true,
                faction: "Rebel Alliance",
                ship: "X-Wing",
                skill: 6,
                points: 52,
                slots: [
                    "Talent",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Garven Dreis (X-Wing)",
                canonical_name: 'Garven Dreis'.canonicalize(),
                id: 6,
                unique: true,
                xws: "garvendreis-t65xwing",
                faction: "Rebel Alliance",
                ship: "X-Wing",
                skill: 4,
                points: 47,
                slots: [
                    "Talent",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Biggs Darklighter",
                id: 7,
                unique: true,
                faction: "Rebel Alliance",
                ship: "X-Wing",
                skill: 3,
                points: 48,
                slots: [
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Edrio Two-Tubes",
                id: 8,
                unique: true,
                faction: "Rebel Alliance",
                ship: "X-Wing",
                skill: 2,
                points: 45,
                slots: [
                    "Illicit",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Thane Kyrell",
                id: 9,
                unique: true,
                faction: "Rebel Alliance",
                ship: "X-Wing",
                skill: 5,
                points: 48,
                slots: [
                    "Talent",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Leevan Tenza",
                id: 10,
                unique: true,
                faction: "Rebel Alliance",
                ship: "X-Wing",
                skill: 3,
                points: 46,
                slots: [
                    "Illicit",
                    "Talent",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "whoops",
                id: 11,
                skip: true
            },
            {
                name: "Kullbee Sperado",
                id: 12,
                unique: true,
                faction: "Rebel Alliance",
                ship: "X-Wing",
                skill: 4,
                points: 48,
                slots: [
                    "Illicit",
                    "Talent",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Sabine Wren (TIE Fighter)",
                canonical_name: 'Sabine Wren'.canonicalize(),
                id: 13,
                unique: true,
                xws: "sabinewren-tielnfighter",
                faction: "Rebel Alliance",
                ship: "TIE Fighter",
                skill: 3,
                points: 28,
                slots: [
                    "Talent",
                    "Modification"
                ]
            },
            {
                name: "Ezra Bridger (TIE Fighter)",
                canonical_name: 'Ezra Bridger'.canonicalize(),
                id: 14,
                unique: true,
                xws: "ezrabridger-tielnfighter",
                faction: "Rebel Alliance",
                ship: "TIE Fighter",
                skill: 3,
                force: 1,
                points: 32,
                slots: [
                    "Force",
                    "Modification"
                ]
            },
            {
                name: '"Zeb" Orrelios (TIE Fighter)',
                canonical_name: '"Zeb" Orrelios'.canonicalize(),
                id: 15,
                unique: true,
                xws: "zeborrelios-tielnfighter",
                faction: "Rebel Alliance",
                ship: "TIE Fighter",
                skill: 2,
                points: 26,
                slots: [
                    "Modification"
                ]
            },
            {
                name: "Captain Rex",
                id: 16,
                unique: true,
                faction: "Rebel Alliance",
                ship: "TIE Fighter",
                skill: 2,
                points: 32,
                slots: [
                    "Modification"
                ],
                applies_condition: 'Suppressive Fire'.canonicalize()
            },
            {
                name: "Miranda Doni",
                id: 17,
                unique: true,
                faction: "Rebel Alliance",
                ship: "K-Wing",
                skill: 4,
                points: 48,
                slots: [
                    "Torpedo",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Crew",
                    "Device",
                    "Device",
                    "Modification"
                ]
            },
            {
                name: "Esege Tuketu",
                id: 18,
                unique: true,
                faction: "Rebel Alliance",
                ship: "K-Wing",
                skill: 3,
                points: 50,
                slots: [
                    "Torpedo",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Crew",
                    "Device",
                    "Device",
                    "Modification"
                ]
            },
            {
                name: "empty",
                id: 19,
                skip: true
            },
            {
                name: "Warden Squadron Pilot",
                id: 20,
                faction: "Rebel Alliance",
                ship: "K-Wing",
                skill: 2,
                points: 40,
                slots: [
                    "Torpedo",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Crew",
                    "Device",
                    "Device",
                    "Modification"
                ]
            },
            {
                name: "Corran Horn",
                id: 21,
                unique: true,
                faction: "Rebel Alliance",
                ship: "E-Wing",
                skill: 5,
                points: 74,
                slots: [
                    "Talent",
                    "Sensor",
                    "Torpedo",
                    "Astromech",
                    "Modification"
                ]
            },
            {
                name: "Gavin Darklighter",
                id: 22,
                unique: true,
                faction: "Rebel Alliance",
                ship: "E-Wing",
                skill: 4,
                points: 68,
                slots: [
                    "Talent",
                    "Sensor",
                    "Torpedo",
                    "Astromech",
                    "Modification"
                ]
            },
            {
                name: "Rogue Squadron Escort",
                id: 23,
                faction: "Rebel Alliance",
                ship: "E-Wing",
                skill: 4,
                points: 63,
                slots: [
                    "Talent",
                    "Sensor",
                    "Torpedo",
                    "Astromech",
                    "Modification"
                ]
            },
            {
                name: "Knave Squadron Escort",
                id: 24,
                faction: "Rebel Alliance",
                ship: "E-Wing",
                skill: 2,
                points: 61,
                slots: [
                    "Sensor",
                    "Torpedo",
                    "Astromech",
                    "Modification"
                ]
            },
            {
                name: "Norra Wexley (Y-Wing)",
                id: 25,
                unique: true,
                canonical_name: 'Norra Wexley'.canonicalize(),
                xws: "norrawexley-btla4ywing",
                faction: "Rebel Alliance",
                ship: "Y-Wing",
                skill: 5,
                points: 43,
                slots: [
                    "Talent",
                    "Turret",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Device",
                    "Gunner"
                ]
            },
            {
                name: "Horton Salm",
                id: 26,
                unique: true,
                faction: "Rebel Alliance",
                ship: "Y-Wing",
                skill: 4,
                points: 38,
                slots: [
                    "Talent",
                    "Turret",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Device",
                    "Gunner"
                ]
            },
            {
                name: '"Dutch" Vander',
                id: 27,
                unique: true,
                faction: "Rebel Alliance",
                ship: "Y-Wing",
                skill: 4,
                points: 42,
                slots: [
                    "Talent",
                    "Turret",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Device",
                    "Gunner"
                ]
            },
            {
                name: "Evaan Verlaine",
                id: 28,
                unique: true,
                faction: "Rebel Alliance",
                ship: "Y-Wing",
                skill: 3,
                points: 36,
                slots: [
                    "Talent",
                    "Turret",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Device",
                    "Gunner"
                ]
            },
            {
                name: "Gold Squadron Veteran",
                id: 29,
                faction: "Rebel Alliance",
                ship: "Y-Wing",
                skill: 3,
                points: 34,
                slots: [
                    "Talent",
                    "Turret",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Device",
                    "Gunner"
                ]
            },
            {
                name: "Gray Squadron Bomber",
                id: 30,
                faction: "Rebel Alliance",
                ship: "Y-Wing",
                skill: 2,
                points: 32,
                slots: [
                    "Turret",
                    "Torpedo",
                    "Astromech",
                    "Modification",
                    "Device",
                    "Gunner"
                ]
            },
            {
                name: "Bodhi Rook",
                id: 31,
                unique: true,
                faction: "Rebel Alliance",
                ship: "U-Wing",
                skill: 4,
                points: 49,
                slots: [
                    "Talent",
                    "Sensor",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Cassian Andor",
                id: 32,
                unique: true,
                faction: "Rebel Alliance",
                ship: "U-Wing",
                skill: 3,
                points: 47,
                slots: [
                    "Talent",
                    "Sensor",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Heff Tobber",
                id: 33,
                unique: true,
                faction: "Rebel Alliance",
                ship: "U-Wing",
                skill: 2,
                points: 45,
                slots: [
                    "Talent",
                    "Sensor",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Magva Yarro",
                id: 34,
                unique: true,
                faction: "Rebel Alliance",
                ship: "U-Wing",
                skill: 3,
                points: 50,
                slots: [
                    "Talent",
                    "Sensor",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Configuration",
                    "Illicit"
                ]
            },
            {
                name: "Saw Gerrera",
                id: 35,
                unique: true,
                faction: "Rebel Alliance",
                ship: "U-Wing",
                skill: 4,
                points: 52,
                slots: [
                    "Talent",
                    "Sensor",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Configuration",
                    "Illicit"
                ]
            },
            {
                name: "Benthic Two-Tubes",
                id: 36,
                unique: true,
                faction: "Rebel Alliance",
                ship: "U-Wing",
                skill: 2,
                points: 47,
                slots: [
                    "Illicit",
                    "Sensor",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Blue Squadron Scout",
                id: 37,
                faction: "Rebel Alliance",
                ship: "U-Wing",
                skill: 2,
                points: 43,
                slots: [
                    "Sensor",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Partisan Renegade",
                id: 38,
                faction: "Rebel Alliance",
                ship: "U-Wing",
                skill: 1,
                points: 43,
                slots: [
                    "Illicit",
                    "Sensor",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Configuration"
                ]
            },
            {
                name: "Dash Rendar",
                id: 39,
                unique: true,
                faction: "Rebel Alliance",
                ship: "YT-2400",
                skill: 5,
                points: 100,
                slots: [
                    "Talent",
                    "Missile",
                    "Gunner",
                    "Crew",
                    "Modification",
                    "Title",
                    "Illicit"
                ]
            },
            {
                name: '"Leebo"',
                id: 40,
                unique: true,
                faction: "Rebel Alliance",
                ship: "YT-2400",
                skill: 3,
                points: 98,
                slots: [
                    "Missile",
                    "Gunner",
                    "Crew",
                    "Modification",
                    "Title",
                    "Illicit"
                ],
                ship_override: {
                    actions: [
                        "Calculate",
                        "Lock",
                        "Rotate Arc"
                    ]
                }
            },
            {
                name: "Wild Space Fringer",
                id: 41,
                faction: "Rebel Alliance",
                ship: "YT-2400",
                skill: 1,
                points: 88,
                slots: [
                    "Missile",
                    "Gunner",
                    "Crew",
                    "Modification",
                    "Title",
                    "Illicit"
                ]
            },
            {
                name: "Han Solo",
                id: 42,
                unique: true,
                xws: "hansolo-modifiedyt1300lightfreighter",
                faction: "Rebel Alliance",
                ship: "YT-1300",
                skill: 6,
                points: 92,
                slots: [
                    "Talent",
                    "Missile",
                    "Gunner",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Title",
                    "Illicit"
                ]
            },
            {
                name: "Lando Calrissian",
                id: 43,
                unique: true,
                xws: "landocalrissian-modifiedyt1300lightfreighter",
                faction: "Rebel Alliance",
                ship: "YT-1300",
                skill: 5,
                points: 92,
                slots: [
                    "Talent",
                    "Missile",
                    "Gunner",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Title",
                    "Illicit"
                ]
            },
            {
                name: "Chewbacca",
                id: 44,
                unique: true,
                faction: "Rebel Alliance",
                ship: "YT-1300",
                skill: 4,
                charge: 1,
                recurring: true,
                points: 84,
                slots: [
                    "Talent",
                    "Missile",
                    "Gunner",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Title",
                    "Illicit"
                ]
            },
            {
                name: "Outer Rim Smuggler",
                id: 45,
                faction: "Rebel Alliance",
                ship: "YT-1300",
                skill: 1,
                points: 78,
                slots: [
                    "Missile",
                    "Gunner",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Title",
                    "Illicit"
                ]
            },
            {
                name: "Jan Ors",
                id: 46,
                unique: true,
                faction: "Rebel Alliance",
                ship: "HWK-290",
                skill: 5,
                points: 42,
                slots: [
                    "Talent",
                    "Device",
                    "Crew",
                    "Modification",
                    "Modification",
                    "Title"
                ]
            },
            {
                name: "Roark Garnet",
                id: 47,
                unique: true,
                faction: "Rebel Alliance",
                ship: "HWK-290",
                skill: 4,
                points: 38,
                slots: [
                    "Talent",
                    "Device",
                    "Crew",
                    "Modification",
                    "Modification",
                    "Title"
                ]
            },
            {
                name: "Kyle Katarn",
                id: 48,
                unique: true,
                faction: "Rebel Alliance",
                ship: "HWK-290",
                skill: 3,
                points: 38,
                slots: [
                    "Talent",
                    "Device",
                    "Crew",
                    "Modification",
                    "Modification",
                    "Title"
                ]
            },
            {
                name: "Rebel Scout",
                id: 49,
                faction: "Rebel Alliance",
                ship: "HWK-290",
                skill: 2,
                points: 32,
                slots: [
                    "Device",
                    "Crew",
                    "Modification",
                    "Modification",
                    "Title"
                ]
            },
            {
                name: "Jake Farrell",
                id: 50,
                unique: true,
                faction: "Rebel Alliance",
                ship: "A-Wing",
                skill: 4,
                points: 40,
                slots: [
                    "Talent",
                    "Missile"
                ]
            },
            {
                name: "Arvel Crynyd",
                id: 51,
                unique: true,
                faction: "Rebel Alliance",
                ship: "A-Wing",
                skill: 3,
                points: 36,
                slots: [
                    "Talent",
                    "Missile"
                ]
            },
            {
                name: "Green Squadron Pilot",
                id: 52,
                faction: "Rebel Alliance",
                ship: "A-Wing",
                skill: 3,
                points: 34,
                slots: [
                    "Talent",
                    "Missile"
                ]
            },
            {
                name: "Phoenix Squadron Pilot",
                id: 53,
                faction: "Rebel Alliance",
                ship: "A-Wing",
                skill: 1,
                points: 30,
                slots: [
                    "Missile"
                ]
            },
            {
                name: "Airen Cracken",
                id: 54,
                unique: true,
                faction: "Rebel Alliance",
                ship: "Z-95 Headhunter",
                skill: 5,
                points: 36,
                slots: [
                    "Talent",
                    "Missile",
                    "Modification"
                ]
            },
            {
                name: "Lieutenant Blount",
                id: 55,
                unique: true,
                faction: "Rebel Alliance",
                ship: "Z-95 Headhunter",
                skill: 4,
                points: 30,
                slots: [
                    "Talent",
                    "Missile",
                    "Modification"
                ]
            },
            {
                name: "Tala Squadron Pilot",
                id: 56,
                faction: "Rebel Alliance",
                ship: "Z-95 Headhunter",
                skill: 2,
                points: 25,
                slots: [
                    "Talent",
                    "Missile",
                    "Modification"
                ]
            },
            {
                name: "Bandit Squadron Pilot",
                id: 57,
                faction: "Rebel Alliance",
                ship: "Z-95 Headhunter",
                skill: 1,
                points: 23,
                slots: [
                    "Missile",
                    "Modification"
                ]
            },
            {
                name: "Wullffwarro",
                id: 58,
                unique: true,
                faction: "Rebel Alliance",
                ship: "Auzituck Gunship",
                skill: 4,
                points: 56,
                slots: [
                    "Talent",
                    "Crew",
                    "Crew",
                    "Modification"
                ]
            },
            {
                name: "Lowhhrick",
                id: 59,
                unique: true,
                faction: "Rebel Alliance",
                ship: "Auzituck Gunship",
                skill: 3,
                points: 52,
                slots: [
                    "Talent",
                    "Crew",
                    "Crew",
                    "Modification"
                ]
            },
            {
                name: "Kashyyyk Defender",
                id: 60,
                faction: "Rebel Alliance",
                ship: "Auzituck Gunship",
                skill: 1,
                points: 46,
                slots: [
                    "Crew",
                    "Crew",
                    "Modification"
                ]
            },
            {
                name: "Hera Syndulla (VCX-100)",
                id: 61,
                unique: true,
                canonical_name: 'Hera Syndulla'.canonicalize(),
                xws: "herasyndulla-vcx100lightfreighter",
                faction: "Rebel Alliance",
                ship: "VCX-100",
                skill: 5,
                points: 76,
                slots: [
                    "Talent",
                    "Torpedo",
                    "Turret",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Gunner",
                    "Title"
                ]
            },
            {
                name: "Kanan Jarrus",
                id: 62,
                unique: true,
                faction: "Rebel Alliance",
                ship: "VCX-100",
                skill: 3,
                force: 2,
                points: 90,
                slots: [
                    "Force",
                    "Torpedo",
                    "Turret",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Gunner",
                    "Title"
                ]
            },
            {
                name: '"Chopper"',
                id: 63,
                unique: true,
                faction: "Rebel Alliance",
                ship: "VCX-100",
                skill: 2,
                points: 72,
                slots: [
                    "Torpedo",
                    "Turret",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Gunner",
                    "Title"
                ],
                ship_override: {
                    actions: [
                        "Calculate",
                        "Lock",
                        "Reinforce"
                    ]
                }
            },
            {
                name: "Lothal Rebel",
                id: 64,
                faction: "Rebel Alliance",
                ship: "VCX-100",
                skill: 2,
                points: 70,
                slots: [
                    "Torpedo",
                    "Turret",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Gunner",
                    "Title"
                ]
            },
            {
                name: "Hera Syndulla",
                id: 65,
                unique: true,
                faction: "Rebel Alliance",
                ship: "Attack Shuttle",
                skill: 5,
                points: 39,
                slots: [
                    "Talent",
                    "Crew",
                    "Modification",
                    "Turret",
                    "Title"
                ]
            },
            {
                name: "Sabine Wren",
                canonical_name: 'Sabine Wren'.canonicalize(),
                id: 66,
                unique: true,
                faction: "Rebel Alliance",
                ship: "Attack Shuttle",
                skill: 3,
                points: 38,
                slots: [
                    "Talent",
                    "Crew",
                    "Modification",
                    "Turret",
                    "Title"
                ]
            },
            {
                name: "Ezra Bridger",
                id: 67,
                unique: true,
                faction: "Rebel Alliance",
                ship: "Attack Shuttle",
                skill: 3,
                force: 1,
                points: 41,
                slots: [
                    "Force",
                    "Crew",
                    "Modification",
                    "Turret",
                    "Title"
                ]
            },

            {
                name: '"Zeb" Orrelios',
                id: 68,
                unique: true,
                faction: "Rebel Alliance",
                ship: "Attack Shuttle",
                skill: 2,
                points: 34,
                slots: [
                    "Crew",
                    "Modification",
                    "Turret",
                    "Title"
                ]
            },
            {
                name: "Fenn Rau (Sheathipede)",
                id: 69,
                unique: true,
                xws: "fennrau-sheathipedeclassshuttle",
                faction: "Rebel Alliance",
                ship: "Sheathipede-Class Shuttle",
                skill: 6,
                points: 52,
                slots: [
                    "Talent",
                    "Crew",
                    "Modification",
                    "Astromech",
                    "Title"
                ]
            },
            {
                name: "Ezra Bridger (Sheathipede)",
                canonical_name: 'Ezra Bridger'.canonicalize(),
                id: 70,
                unique: true,
                xws: "ezrabridger-sheathipedeclassshuttle",
                faction: "Rebel Alliance",
                ship: "Sheathipede-Class Shuttle",
                skill: 3,
                force: 1,
                points: 42,
                slots: [
                    "Force",
                    "Crew",
                    "Modification",
                    "Astromech",
                    "Title"
                ]
            },
            {
                name: '"Zeb" Orrelios (Sheathipede)',
                canonical_name: '"Zeb" Orrelios'.canonicalize(),
                id: 71,
                unique: true,
                xws: "zeborrelios-sheathipedeclassshuttle",
                faction: "Rebel Alliance",
                ship: "Sheathipede-Class Shuttle",
                skill: 2,
                points: 32,
                slots: [
                    "Talent",
                    "Crew",
                    "Modification",
                    "Astromech",
                    "Title"
                ]
            },
            {
                name: "AP-5",
                id: 72,
                unique: true,
                faction: "Rebel Alliance",
                ship: "Sheathipede-Class Shuttle",
                skill: 1,
                points:30,
                slots: [
                    "Talent",
                    "Crew",
                    "Modification",
                    "Astromech",
                    "Title"
                ],
                ship_override: {
                    actions: [
                        "Calculate",
                        "Coordinate"
                    ]
                }
            },
            {
                 name: "Braylen Stramm",
                id: 73,
                unique: true,
                faction: "Rebel Alliance",
                ship: "B-Wing",
                skill: 4,
                points: 50,
                slots: [
                    "Talent",
                    "Sensor",
                    "Cannon",
                    "Cannon",
                    "Torpedo",
                    "Modification"
                ]
            },
            {
                name: "Ten Numb",
                id: 74,
                unique: true,
                faction: "Rebel Alliance",
                ship: "B-Wing",
                skill: 4,
                points: 50,
                slots: [
                    "Talent",
                    "Sensor",
                    "Cannon",
                    "Cannon",
                    "Torpedo",
                    "Modification"
                ]
            },
            {
                name: "Blade Squadron Veteran",
                id: 75,
                faction: "Rebel Alliance",
                ship: "B-Wing",
                skill: 3,
                points: 44,
                slots: [
                    "Talent",
                    "Sensor",
                    "Cannon",
                    "Cannon",
                    "Torpedo",
                    "Modification"
                ]
            },
            {
                name: "Blue Squadron Pilot",
                id: 76,
                faction: "Rebel Alliance",
                ship: "B-Wing",
                skill: 2,
                points: 42,
                slots: [
                    "Sensor",
                    "Cannon",
                    "Cannon",
                    "Torpedo",
                    "Modification"
                ]
            },
            {
                name: "Norra Wexley",
                id: 77,
                unique: true,
                faction: "Rebel Alliance",
                ship: "ARC-170",
                skill: 5,
                points: 55,
                slots: [
                    "Talent",
                    "Torpedo",
                    "Crew",
                    "Gunner",
                    "Astromech",
                    "Modification"
                ]
            },
            {
                name: "Shara Bey",
                id: 78,
                unique: true,
                faction: "Rebel Alliance",
                ship: "ARC-170",
                skill: 4,
                points: 53,
                slots: [
                    "Talent",
                    "Torpedo",
                    "Crew",
                    "Gunner",
                    "Astromech",
                    "Modification"
                ]
            },
            {
                name: "Garven Dreis",
                id: 79,
                unique: true,
                faction: "Rebel Alliance",
                ship: "ARC-170",
                skill: 4,
                points: 51,
                slots: [
                    "Talent",
                    "Torpedo",
                    "Crew",
                    "Gunner",
                    "Astromech",
                    "Modification"
                ]
            },
            {
                name: "Ibtisam",
                id: 80,
                unique: true,
                faction: "Rebel Alliance",
                ship: "ARC-170",
                skill: 3,
                points: 50,
                slots: [
                    "Talent",
                    "Torpedo",
                    "Crew",
                    "Gunner",
                    "Astromech",
                    "Modification"
                ]
            },
            {
                name: "IG-88A",
                id: 81,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Aggressor",
                skill: 4,
                points: 70,
                slots: [
                    "Talent",
                    "Sensor",
                    "Cannon",
                    "Cannon",
                    "Device",
                    "Illicit",
                    "Modification",
                    "Title"
                ]
            },
            {
                name: "IG-88B",
                id: 82,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Aggressor",
                skill: 4,
                points: 70,
                slots: [
                    "Talent",
                    "Sensor",
                    "Cannon",
                    "Cannon",
                    "Device",
                    "Illicit",
                    "Modification",
                    "Title"
                    ]
            },
            {
                name: "IG-88C",
                id: 83,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Aggressor",
                skill: 4,
                points: 70,
                slots: [
                    "Talent",
                    "Sensor",
                    "Cannon",
                    "Cannon",
                    "Device",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "IG-88D",
                id: 84,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Aggressor",
                skill: 4,
                points: 70,
                slots: [
                    "Talent",
                    "Sensor",
                    "Cannon",
                    "Cannon",
                    "Device",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Kavil",
                id: 85,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Y-Wing",
                skill: 5,
                points: 42,
                slots: [
                    "Talent",
                    "Turret",
                    "Torpedo",
                    "Gunner",
                    "Astromech",
                    "Device",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Drea Renthal",
                id: 86,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Y-Wing",
                skill: 4,
                points: 40,
                slots: [
                    "Talent",
                    "Turret",
                    "Torpedo",
                    "Gunner",
                    "Astromech",
                    "Device",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Hired Gun",
                id: 87,
                faction: "Scum and Villainy",
                ship: "Y-Wing",
                skill: 2,
                points: 34,
                slots: [
                    "Talent",
                    "Turret",
                    "Torpedo",
                    "Gunner",
                    "Astromech",
                    "Device",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Crymorah Goon",
                id: 88,
                faction: "Scum and Villainy",
                ship: "Y-Wing",
                skill: 1,
                points: 32,
                slots: [
                    "Turret",
                    "Torpedo",
                    "Gunner",
                    "Astromech",
                    "Device",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Han Solo (Scum)",
                id: 89,
                unique: true,
                xws: "hansolo",
                faction: "Scum and Villainy",
                ship: "Customized YT-1300",
                skill: 6,
                points: 54,
                slots: [
                    "Talent",
                    "Missile",
                    "Crew",
                    "Crew",
                    "Gunner",
                    "Illicit",
                    "Modification",
                    "Title"
                ]
            },
            {
                name: "Lando Calrissian (Scum)",
                id: 90,
                unique: true,
                xws: "landocalrissian",
                faction: "Scum and Villainy",
                ship: "Customized YT-1300",
                skill: 4,
                points: 49,
                slots: [
                    "Talent",
                    "Missile",
                    "Crew",
                    "Crew",
                    "Gunner",
                    "Illicit",
                    "Modification",
                    "Title"
                ]
            },
            {
                name: "L3-37",
                id: 91,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Customized YT-1300",
                skill: 2,
                points: 47,
                slots: [
                    "Missile",
                    "Crew",
                    "Crew",
                    "Gunner",
                    "Illicit",
                    "Modification",
                    "Title"
                ],
                ship_override: {
                    actions: [
                        "Calculate",
                        "Lock",
                        "Rotate Arc"
                    ]
                }
            },
            {
                name: "Freighter Captain",
                id: 92,
                faction: "Scum and Villainy",
                ship: "Customized YT-1300",
                skill: 1,
                points: 46,
                slots: [
                    "Missile",
                    "Crew",
                    "Crew",
                    "Gunner",
                    "Illicit",
                    "Modification",
                    "Title"
                ]
            },
            {
                name: "Lando Calrissian (Scum) (Escape Craft)",
                canonical_name: 'Lando Calrissian (Scum)'.canonicalize(),
                id: 93,
                unique: true,
                xws: "landocalrissian-escapecraft",
                faction: "Scum and Villainy",
                ship: "Escape Craft",
                skill: 4,
                points: 26,
                slots: [
                    "Talent",
                    "Crew",
                    "Modification"
                  ]
            },
            {
                name: "Outer Rim Pioneer",
                id: 94,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Escape Craft",
                skill: 3,
                points: 24,
                slots: [
                    "Talent",
                    "Crew",
                    "Modification"
                  ]
            },
            {
                name: "L3-37 (Escape Craft)",
                canonical_name: 'L3-37'.canonicalize(),
                id: 95,
                unique: true,
                xws: "l337-escapecraft",
                faction: "Scum and Villainy",
                ship: "Escape Craft",
                skill: 2,
                points: 22,
                slots: [
                    "Talent",
                    "Crew",
                    "Modification"
                  ],
                ship_override: {
                    actions: [
                        "Calculate",
                        "Barrel Roll"
                    ]
                }
            },
            {
                name: "Autopilot Drone",
                id: 96,
                unique: true,        
                faction: "Scum and Villainy",
                ship: "Escape Craft",
                skill: 1,
                charge: 3,
                points: 12,
                slots: [
                ],
                ship_override: {
                    actions: [
                        "Calculate",
                        "Barrel Roll"
                    ]
                }

            },
            {
                name: "Fenn Rau",
                id: 97,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Fang Fighter",
                skill: 6,
                points: 68,
                slots: [
                    "Talent",
                    "Torpedo"
                  ]
            },
            {
                name: "Old Teroch",
                id: 98,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Fang Fighter",
                skill: 5,
                points: 56,
                slots: [
                    "Talent",
                    "Torpedo"
                  ]
            },
            {
                name: "Kad Solus",
                id: 99,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Fang Fighter",
                skill: 4,
                points: 54,
                slots: [
                    "Talent",
                    "Torpedo"
                  ]
            },
            {
                name: "Joy Rekkoff",
                id: 100,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Fang Fighter",
                skill: 4,
                points: 52,
                slots: [
                    "Talent",
                    "Torpedo"
                  ]
            },
            {
                name: "Skull Squadron Pilot",
                id: 101,
                faction: "Scum and Villainy",
                ship: "Fang Fighter",
                skill: 4,
                points: 50,
                slots: [
                    "Talent",
                    "Torpedo"
                  ]
            },
            {
                name: "Zealous Recruit",
                id: 102,
                faction: "Scum and Villainy",
                ship: "Fang Fighter",
                skill: 1,
                points: 44,
                slots: [
                    "Torpedo"
                  ]
            },
            {
                name: "Boba Fett",
                id: 103,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Firespray-31",
                skill: 5,
                points: 80,
                slots: [
                    "Talent",
                    "Cannon",
                    "Missile",
                    "Crew",
                    "Device",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Emon Azzameen",
                id: 104,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Firespray-31",
                skill: 4,
                points: 76,
                slots: [
                    "Talent",
                    "Cannon",
                    "Missile",
                    "Crew",
                    "Device",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Kath Scarlet",
                id: 105,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Firespray-31",
                skill: 4,
                points: 74,
                slots: [
                    "Talent",
                    "Cannon",
                    "Missile",
                    "Crew",
                    "Device",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Koshka Frost",
                id: 106,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Firespray-31",
                skill: 3,
                points: 71,
                slots: [
                    "Talent",
                    "Cannon",
                    "Missile",
                    "Crew",
                    "Device",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Krassis Trelix",
                id: 107,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Firespray-31",
                skill: 3,
                points: 70,
                slots: [
                    "Talent",
                    "Cannon",
                    "Missile",
                    "Crew",
                    "Device",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Bounty Hunter",
                id: 108,
                faction: "Scum and Villainy",
                ship: "Firespray-31",
                skill: 2,
                points: 66,
                slots: [
                    "Cannon",
                    "Missile",
                    "Crew",
                    "Device",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "4-LOM",
                id: 109,
                unique: true,
                faction: "Scum and Villainy",
                ship: "G-1A Starfighter",
                skill: 3,
                points: 49,
                slots: [
                    "Talent",
                    "Sensor",
                    "Crew",
                    "Illicit",
                    "Modification",
                    "Title"
                  ],
                ship_override: {
                    actions: [
                        "Calculate",
                        "Lock",
                        "Jam"
                    ]
                }

            },
            {
                name: "Zuckuss",
                id: 110,
                unique: true,
                faction: "Scum and Villainy",
                ship: "G-1A Starfighter",
                skill: 3,
                points: 47,
                slots: [
                    "Talent",
                    "Sensor",
                    "Crew",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Gand Findsman",
                id: 111,
                faction: "Scum and Villainy",
                ship: "G-1A Starfighter",
                skill: 1,
                points: 43,
                slots: [
                    "Sensor",
                    "Crew",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Palob Godalhi",
                id: 112,
                unique: true,
                faction: "Scum and Villainy",
                ship: "HWK-290",
                skill: 3,
                points: 38,
                slots: [
                    "Talent",
                    "Crew",
                    "Device",
                    "Illicit",
                    "Modification",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Dace Bonearm",
                id: 113,
                unique: true,
                faction: "Scum and Villainy",
                ship: "HWK-290",
                skill: 4,
                charge: 3,
                recurring: true,
                points: 36,
                slots: [
                    "Talent",
                    "Crew",
                    "Device",
                    "Illicit",
                    "Modification",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Torkil Mux",
                id: 114,
                unique: true,
                faction: "Scum and Villainy",
                ship: "HWK-290",
                skill: 2,
                points: 36,
                slots: [
                    "Crew",
                    "Device",
                    "Illicit",
                    "Modification",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Dengar",
                id: 115,
                unique: true,
                faction: "Scum and Villainy",
                ship: "JumpMaster 5000",
                skill: 6,
                charge: 1,
                recurring: true,
                points: 64,
                slots: [
                    "Talent",
                    "Crew",
                    "Torpedo",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Tel Trevura",
                id: 116,
                unique: true,
                faction: "Scum and Villainy",
                ship: "JumpMaster 5000",
                skill: 4,
                charge: 1,        
                points: 60,
                slots: [
                    "Talent",
                    "Crew",
                    "Torpedo",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Manaroo",
                id: 117,
                unique: true,
                faction: "Scum and Villainy",
                ship: "JumpMaster 5000",
                skill: 3,
                points: 56,
                slots: [
                    "Talent",
                    "Crew",
                    "Torpedo",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Contracted Scout",
                id: 118,
                faction: "Scum and Villainy",
                ship: "JumpMaster 5000",
                skill: 2,
                points: 52,
                slots: [
                    "Torpedo",
                    "Crew",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Talonbane Cobra",
                id: 119,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Kihraxz Fighter",
                skill: 5,
                points: 50,
                slots: [
                    "Talent",
                    "Missile",
                    "Illicit",
                    "Modification",
                    "Modification",
                    "Modification"
                  ]
            },
            {
                name: "Graz",
                id: 120,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Kihraxz Fighter",
                skill: 4,
                points: 47,
                slots: [
                    "Talent",
                    "Missile",
                    "Illicit",
                    "Modification",
                    "Modification",
                    "Modification"
                  ]
            },
            {
                name: "Viktor Hel",
                id: 121,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Kihraxz Fighter",
                skill: 4,
                points: 45,
                slots: [
                    "Talent",
                    "Missile",
                    "Illicit",
                    "Modification",
                    "Modification",
                    "Modification"
                  ]
            },
            {
                name: "Captain Jostero",
                id: 122,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Kihraxz Fighter",
                skill: 3,
                points: 43,
                slots: [
                    "Missile",
                    "Illicit",
                    "Modification",
                    "Modification",
                    "Modification"
                  ]
            },
            {
                name: "Black Sun Ace",
                id: 123,
                faction: "Scum and Villainy",
                ship: "Kihraxz Fighter",
                skill: 3,
                points: 42,
                slots: [
                    "Talent",
                    "Missile",
                    "Illicit",
                    "Modification",
                    "Modification",
                    "Modification"
                  ]
            },
            {
                name: "Cartel Marauder",
                id: 124,
                faction: "Scum and Villainy",
                ship: "Kihraxz Fighter",
                skill: 2,
                points: 40,
                slots: [
                    "Missile",
                    "Illicit",
                    "Modification",
                    "Modification",
                    "Modification"
                  ]
            },
            {
                name: "Asajj Ventress",
                id: 125,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Lancer-Class Pursuit Craft",
                skill: 4,
                points: 84,
                force: 2,
                slots: [
                    "Force",
                    "Crew",
                    "Illicit",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Ketsu Onyo",
                id: 126,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Lancer-Class Pursuit Craft",
                skill: 5,
                points: 74,
                slots: [
                    "Talent",
                    "Crew",
                    "Illicit",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Sabine Wren (Scum)",
                id: 127,
                unique: true,
                xws: "sabinewren-lancerclasspursuitcraft",
                faction: "Scum and Villainy",
                ship: "Lancer-Class Pursuit Craft",
                skill: 3,
                points: 68,
                slots: [
                    "Talent",
                    "Crew",
                    "Illicit",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Shadowport Hunter",
                id: 128,
                faction: "Scum and Villainy",
                ship: "Lancer-Class Pursuit Craft",
                skill: 2,
                points: 64,
                slots: [
                    "Crew",
                    "Illicit",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Torani Kulda",
                id: 129,
                unique: true,
                faction: "Scum and Villainy",
                ship: "M12-L Kimogila Fighter",
                skill: 4,
                points: 50,
                slots: [
                    "Talent",
                    "Torpedo",
                    "Missile",
                    "Astromech",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Dalan Oberos",
                id: 130,
                unique: true,
                faction: "Scum and Villainy",
                ship: "M12-L Kimogila Fighter",
                skill: 3,
                charge: 2,
                points: 48,
                slots: [
                    "Talent",
                    "Torpedo",
                    "Missile",
                    "Astromech",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Cartel Executioner",
                id: 131,
                faction: "Scum and Villainy",
                ship: "M12-L Kimogila Fighter",
                skill: 3,
                points: 44,
                slots: [
                    "Talent",
                    "Torpedo",
                    "Missile",
                    "Astromech",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Serissu",
                id: 132,
                unique: true,
                faction: "Scum and Villainy",
                ship: "M3-A Interceptor",
                skill: 5,
                points: 43,
                slots: [
                    "Talent",
                    "Modification",
                    "Hardpoint"
                  ]
            },
            {
                name: "Genesis Red",
                id: 133,
                unique: true,
                faction: "Scum and Villainy",
                ship: "M3-A Interceptor",
                skill: 4,
                points: 35,
                slots: [
                    "Talent",
                    "Modification",
                    "Hardpoint"
                  ]
            },
            {
                name: "Laetin A'shera",
                id: 134,
                unique: true,
                faction: "Scum and Villainy",
                ship: "M3-A Interceptor",
                skill: 3,
                points: 35,
                slots: [
                    "Talent",
                    "Modification",
                    "Hardpoint"
                  ]
            },
            {
                name: "Quinn Jast",
                id: 135,
                unique: true,
                faction: "Scum and Villainy",
                ship: "M3-A Interceptor",
                skill: 3,
                points: 35,
                slots: [
                    "Talent",
                    "Modification",
                    "Hardpoint"
                  ]
            },
            {
                name: "Tansarii Point Veteran",
                id: 136,
                faction: "Scum and Villainy",
                ship: "M3-A Interceptor",
                skill: 3,
                points: 33,
                slots: [
                    "Talent",
                    "Modification",
                    "Hardpoint"
                  ]
            },
            {
                name: "Inaldra",
                id: 137,
                unique: true,
                faction: "Scum and Villainy",
                ship: "M3-A Interceptor",
                skill: 2,
                points: 32,
                slots: [
                    "Modification",
                    "Hardpoint"
                  ]
            },
            {
                name: "Sunny Bounder",
                id: 138,
                unique: true,
                faction: "Scum and Villainy",
                ship: "M3-A Interceptor",
                skill: 1,
                points: 31,
                slots: [
                    "Modification",
                    "Hardpoint"
                  ]
            },
            {
                name: "Cartel Spacer",
                id: 139,
                faction: "Scum and Villainy",
                ship: "M3-A Interceptor",
                skill: 1,
                points: 29,
                slots: [
                    "Modification",
                    "Hardpoint"
                  ]
            },
            {
                name: "Constable Zuvio",
                id: 140,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Quadjumper",
                skill: 4,
                points: 33,
                slots: [
                    "Talent",
                    "Tech",
                    "Crew",
                    "Device",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Sarco Plank",
                id: 141,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Quadjumper",
                skill: 2,
                points: 31,
                slots: [
                    "Tech",
                    "Crew",
                    "Device",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Unkar Plutt",
                id: 142,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Quadjumper",
                skill: 2,
                points: 30,
                slots: [
                    "Tech",
                    "Crew",
                    "Device",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Jakku Gunrunner",
                id: 143,
                faction: "Scum and Villainy",
                ship: "Quadjumper",
                skill: 1,
                points: 28,
                slots: [
                    "Tech",
                    "Crew",
                    "Device",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Captain Nym",
                id: 144,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Scurrg H-6 Bomber",
                skill: 5,
                charge: 1,
                recurring: true,
                points: 52,
                slots: [
                    "Talent",
                    "Turret",
                    "Crew",
                    "Device",
                    "Device",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Sol Sixxa",
                id: 145,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Scurrg H-6 Bomber",
                skill: 3,
                points: 49,
                slots: [
                    "Talent",
                    "Turret",
                    "Crew",
                    "Device",
                    "Device",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Lok Revenant",
                id: 146,
                faction: "Scum and Villainy",
                ship: "Scurrg H-6 Bomber",
                skill: 2,
                points: 46,
                slots: [
                    "Turret",
                    "Crew",
                    "Device",
                    "Device",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Guri",
                id: 147,
                unique: true,
                faction: "Scum and Villainy",
                ship: "StarViper",
                skill: 5,
                points: 62,
                slots: [
                    "Talent",
                    "Sensor",
                    "Torpedo",
                    "Modification",
                    "Title"
                  ],
                ship_override: {
                    actions: [
                        "Calculate",
                        "Lock",
                        "Barrel Roll",
                        "R> Calculate",
                        "Boost",
                        "R> Calculate"
                    ]
                }
            },
            {
                name: "Prince Xizor",
                id: 148,
                unique: true,
                faction: "Scum and Villainy",
                ship: "StarViper",
                skill: 4,
                points: 54,
                slots: [
                    "Talent",
                    "Sensor",
                    "Torpedo",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Dalan Oberos (StarViper)",
                id: 149,
                unique: true,
                xws: "dalanoberos-starviperclassattackplatform",
                faction: "Scum and Villainy",
                ship: "StarViper",
                skill: 4,
                points: 54,
                slots: [
                    "Talent",
                    "Sensor",
                    "Torpedo",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Black Sun Assassin",
                id: 150,
                faction: "Scum and Villainy",
                ship: "StarViper",
                skill: 3,
                points: 48,
                slots: [
                    "Talent",
                    "Sensor",
                    "Torpedo",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Black Sun Enforcer",
                id: 151,
                faction: "Scum and Villainy",
                ship: "StarViper",
                skill: 2,
                points: 46,
                slots: [
                    "Sensor",
                    "Torpedo",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Moralo Eval",
                id: 152,
                unique: true,
                faction: "Scum and Villainy",
                ship: "YV-666",
                skill: 4,
                charge: 2,
                points: 72,
                slots: [
                    "Talent",
                    "Cannon",
                    "Missile",
                    "Crew",
                    "Crew",
                    "Crew",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Bossk",
                id: 153,
                unique: true,
                faction: "Scum and Villainy",
                ship: "YV-666",
                skill: 4,
                points: 70,
        
                slots: [
                    "Talent",
                    "Cannon",
                    "Missile",
                    "Crew",
                    "Crew",
                    "Crew",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Latts Razzi",
                id: 154,
                unique: true,
                faction: "Scum and Villainy",
                ship: "YV-666",
                skill: 3,
                points: 66,
                slots: [
                    "Talent",
                    "Cannon",
                    "Missile",
                    "Crew",
                    "Crew",
                    "Crew",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Trandoshan Slaver",
                id: 155,
                faction: "Scum and Villainy",
                ship: "YV-666",
                skill: 2,
                points: 58,
                slots: [
                    "Cannon",
                    "Missile",
                    "Crew",
                    "Crew",
                    "Crew",
                    "Illicit",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "N'dru Suhlak",
                id: 156,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Z-95 Headhunter",
                skill: 4,
                points: 31,
                slots: [
                    "Talent",
                    "Missile",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Kaa'to Leeachos",
                id: 157,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Z-95 Headhunter",
                skill: 3,
                points: 29,
                slots: [
                    "Talent",
                    "Missile",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Black Sun Soldier",
                id: 158,
                faction: "Scum and Villainy",
                ship: "Z-95 Headhunter",
                skill: 3,
                points: 27,
                slots: [
                    "Talent",
                    "Missile",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Binayre Pirate",
                id: 159,
                faction: "Scum and Villainy",
                ship: "Z-95 Headhunter",
                skill: 1,
                points: 24,
                slots: [
                    "Missile",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Nashtah Pup",
                id: 160,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Z-95 Headhunter",
                skill: 1,
                points: 6,
                slots: [
                    "Missile",
                    "Illicit",
                    "Modification"
                  ]
            },
            {
                name: "Major Vynder",
                id: 161,
                unique: true,
                faction: "Galactic Empire",
                ship: "Alpha-Class Star Wing",
                skill: 4,
                points: 41,
                slots: [
                    "Talent",         
                    "Sensor",
                    "Torpedo",
                    "Missile",
                    "Modification",
                    "Configuration"
                  ]
            },
            {
                name: "Lieutenant Karsabi",
                id: 162,
                unique: true,
                faction: "Galactic Empire",
                ship: "Alpha-Class Star Wing",
                skill: 3,
                points: 39,
                slots: [
                    "Talent",         
                    "Sensor",
                    "Torpedo",
                    "Missile",
                    "Modification",
                    "Configuration"
                  ]
            },
            {
                name: "Rho Squadron Pilot",
                id: 163,
                faction: "Galactic Empire",
                ship: "Alpha-Class Star Wing",
                skill: 3,
                points: 37,
                slots: [
                    "Talent",         
                    "Sensor",
                    "Torpedo",
                    "Missile",
                    "Modification",
                    "Configuration"
                  ]
            },
            {
                name: "Nu Squadron Pilot",
                id: 164,
                faction: "Galactic Empire",
                ship: "Alpha-Class Star Wing",
                skill: 2,
                points: 35,
                slots: [      
                    "Sensor",
                    "Torpedo",
                    "Missile",
                    "Modification",
                    "Configuration"
                  ]
            },
            {
                name: "Captain Kagi",
                id: 165,
                unique: true,
                faction: "Galactic Empire",
                ship: "Lambda-Class Shuttle",
                skill: 4,
                points: 48,
                slots: [       
                    "Sensor",
                    "Cannon",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Lieutenant Sai",
                id: 166,
                unique: true,
                faction: "Galactic Empire",
                ship: "Lambda-Class Shuttle",
                skill: 3,
                points: 47,
                slots: [       
                    "Sensor",
                    "Cannon",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Colonel Jendon",
                id: 167,
                unique: true,
                faction: "Galactic Empire",
                ship: "Lambda-Class Shuttle",
                skill: 3,
                charge: 2,
                points: 46,
                slots: [       
                    "Sensor",
                    "Cannon",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Omicron Group Pilot",
                id: 168,
                faction: "Galactic Empire",
                ship: "Lambda-Class Shuttle",
                skill: 1,
                points: 43,
                slots: [       
                    "Sensor",
                    "Cannon",
                    "Crew",
                    "Crew",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Grand Inquisitor",
                id: 169,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Advanced Prototype",
                skill: 5,
                points: 58,
                force: 2,
                slots: [       
                    "Force",
                    "Sensor",
                    "Missile"
                  ]
            },
            {
                name: "Seventh Sister",
                id: 170,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Advanced Prototype",
                skill: 4,
                points: 48,
                force: 2,
                slots: [       
                    "Force",
                    "Sensor",
                    "Missile"
                  ]
            },
            {
                name: "Inquisitor",
                id: 171,
                faction: "Galactic Empire",
                ship: "TIE Advanced Prototype",
                skill: 3,
                points: 40,
                force: 1,
                slots: [       
                    "Force",
                    "Sensor",
                    "Missile"
                  ]
            },
            {
                name: "Baron of the Empire",
                id: 172,
                faction: "Galactic Empire",
                ship: "TIE Advanced Prototype",
                skill: 3,
                points: 34,
                slots: [       
                    "Talent",
                    "Sensor",
                    "Missile"
                  ]
            },
            {
                name: "Darth Vader",
                id: 173,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Advanced",
                skill: 6,
                points: 70,
                force: 3,
                slots: [       
                    "Force",
                    "Sensor",
                    "Missile",
                    "Modification"
                  ]
            },
            {
                name: "Maarek Stele",
                id: 174,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Advanced",
                skill: 5,
                points: 50,
                slots: [       
                    "Talent",
                    "Sensor",
                    "Missile",
                    "Modification"
                  ]
            },
            {
                name: "Ved Foslo",
                id: 175,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Advanced",
                skill: 4,
                points: 47,
                slots: [       
                    "Talent",
                    "Sensor",
                    "Missile",
                    "Modification"
                  ]
            },
            {
                name: "Zertik Strom",
                id: 176,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Advanced",
                skill: 3,
                points: 45,
                slots: [       
                    "Sensor",
                    "Missile",
                    "Modification"
                  ]
            },
            {
                name: "Storm Squadron Ace",
                id: 177,
                faction: "Galactic Empire",
                ship: "TIE Advanced",
                skill: 3,
                points: 43,
                slots: [       
                    "Talent",
                    "Sensor",
                    "Missile",
                    "Modification"
                  ]
            },
            {
                name: "Tempest Squadron Pilot",
                id: 178,
                faction: "Galactic Empire",
                ship: "TIE Advanced",
                skill: 2,
                points: 41,
                slots: [  
                    "Sensor",
                    "Missile",
                    "Modification"
                  ]
            },
            {
                name: "Soontir Fel",
                id: 179,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Interceptor",
                skill: 6,
                points: 52,
                slots: [       
                    "Talent",
                    "Modification",
                    "Modification"
                  ]
            },
            {
                name: "Turr Phennir",
                id: 180,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Interceptor",
                skill: 4,
                points: 44,
                slots: [       
                    "Talent",
                    "Modification",
                    "Modification"
                  ]
            },
            {
                name: "Saber Squadron Ace",
                id: 181,
                faction: "Galactic Empire",
                ship: "TIE Interceptor",
                skill: 4,
                points: 40,
                slots: [       
                    "Talent",
                    "Modification",
                    "Modification"
                  ]
            },
            {
                name: "Alpha Squadron Pilot",
                id: 182,
                faction: "Galactic Empire",
                ship: "TIE Interceptor",
                skill: 1,
                points: 34,
                slots: [       
                    "Modification",
                    "Modification"
                  ]
            },
            {
                name: "Major Vermeil",
                id: 183,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Reaper",
                skill: 4,
                points: 49,
                slots: [       
                    "Talent",
                    "Crew",
                    "Crew",
                    "Modification"
                  ]
            },
            {
                name: "Captain Feroph",
                id: 184,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Reaper",
                skill: 3,
                points: 47,
                slots: [       
                    "Talent",
                    "Crew",
                    "Crew",
                    "Modification"
                  ]
            },
            {
                name: '"Vizier"',
                id: 185,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Reaper",
                skill: 2,
                points: 45,
                slots: [
                    "Crew",
                    "Crew",
                    "Modification"
                  ]
            },
            {
                name: "Scarif Base Pilot",
                id: 186,
                faction: "Galactic Empire",
                ship: "TIE Reaper",
                skill: 1,
                points: 41,
                slots: [       
                    "Crew",
                    "Crew",
                    "Modification"
                  ]
            },
            {
                name: "Lieutenant Kestal",
                id: 187,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Aggressor",
                skill: 4,
                points: 36,
                slots: [       
                    "Talent",
                    "Turret",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Modification"
                  ]
            },
            {
                name: '"Double Edge"',
                id: 188,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Aggressor",
                skill: 2,
                points: 33,
                slots: [       
                    "Talent",
                    "Turret",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Modification"
                  ]
            },
            {
                name: "Onyx Squadron Scout",
                id: 189,
                faction: "Galactic Empire",
                ship: "TIE Aggressor",
                skill: 3,
                points: 32,
                slots: [       
                    "Talent",
                    "Turret",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Modification"
                  ]
            },
            {
                name: "Sienar Specialist",
                id: 190,
                faction: "Galactic Empire",
                ship: "TIE Aggressor",
                skill: 2,
                points: 30,
                slots: [       
                    "Turret",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Modification"
                  ]
            },
            {
                name: '"Redline"',
                id: 191,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Punisher",
                skill: 5,
                points: 44,
                slots: [       
                    "Sensor",
                    "Torpedo",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                  ]
            },
            {
                name: '"Deathrain"',
                id: 192,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Punisher",
                skill: 4,
                points: 42,
                slots: [       
                    "Sensor",
                    "Torpedo",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                  ]
            },
            {
                name: "Cutlass Squadron Pilot",
                id: 193,
                faction: "Galactic Empire",
                ship: "TIE Punisher",
                skill: 2,
                points: 36,
                slots: [       
                    "Sensor",
                    "Torpedo",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                  ]
            },
            {
                name: "Colonel Vessery",
                id: 194,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Defender",
                skill: 4,
                points: 88,
                slots: [       
                    "Talent",
                    "Sensor",
                    "Cannon",
                    "Missile"
                  ]
            },
            {
                name: "Countess Ryad",
                id: 195,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Defender",
                skill: 4,
                points: 86,
                slots: [       
                    "Talent",
                    "Sensor",
                    "Cannon",
                    "Missile"
                  ]
            },
            {
                name: "Rexler Brath",
                id: 196,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Defender",
                skill: 5,
                points: 84,
                slots: [       
                    "Talent",
                    "Sensor",
                    "Cannon",
                    "Missile"
                  ]
            },
            {
                name: "Onyx Squadron Ace",
                id: 197,
                faction: "Galactic Empire",
                ship: "TIE Defender",
                skill: 4,
                points: 78,
                slots: [       
                    "Talent",
                    "Sensor",
                    "Cannon",
                    "Missile"
                  ]
            },
            {
                name: "Delta Squadron Pilot",
                id: 198,
                faction: "Galactic Empire",
                ship: "TIE Defender",
                skill: 1,
                points: 72,
                slots: [       
                    "Sensor",
                    "Cannon",
                    "Missile"
                  ]
            },
            {
                name: '"Whisper"',
                id: 199,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Phantom",
                skill: 5,
                points: 52,
                slots: [       
                    "Talent",
                    "Sensor",
                    "Crew",
                    "Modification"
                  ]
            },
            {
                name: '"Echo"',
                id: 200,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Phantom",
                skill: 4,
                points: 50,
                slots: [       
                    "Talent",
                    "Sensor",
                    "Crew",
                    "Modification"
                  ]
            },
            {
                name: "Sigma Squadron Ace",
                id: 201,
                faction: "Galactic Empire",
                ship: "TIE Phantom",
                skill: 4,
                points: 46,
                slots: [       
                    "Talent",
                    "Sensor",
                    "Crew",
                    "Modification"
                  ]
            },
            {
                name: "Imdaar Test Pilot",
                id: 202,
                faction: "Galactic Empire",
                ship: "TIE Phantom",
                skill: 3,
                points: 44,
                slots: [       
                    "Sensor",
                    "Crew",
                    "Modification"
                  ]
            },
            {
                name: "Captain Jonus",
                id: 203,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Bomber",
                skill: 4,
                points: 36,
                slots: [       
                    "Talent",
                    "Torpedo",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                  ]
            },
            {
                name: "Major Rhymer",
                id: 204,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Bomber",
                skill: 4,
                points: 34,
                slots: [       
                    "Talent",
                    "Torpedo",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                  ]
            },
            {
                name: "Tomax Bren",
                id: 205,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Bomber",
                skill: 5,
                points: 34,
                slots: [       
                    "Talent",
                    "Torpedo",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                  ]
            },
            {
                name: '"Deathfire"',
                id: 206,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Bomber",
                skill: 2,
                points: 32,
                slots: [       
                    "Torpedo",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                  ]
            },
            {
                name: "Gamma Squadron Ace",
                id: 207,
                faction: "Galactic Empire",
                ship: "TIE Bomber",
                skill: 3,
                points: 30,
                slots: [       
                    "Talent",
                    "Torpedo",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                  ]
            },
            {
                name: "Scimitar Squadron Pilot",
                id: 208,
                faction: "Galactic Empire",
                ship: "TIE Bomber",
                skill: 2,
                points: 28,
                slots: [       
                    "Torpedo",
                    "Missile",
                    "Missile",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                  ]
            },
            {
                name: '"Countdown"',
                id: 209,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Striker",
                skill: 4,
                points: 44,
                slots: [       
                    "Talent",
                    "Gunner",
                    "Device",
                    "Modification"
                  ]
            },
            {
                name: '"Pure Sabacc"',
                id: 210,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Striker",
                skill: 4,
                points: 44,
                slots: [       
                    "Talent",
                    "Gunner",
                    "Device",
                    "Modification"
                  ]
            },
            {
                name: '"Duchess"',
                id: 211,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Striker",
                skill: 5,
                points: 42,
                slots: [       
                    "Talent",
                    "Gunner",
                    "Device",
                    "Modification"
                  ]
            },
            {
                name: "Black Squadron Scout",
                id: 212,
                faction: "Galactic Empire",
                ship: "TIE Striker",
                skill: 3,
                points: 38,
                slots: [       
                    "Talent",
                    "Gunner",
                    "Device",
                    "Modification"
                  ]
            },
            {
                name: "Planetary Sentinel",
                id: 213,
                faction: "Galactic Empire",
                ship: "TIE Striker",
                skill: 1,
                points: 34,
                slots: [    
                    "Gunner",
                    "Device",
                    "Modification"
                  ]
            },
            {
                name: "Rear Admiral Chiraneau",
                id: 214,
                unique: true,
                faction: "Galactic Empire",
                ship: "VT-49 Decimator",
                skill: 5,
                points: 88,
                slots: [       
                    "Talent",
                    "Torpedo",
                    "Crew",
                    "Crew",
                    "Gunner",
                    "Device",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Captain Oicunn",
                id: 215,
                unique: true,
                faction: "Galactic Empire",
                ship: "VT-49 Decimator",
                skill: 3,
                points: 84,
                slots: [       
                    "Talent",
                    "Torpedo",
                    "Crew",
                    "Crew",
                    "Gunner",
                    "Device",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: "Patrol Leader",
                id: 216,
                faction: "Galactic Empire",
                ship: "VT-49 Decimator",
                skill: 2,
                points: 80,
                slots: [    
                    "Torpedo",
                    "Crew",
                    "Crew",
                    "Gunner",
                    "Device",
                    "Modification",
                    "Title"
                  ]
            },
            {
                name: '"Howlrunner"',
                id: 217,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Fighter",
                skill: 5,
                points: 40,
                slots: [       
                    "Talent",
                    "Modification"
                  ]
            },
            {
                name: "Iden Versio",
                id: 218,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Fighter",
                skill: 4,
                charge: 1,
                points: 40,
                slots: [       
                    "Talent",
                    "Modification"
                  ]
            },
            {
                name: '"Mauler" Mithel',
                id: 219,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Fighter",
                skill: 5,
                points: 32,
                slots: [       
                    "Talent",
                    "Modification"
                  ]
            },
            {
                name: '"Scourge" Skutu',
                id: 220,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Fighter",
                skill: 5,
                points: 32,
                slots: [       
                    "Talent",
                    "Modification"
                  ]
            },
            {
                name: '"Wampa"',
                id: 221,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Fighter",
                skill: 1,
                recurring: true,
                charge: 1,
                points: 30,
                slots: [       
                    "Modification"
                  ]
            },
            {
                name: "Del Meeko",
                id: 222,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Fighter",
                skill: 4,
                points: 30,
                slots: [       
                    "Talent",
                    "Modification"
                  ]
            },
            {
                name: "Gideon Hask",
                id: 223,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Fighter",
                skill: 4,
                points: 30,
                slots: [       
                    "Talent",
                    "Modification"
                  ]
            },
            {
                name: "Seyn Marana",
                id: 224,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Fighter",
                skill: 4,
                points: 30,
                slots: [       
                    "Talent",
                    "Modification"
                  ]
            },
            {
                name: "Valen Rudor",
                id: 225,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Fighter",
                skill: 3,
                points: 28,
                slots: [       
                    "Talent",
                    "Modification"
                  ]
            },
            {
                name: '"Night Beast"',
                id: 226,
                unique: true,
                faction: "Galactic Empire",
                ship: "TIE Fighter",
                skill: 2,
                points: 26,
                slots: [       
                    "Modification"
                  ]
            },
            {
                name: "Black Squadron Ace",
                id: 227,
                faction: "Galactic Empire",
                ship: "TIE Fighter",
                skill: 3,
                points: 26,
                slots: [       
                    "Talent",
                    "Modification"
                  ]
            },
            {
                name: "Obsidian Squadron Pilot",
                id: 228,
                faction: "Galactic Empire",
                ship: "TIE Fighter",
                skill: 2,
                points: 24,
                slots: [       
                    "Modification"
                  ]
            },
            {
                name: "Academy Pilot",
                id: 229,
                faction: "Galactic Empire",
                ship: "TIE Fighter",
                skill: 1,
                points: 23,
                slots: [       
                    "Modification"
                  ]
            },
            {
                name: "Spice Runner",
                id: 230,
                faction: "Scum and Villainy",
                ship: "HWK-290",
                skill: 1,
                points: 32,
                slots: [
                    "Crew",
                    "Device",
                    "Illicit",
                    "Modification",
                    "Modification",
                    "Title"
                ]
            },
            {
                name: "Poe Dameron",
                id: 231,
                unique: true,
                faction: "Resistance",
                ship: "T-70 X-Wing",
                skill: 6,
                points: 68,
                charge: 1,
                recurring: true, 
                slots: [
                    "Talent",
                    "Astromech",
                    "Modification",
                    "Configuration",
                    "Tech",
                    "Title",
                    "Hardpoint"
                ]
            },
            {
                name: "Lieutenant Bastian",
                id: 232,
                unique: true,
                faction: "Resistance",
                ship: "T-70 X-Wing",
                skill: 2,
                points: 1,
                slots: [
                    "Astromech",
                    "Modification",
                    "Configuration",
                    "Tech",
                    "Hardpoint"
                ]
            },
            {
                name: '"Midnight"',
                id: 233,
                unique: true,
                faction: "First Order",
                ship: "TIE/FO Fighter",
                skill: 6,
                points: 44,
                slots: [
                    "Talent",
                    "Tech",
                    "Modification"
                ]
            },
            {
                name: '"Longshot"',
                id: 234,
                unique: true,
                faction: "First Order",
                ship: "TIE/FO Fighter",
                skill: 3,
                points: 33,
                slots: [
                    "Talent",
                    "Tech",
                    "Modification"
                ]
            },
            {
                name: '"Muse"',
                id: 235,
                unique: true,
                faction: "First Order",
                ship: "TIE/FO Fighter",
                skill: 2,
                points: 32,
                slots: [
                    "Talent",
                    "Tech",
                    "Modification"
                ]
            },
            {
                name: "Kylo Ren",
                id: 236,
                unique: true,
                faction: "First Order",
                ship: "TIE Silencer",
                skill: 5,
                force: 2,
                points: 82,
                applies_condition: 'I\'ll Show You the Dark Side'.canonicalize(),
                slots: [
                    "Force",
                    "Tech",
                    "Torpedo",
                    "Missile",
                    "Modification"
                ]
            },
            {
                name: '"Blackout"',
                id: 237,
                unique: true,
                faction: "First Order",
                ship: "TIE Silencer",
                skill: 5,
                points: 70,
                slots: [
                    "Talent",
                    "Tech",
                    "Torpedo",
                    "Missile",
                    "Modification"
                ]
            },
            {
                name: "Lieutenant Dormitz",
                id: 238,
                unique: true,
                faction: "First Order",
                ship: "Upsilon-Class Shuttle",
                skill: 2,
                points: 60,
                slots: [
                    "Tech",
                    "Tech",
                    "Crew",
                    "Crew",
                    "Crew",
                    "Cannon",
                    "Sensor",
                    "Modification"
                ]
            },
            {
                name: "L'ulo L'ampar",
                id: 239,
                unique: true,
                faction: "Resistance",
                ship: "RZ-2 A-Wing",
                skill: 5,
                points: 38,
                slots: [
                    "Talent",
                    "Talent",
                    "Missile",
                    "Tech"
                ]
            },
            {
                name: "Tallissan Lintra",
                id: 240,
                unique: true,
                faction: "Resistance",
                ship: "RZ-2 A-Wing",
                skill: 5,
                charge: 1,
                recurring: true,
                points: 35,
                slots: [
                    "Talent",
                    "Talent",
                    "Missile",
                    "Tech"
                ]
            },
            {
                name: "blanks",
                id: 241,
                skip: true
            },
            {
                name: '"Backdraft"',
                id: 242,
                unique: true,
                faction: "First Order",
                ship: "TIE/SF Fighter",
                skill: 4,
                points: 41,
                slots: [
                    "Talent",
                    "Tech",
                    "Missile",
                    "Gunner",
                    "Sensor",
                    "Modification"
                ]
            },
            {
                name: '"Quickdraw"',
                id: 243,
                unique: true,
                faction: "First Order",
                ship: "TIE/SF Fighter",
                skill: 6,
                charge: 1,
                recurring: true, 
                points: 45,
                slots: [
                    "Talent",
                    "Tech",
                    "Missile",
                    "Gunner",
                    "Sensor",
                    "Modification"
                ]
            },
            {
                name: "Rey",
                id: 244,
                unique: true,
                faction: "Resistance",
                ship: "Scavenged YT-1300",
                skill: 5,
                points: 80,
                force: 2,
                slots: [
                    "Force",
                    "Crew",
                    "Crew",
                    "Gunner",
                    "Illicit",
                    "Modification",
                    "Title"
                ]
            },
            {
                name: "Han Solo (Resistance)",
                id: 245,
                unique: true,
                faction: "Resistance",
                ship: "Scavenged YT-1300",
                skill: 6,
                points: 76,
                slots: [
                    "Talent",
                    "Crew",
                    "Crew",
                    "Gunner",
                    "Illicit",
                    "Modification",
                    "Title"
                ]
            },
            {
                name: "Chewbacca (Resistance)",
                id: 246,
                unique: true,
                faction: "Resistance",
                ship: "Scavenged YT-1300",
                skill: 4,
                points: 72,
                slots: [
                    "Talent",
                    "Crew",
                    "Crew",
                    "Gunner",
                    "Illicit",
                    "Modification",
                    "Title"
                ]
            },
            {
                name: "Captain Seevor",
                id: 247,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Mining Guild TIE Fighter",
                skill: 3,
                charge: 1,
                recurring: true,
                points: 28,
                slots: [
                    "Talent",
                    "Modification"
                ]
            },
            {
                name: "Mining Guild Surveyor",
                id: 248,
                faction: "Scum and Villainy",
                ship: "Mining Guild TIE Fighter",
                skill: 2,
                points: 25,
                slots: [
                    "Talent",
                    "Modification"
                ]
            },
            {
                name: "Ahhav",
                id: 249,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Mining Guild TIE Fighter",
                skill: 3,
                points: 30,
                slots: [
                    "Talent",
                    "Modification"
                ]
            },
            {
                name: "Finch Dallow",
                id: 250,
                unique: true,
                faction: "Resistance",
                ship: "MG-100 StarFortress",
                skill: 4,
                points: 70,
                slots: [
                    "Sensor",
                    "Tech",
                    "Crew",
                    "Gunner",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                ]
            },
            {
                name: "Major Stridan",
                id: 251,
                unique: true,
                faction: "First Order",
                ship: "Upsilon-Class Shuttle",
                skill: 4,
                points: 63,
                slots: [
                    "Tech",
                    "Tech",
                    "Crew",
                    "Crew",
                    "Crew",
                    "Cannon",
                    "Sensor",
                    "Modification"
                ]
            },
            {
                name: "Kare Kun",
                id: 252,
                unique: true,
                faction: "Resistance",
                ship: "T-70 X-Wing",
                skill: 4,
                points: 53,
                slots: [
                    "Talent",
                    "Astromech",
                    "Modification",
                    "Configuration",
                    "Tech",
                    "Title",
                    "Hardpoint"
                ]
            },
            {
                name: "Joph Seastriker",
                id: 253,
                unique: true,
                faction: "Resistance",
                ship: "T-70 X-Wing",
                skill: 3,
                points: 52,
                slots: [
                    "Talent",
                    "Astromech",
                    "Modification",
                    "Configuration",
                    "Tech",
                    "Title",
                    "Hardpoint"
                ]
            },
            {
                name: "Lieutenant Bastian",
                id: 254,
                unique: true,
                faction: "Resistance",
                ship: "T-70 X-Wing",
                skill: 2,
                points: 48,
                slots: [
                    "Astromech",
                    "Modification",
                    "Configuration",
                    "Tech",
                    "Title",
                    "Hardpoint"
                ]
            },
            {
                name: "Jaycris Tubbs",
                id: 255,
                unique: true,
                faction: "Resistance",
                ship: "T-70 X-Wing",
                skill: 1,
                points: 50,
                slots: [
                    "Astromech",
                    "Modification",
                    "Configuration",
                    "Tech",
                    "Title",
                    "Hardpoint"
                ]
            },
            {
                name: "Black Squadron Ace (T-70)",
                id: 256,
                faction: "Resistance",
                ship: "T-70 X-Wing",
                skill: 4,
                points: 50,
                slots: [
                    "Talent",
                    "Astromech",
                    "Modification",
                    "Configuration",
                    "Tech",
                    "Title",
                    "Hardpoint"
                ]
            },
            {
                name: "Red Squadron Expert",
                id: 257,
                faction: "Resistance",
                ship: "T-70 X-Wing",
                skill: 3,
                points: 48,
                slots: [
                    "Talent",
                    "Astromech",
                    "Modification",
                    "Configuration",
                    "Tech",
                    "Title",
                    "Hardpoint"
                ]
            },
            {
                name: "Blue Squadron Rookie",
                id: 258,
                faction: "Resistance",
                ship: "T-70 X-Wing",
                skill: 1,
                points: 46,
                slots: [
                    "Astromech",
                    "Modification",
                    "Configuration",
                    "Tech",
                    "Title",
                    "Hardpoint"
                ]
            },
            {
                name: "Zeta Squadron Survivor",
                id: 259,
                faction: "First Order",
                ship: "TIE/SF Fighter",
                skill: 2,
                points: 34,
                slots: [
                    "Tech",
                    "Gunner",
                    "Missile",
                    "Sensor",
                    "Modification"
                ]
            },
            {
                name: "Cobalt Squadron Bomber",
                id: 260,
                faction: "Resistance",
                ship: "MG-100 StarFortress",
                skill: 1,
                points: 63,
                slots: [
                    "Sensor",
                    "Tech",
                    "Crew",
                    "Gunner",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                ]
            },
            {
                name: "TN-3465",
                id: 261,
                unique: true,
                faction: "First Order",
                ship: "TIE/FO Fighter",
                skill: 2,
                points: 31,
                slots: [
                    "Tech",
                    "Modification"
                ]
            },
            {
                name: '"Scorch"',
                id: 262,
                unique: true,
                faction: "First Order",
                ship: "TIE/FO Fighter",
                skill: 4,
                points: 35,
                slots: [
                    "Talent",
                    "Tech",
                    "Modification"
                ]
            },
            {
                name: '"Longshot"',
                id: 263,
                unique: true,
                faction: "First Order",
                ship: "TIE/FO Fighter",
                skill: 3,
                points: 33,
                slots: [
                    "Talent",
                    "Tech",
                    "Modification"
                ]
            },
            {
                name: '"Static"',
                id: 264,
                unique: true,
                faction: "First Order",
                ship: "TIE/FO Fighter",
                skill: 4,
                points: 35,
                slots: [
                    "Talent",
                    "Tech",
                    "Modification"
                ]
            },
            {
                name: "Lieutenant Rivas",
                id: 265,
                unique: true,
                faction: "First Order",
                ship: "TIE/FO Fighter",
                skill: 1,
                points: 30,
                slots: [
                    "Tech",
                    "Modification"
                ]
            },
            {
                name: "Commander Malarus",
                id: 266,
                unique: true,
                faction: "First Order",
                ship: "TIE/FO Fighter",
                skill: 5,
                points: 41,
                charge: 2,
                slots: [
                    "Talent",
                    "Tech",
                    "Modification"
                ]
            },
            {
                name: "Omega Squadron Ace",
                id: 267,
                faction: "First Order",
                ship: "TIE/FO Fighter",
                skill: 3,
                points: 31,
                slots: [
                    "Talent",
                    "Tech",
                    "Modification"
                ]
            },
            {
                name: "Zeta Squadron Pilot",
                id: 268,
                faction: "First Order",
                ship: "TIE/FO Fighter",
                skill: 2,
                points: 29,
                slots: [
                    "Tech",
                    "Modification"
                ]
            },
            {
                name: "Epsilon Squadron Cadet",
                id: 269,
                faction: "First Order",
                ship: "TIE/FO Fighter",
                skill: 1,
                points: 28,
                slots: [
                    "Tech",
                    "Modification"
                ]
            },
            {
                name: "Greer Sonnel",
                id: 270,
                unique: true,
                faction: "Resistance",
                ship: "RZ-2 A-Wing",
                skill: 4,
                points: 36,
                slots: [
                    "Talent",
                    "Talent",
                    "Missile",
                    "Tech"
                ]
            },
            {
                name: "Zari Bangel",
                id: 271,
                unique: true,
                faction: "Resistance",
                ship: "RZ-2 A-Wing",
                skill: 3,
                points: 35,
                slots: [
                    "Talent",
                    "Talent",
                    "Missile",
                    "Tech"
                ]
            },
            {
                name: "Darth Maul",
                id: 272,
                unique: true,
                faction: "Separatist Alliance",
                ship: "Sith Infiltrator",
                skill: 5,
                force: 3,
                points: 100,
                slots: [
                    "Force",
                    "Modification"
                ]
            },
            {
                name: "Anakin Skylwaker",
                id: 273,
                unique: true,
                faction: "Galactic Republic",
                ship: "Delta-7 Aethersprite",
                skill: 6,
                force: 3,
                points: 100,
                slots: [
                    "Force",
                    "Configuration",
                    "Modification"
                ]
            },
            {
                name: "Luminara Unduli",
                id: 274,
                unique: true,
                faction: "Galactic Republic",
                ship: "Delta-7 Aethersprite",
                skill: 4,
                force: 2,
                points: 100,
                slots: [
                    "Force",
                    "Configuration",
                    "Modification"
                ]
            },
            {
                name: "Barriss Offee",
                id: 275,
                unique: true,
                faction: "Galactic Republic",
                ship: "Delta-7 Aethersprite",
                skill: 6,
                force: 3,
                points: 100,
                slots: [
                    "Force",
                    "Configuration",
                    "Modification"
                ]
            },
            {
                name: "Ahsoka Tano",
                id: 276,
                unique: true,
                faction: "Galactic Republic",
                ship: "Delta-7 Aethersprite",
                skill: 3,
                force: 2,
                points: 100,
                slots: [
                    "Force",
                    "Configuration",
                    "Modification"
                ]
            },
            {
                name: "Jedi Knight",
                id: 277,
                faction: "Galactic Republic",
                ship: "Delta-7 Aethersprite",
                skill: 3,
                force: 1,
                points: 100,
                slots: [
                    "Force",
                    "Configuration",
                    "Modification"
                ]
            },
            {
                name: "Obi-Wan Kenobi",
                id: 278,
                unique: true,
                faction: "Galactic Republic",
                ship: "Delta-7 Aethersprite",
                skill: 5,
                force: 2,
                points: 100,
                slots: [
                    "Force",
                    "Configuration",
                    "Modification"
                ]
            },
            {
                name: "Trade Federation Drone",
                id: 279,
                faction: "Separatist Alliance",
                ship: "Vulture-class Droid Fighter",
                skill: 1,
                points: 100,
                slots: [
                    "Modification"
                ]
            },
            {
                name: '"Sinker"',
                id: 280,
                faction: "Galactic Republic",
                ship: "ARC-170",
                skill: 3,
                points: 100,
                slots: [
                    "Talent",
                    "Torpedo",
                    "Crew",
                    "Gunner",
                    "Astromech",
                    "Modification"
                ]
            },
            {
                name: "Petty Officer Thanisson",
                id: 281,
                unique: true,
                faction: "First Order",
                ship: "Upsilon-Class Shuttle",
                skill: 1,
                points: 60,
                charge: 1,
                recurring: true,
                slots: [
                    "Tech",
                    "Tech",
                    "Crew",
                    "Crew",
                    "Crew",
                    "Cannon",
                    "Sensor",
                    "Modification"
                ]
            },
            {
                name: "Captain Cardinal",
                id: 282,
                unique: true,
                faction: "First Order",
                ship: "Upsilon-Class Shuttle",
                skill: 4,
                points: 64,
                charge: 2,
                slots: [
                    "Tech",
                    "Tech",
                    "Crew",
                    "Crew",
                    "Crew",
                    "Cannon",
                    "Sensor",
                    "Modification"
                ]
            },
            {
                name: '"Avenger"',
                id: 283,
                unique: true,
                faction: "First Order",
                ship: "TIE Silencer",
                skill: 3,
                points: 62,
                slots: [
                    "Talent",
                    "Tech",
                    "Torpedo",
                    "Missile",
                    "Modification"
                ]
            },
            {
                name: '"Recoil"',
                id: 284,
                unique: true,
                faction: "First Order",
                ship: "TIE Silencer",
                skill: 4,
                points: 63,
                slots: [
                    "Talent",
                    "Tech",
                    "Torpedo",
                    "Missile",
                    "Modification"
                ]
            },
            {
                name: "Omega Squadron Expert",
                id: 285,
                faction: "First Order",
                ship: "TIE/SF Fighter",
                skill: 3,
                points: 36,
                slots: [
                    "Talent",
                    "Tech",
                    "Gunner",
                    "Missile",
                    "Sensor",
                    "Modification"
                ]
            },
            {
                name: "Sienar-Jaemus Engineer",
                id: 286,
                faction: "First Order",
                ship: "TIE Silencer",
                skill: 1,
                points: 56,
                slots: [
                    "Tech",
                    "Torpedo",
                    "Missile",
                    "Modification"
                ]
            },
            {
                name: "First Order Test Pilot",
                id: 287,
                faction: "First Order",
                ship: "TIE Silencer",
                skill: 4,
                points: 62,
                slots: [
                    "Talent",
                    "Tech",
                    "Torpedo",
                    "Missile",
                    "Modification"
                ]
            },
            {
                name: "Starkiller Base Pilot",
                id: 288,
                faction: "First Order",
                ship: "Upsilon-Class Shuttle",
                skill: 2,
                points: 56,
                slots: [
                    "Tech",
                    "Tech",
                    "Crew",
                    "Crew",
                    "Crew",
                    "Cannon",
                    "Sensor",
                    "Modification"
                ]
            },
            {
                name: "Lieutenant Tavson",
                id: 289,
                unique: true,
                faction: "First Order",
                ship: "Upsilon-Class Shuttle",
                skill: 2,
                charge: 2,
                recurring: true,
                points: 62,
                slots: [
                    "Tech",
                    "Tech",
                    "Crew",
                    "Crew",
                    "Crew",
                    "Cannon",
                    "Sensor",
                    "Modification"
                ]
            },
            {
                name: '"Null"',
                id: 290,
                unique: true,
                faction: "First Order",
                ship: "TIE/FO Fighter",
                skill: 0,
                points: 31,
                slots: [
                    "Talent",
                    "Tech",
                    "Modification"
                ]
            },
            {
                name: "Cat",
                id: 291,
                unique: true,
                faction: "Resistance",
                ship: "MG-100 StarFortress",
                skill: 1,
                points: 64,
                slots: [
                    "Sensor",
                    "Tech",
                    "Crew",
                    "Gunner",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                ]
            },
            {
                name: "Ben Teene",
                id: 292,
                unique: true,
                faction: "Resistance",
                ship: "MG-100 StarFortress",
                skill: 3,
                points: 68,
                slots: [
                    "Sensor",
                    "Tech",
                    "Crew",
                    "Gunner",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                ]
            },
            {
                name: "Edon Kappehl",
                id: 293,
                unique: true,
                faction: "Resistance",
                ship: "MG-100 StarFortress",
                skill: 3,
                points: 69,
                slots: [
                    "Sensor",
                    "Tech",
                    "Crew",
                    "Gunner",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                ]
            },
            {
                name: "Vennie",
                id: 294,
                unique: true,
                faction: "Resistance",
                ship: "MG-100 StarFortress",
                skill: 2,
                points: 67,
                slots: [
                    "Sensor",
                    "Tech",
                    "Crew",
                    "Gunner",
                    "Gunner",
                    "Device",
                    "Device",
                    "Modification"
                ]
            },
            {
                name: "Resistance Sympathizer",
                id: 295,
                faction: "Resistance",
                ship: "Scavenged YT-1300",
                skill: 2,
                points: 68,
                slots: [
                    "Crew",
                    "Crew",
                    "Gunner",
                    "Illicit",
                    "Modification",
                    "Title"
                ]
            },
            {
                name: "Jessika Pava",
                id: 296,
                unique: true,
                faction: "Resistance",
                ship: "T-70 X-Wing",
                skill: 3,
                points: 52,
                charge: 1,
                recurring: true, 
                slots: [
                    "Astromech",
                    "Modification",
                    "Configuration",
                    "Tech",
                    "Title",
                    "Hardpoint"
                ]
            },
            {
                name: "Temmin Wexley",
                id: 297,
                unique: true,
                faction: "Resistance",
                ship: "T-70 X-Wing",
                skill: 4,
                points: 54,
                charge: 1,
                recurring: true, 
                slots: [
                    "Talent",
                    "Astromech",
                    "Modification",
                    "Configuration",
                    "Tech",
                    "Title",
                    "Hardpoint"
                ]
            },
            {
                name: "Nien Numb",
                id: 298,
                unique: true,
                faction: "Resistance",
                ship: "T-70 X-Wing",
                skill: 5,
                points: 55,
                slots: [
                    "Talent",
                    "Astromech",
                    "Modification",
                    "Configuration",
                    "Tech",
                    "Title",
                    "Hardpoint"
                ]
            },
            {
                name: "Ello Asty",
                id: 299,
                unique: true,
                faction: "Resistance",
                ship: "T-70 X-Wing",
                skill: 5,
                points: 56,
                slots: [
                    "Talent",
                    "Astromech",
                    "Modification",
                    "Configuration",
                    "Tech",
                    "Title",
                    "Hardpoint"
                ]
            },
            {
                name: "Green Squadron Expert",
                id: 300,
                faction: "Resistance",
                ship: "RZ-2 A-Wing",
                skill: 3,
                points: 34,
                slots: [
                    "Talent",
                    "Talent",
                    "Missile",
                    "Tech"
                ]
            },
            {
                name: "Blue Squadron Recruit",
                id: 301,
                faction: "Resistance",
                ship: "RZ-2 A-Wing",
                skill: 1,
                points: 32,
                slots: [
                    "Missile",
                    "Tech"
                ]
            },
            {
                name: "Foreman Proach",
                id: 302,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Mining Guild TIE Fighter",
                skill: 4,
                points: 32,
                slots: [
                    "Talent",
                    "Modification"
                ]
            },
            {
                name: "Overseer Yushyn",
                id: 303,
                unique: true,
                faction: "Scum and Villainy",
                ship: "Mining Guild TIE Fighter",
                skill: 2,
                charge: 1,
                recurring: true,
                points: 26,
                slots: [
                    "Modification"
                ]
            },
            {
                name: "Mining Guild Sentry",
                id: 304,
                faction: "Scum and Villainy",
                ship: "Mining Guild TIE Fighter",
                skill: 1,
                points: 24,
                slots: [
                    "Modification"
                ]
            }
        ],


        upgradesById: [
           {
               name: '"Chopper" (Astromech)',
               id: 0,
               slot: "Astromech",
               canonical_name: '"Chopper"'.canonicalize(),
               points: 2,
               unique: true,
               faction: "Rebel Alliance"
           },
           {
               name: '"Genius"',
               id: 1,
               slot: "Astromech",
               points: 0,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: "R2 Astromech",
               id: 2,
               slot: "Astromech",
               points: 6,
               charge: 2
           },
           {
               name: "R2-D2",
               id: 3,
               unique: true,
               slot: "Astromech",
               points: 8,
               charge: 3,
               faction: "Rebel Alliance"
           },
           {
               name: "R3 Astromech",
               id: 4,
               slot: "Astromech",
               points: 3
           },
           {
               name: "R4 Astromech",
               id: 5,
               slot: "Astromech",
               points: 2,
               restriction_func(ship) {
                    return !((ship.data.large != null) || (ship.data.medium != null));
                },
               modifier_func(stats) {
                    return (() => {
                        const result = [];
                        for (let turn = 0, end = stats.maneuvers[1].length, asc = 0 <= end; asc ? turn < end : turn > end; asc ? turn++ : turn--) {
                            if (turn > 4) {
                                continue;
                            }
                            if (stats.maneuvers[1][turn] > 0) { 
                                if (stats.maneuvers[1][turn] === 3) {
                                    stats.maneuvers[1][turn] = 1;
                                } else { 
                                    stats.maneuvers[1][turn] = 2;
                                }
                            }
                            if (stats.maneuvers[2][turn] > 0) { 
                                if (stats.maneuvers[2][turn] === 3) {
                                    result.push(stats.maneuvers[2][turn] = 1);
                                } else { 
                                    result.push(stats.maneuvers[2][turn] = 2);
                                }
                            } else {
                                result.push(undefined);
                            }
                        }
                        return result;
                    })();
                }
           },
           {
               name: "R5 Astromech",
               id: 6,
               slot: "Astromech",
               points: 5,
               charge: 2
           },
           {
               name: "R5-D8",
               id: 7,
               unique: true,
               slot: "Astromech",
               points: 7,
               charge: 3,
               faction: "Rebel Alliance"
           },
           {
               name: "R5-P8",
               id: 8,
               slot: "Astromech",
               points: 4,
               unique: true,
               faction: "Scum and Villainy",
               charge: 3
           },
           {
               name: "R5-TK",
               id: 9,
               slot: "Astromech",
               points: 1,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: "Heavy Laser Cannon",
               id: 10,
               slot: "Cannon",
               points: 4,
               attackbull: 4,
               range: "2-3"
           },
           {
               name: "Ion Cannon",
               id: 11,
               slot: "Cannon",
               points: 5,
               attack: 3,
               range: "1-3"
           },
           {
               name: "Jamming Beam",
               id: 12,
               slot: "Cannon",
               points: 2,
               attack: 3,
               range: "1-2"
           },
           {
               name: "Tractor Beam",
               id: 13,
               slot: "Cannon",
               points: 3,
               attack: 3,
               range: "1-3"
           },
           {
               name: "Admiral Sloane",
               id: 14,
               slot: "Crew",
               points: 10,
               unique: true,
               faction: "Galactic Empire"
           },
           {
               name: "Agent Kallus",
               id: 15,
               slot: "Crew",
               points: 6,
               unique: true,
               faction: "Galactic Empire",
               applies_condition: 'Hunted'.canonicalize()
           },
           {
               name: "Boba Fett",
               id: 16,
               slot: "Crew",
               points: 4,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: "Baze Malbus",
               id: 17,
               slot: "Crew",
               points: 8,
               unique: true,
               faction: "Rebel Alliance"
           },
           {
               name: "C-3PO",
               id: 18,
               slot: "Crew",
               points: 12,
               unique: true,
               faction: "Rebel Alliance",
               modifier_func(stats) {
                    if (!Array.from(stats.actions).includes('Calculate')) { return stats.actions.push('Calculate'); }
                }
           },
           {
               name: "Cassian Andor",
               id: 19,
               slot: "Crew",
               points: 6,
               unique: true,
               faction: "Rebel Alliance"
           },
           {
               name: "Cad Bane",
               id: 20,
               slot: "Crew",
               points: 4,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: "Chewbacca",
               id: 21,
               slot: "Crew",
               points: 5,
               unique: true,
               faction: "Rebel Alliance",
               charge: 2,
               recurring: true 
           },
           {
               name: "Chewbacca (Scum)",
               id: 22,
               slot: "Crew",
               xws: "chewbacca-crew", 
               points: 4,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: '"Chopper" (Crew)',
               id: 23,
               canonical_name: '"Chopper"'.canonicalize(),
               xws: "chopper-crew", 
               slot: "Crew",
               points: 2,
               unique: true,
               faction: "Rebel Alliance"
           },
           {
               name: "Ciena Ree",
               id: 24,
               slot: "Crew",
               points: 10,
               unique: true,
               faction: "Galactic Empire",
               restriction_func(ship) {
                    let needle, needle1;
                    return (needle = "Coordinate", Array.from(ship.effectiveStats().actions).includes(needle)) || (needle1 = "Coordinate", Array.from(ship.effectiveStats().actionsred).includes(needle1));
                }
           },
           {
               name: "Cikatro Vizago",
               id: 25,
               slot: "Crew",
               points: 2,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: "Darth Vader",
               id: 26,
               slot: "Crew",
               points: 14,
               force: 1,
               unique: true,
               faction: "Galactic Empire",
               modifier_func(stats) {
                    return stats.force += 1;
                }
           },
           {
               name: "Death Troopers",
               id: 27,
               slot: "Crew",
               points: 6,
               unique: true,
               faction: "Galactic Empire",
               restriction_func(ship, upgrade_obj) {
                    return ship.hasAnotherUnoccupiedSlotLike(upgrade_obj);
                },
               validation_func(ship, upgrade_obj) {
                    return upgrade_obj.occupiesAnotherUpgradeSlot();
                },
               also_occupies_upgrades: [ "Crew" ]
           },
           {
               name: "Director Krennic",
               id: 28,
               slot: "Crew",
               points: 5,
               unique: true,
               faction: "Galactic Empire",
               applies_condition: 'Optimized Prototype'.canonicalize(),
               modifier_func(stats) {
                    if (!Array.from(stats.actions).includes('Lock')) { return stats.actions.push('Lock'); }
                }
           },
           {
               name: "Emperor Palpatine",
               id: 29,
               slot: "Crew",
               points: 13,
               force: 1,
               unique: true,
               faction: "Galactic Empire",
               restriction_func(ship, upgrade_obj) {
                    return ship.hasAnotherUnoccupiedSlotLike(upgrade_obj);
                },
               validation_func(ship, upgrade_obj) {
                    return upgrade_obj.occupiesAnotherUpgradeSlot();
                },
               also_occupies_upgrades: [ "Crew" ],
               modifier_func(stats) {
                    return stats.force += 1;
                }
           },
           {
               name: "Freelance Slicer",
               id: 30,
               slot: "Crew",
               points: 3
           },
           {
               name: "4-LOM",
               id: 31,
               slot: "Crew",
               points: 3,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: 'GNK "Gonk" Droid',
               id: 32,
               slot: "Crew",
               points: 10,
               charge: 1
           },
           {
               name: "Grand Inquisitor",
               id: 33,
               slot: "Crew",
               points: 16,
               unique: true,
               force: 1, 
               faction: "Galactic Empire",
               modifier_func(stats) {
                    return stats.force += 1;
                }
           },
           {
               name: "Grand Moff Tarkin",
               id: 34,
               slot: "Crew",
               points: 10,
               unique: true,
               faction: "Galactic Empire",
               charge: 2,
               recurring: true,
               restriction_func(ship) {
                    let needle, needle1;
                    return (needle = "Lock", Array.from(ship.effectiveStats().actions).includes(needle)) || (needle1 = "Lock", Array.from(ship.effectiveStats().actionsred).includes(needle1));
                }
           },
           {
               name: "Hera Syndulla",
               id: 35,
               slot: "Crew",
               points: 4,
               unique: true,
               faction: "Rebel Alliance"
           },
           {
               name: "IG-88D",
               id: 36,
               slot: "Crew",
               points: 4,
               unique: true,
               faction: "Scum and Villainy",
               modifier_func(stats) {
                    if (!Array.from(stats.actions).includes('Calculate')) { return stats.actions.push('Calculate'); }
                }
        
           },
           {
               name: "Informant",
               id: 37,
               slot: "Crew",
               points: 5,
               unique: true,
               applies_condition: 'Listening Device'.canonicalize()
           },
           {
               name: "ISB Slicer",
               id: 38,
               slot: "Crew",
               points: 3,
               faction: "Galactic Empire"
           },
           {
               name: "Jabba the Hutt",
               id: 39,
               slot: "Crew",
               points: 8,
               unique: true,
               faction: "Scum and Villainy",
               charge: 4,
               restriction_func(ship, upgrade_obj) {
                    return ship.hasAnotherUnoccupiedSlotLike(upgrade_obj);
                },
               validation_func(ship, upgrade_obj) {
                    return upgrade_obj.occupiesAnotherUpgradeSlot();
                },
               also_occupies_upgrades: [ "Crew" ]
           },
           {
               name: "Jyn Erso",
               id: 40,
               slot: "Crew",
               points: 2,
               unique: true,
               faction: "Rebel Alliance"
           },
           {
               name: "Kanan Jarrus",
               id: 41,
               slot: "Crew",
               points: 14,
               force: 1,
               unique: true,
               faction: "Rebel Alliance",
               modifier_func(stats) {
                    return stats.force += 1;
                }
           },
           {
               name: "Ketsu Onyo",
               id: 42,
               slot: "Crew",
               points: 5,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: "L3-37",
               id: 43,
               slot: "Crew",
               points: 4,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: "Lando Calrissian",
               id: 44,
               slot: "Crew",
               xws: "landocalrissian", 
               points: 5,
               unique: true,
               faction: "Rebel Alliance"
           },
           {
               name: "Lando Calrissian (Scum)",
               id: 45,
               slot: "Crew",
               xws: "landocalrissian-crew", 
               points: 8,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: "Leia Organa",
               id: 46,
               slot: "Crew",
               points: 8,
               unique: true,
               faction: "Rebel Alliance",
               charge: 3,
               recurring: true 
           },
           {
               name: "Latts Razzi",
               id: 47,
               slot: "Crew",
               points: 7,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: "Maul",
               id: 48,
               slot: "Crew",
               points: 13,
               unique: true,
               force: 1,
               modifier_func(stats) {
                    return stats.force += 1;
                },
               restriction_func(ship) {
                    const { builder } = ship;
                    if (builder.faction === "Scum and Villainy") { return true; }
                    for (let t in builder.uniques_in_use) {
                        var needle;
                        const things = builder.uniques_in_use[t];
                        if ((needle = 'ezrabridger', Array.from((Array.from(things).map((thing) => thing.canonical_name.getXWSBaseName()))).includes(needle))) { return true; }
                    }
                    return false;
                }
           },
           {
               name: "Minister Tua",
               id: 49,
               slot: "Crew",
               points: 7,
               unique: true,
               faction: "Galactic Empire"
           },
           {
               name: "Moff Jerjerrod",
               id: 50,
               slot: "Crew",
               points: 12,
               unique: true,
               faction: "Galactic Empire",
               charge: 2,
               recurring: true,
               restriction_func(ship) {
                    let needle, needle1;
                    return (needle = "Coordinate", Array.from(ship.effectiveStats().actions).includes(needle)) || (needle1 = "Coordinate", Array.from(ship.effectiveStats().actionsred).includes(needle1));
                }
           },
           {
               name: "Magva Yarro",
               id: 51,
               slot: "Crew",
               points: 7,
               unique: true,
               faction: "Rebel Alliance"
           },
           {
               name: "Nien Nunb",
               id: 52,
               slot: "Crew",
               points: 5,
               unique: true,
               faction: "Rebel Alliance",
               modifier_func(stats) {
                    return (() => {
                        const result = [];
                        const iterable = stats.maneuvers != null ? stats.maneuvers : [];
                        for (let spd = 0; spd < iterable.length; spd++) {
                            const s = iterable[spd];
                            if (spd === 0) { continue; }
                            if (s[1] > 0) { 
                                if (s[1] = 1) {
                                    s[1] = 2;
                                } else if (s[1] = 3) {
                                    s[1] = 1;
                                }
                            }
                            if (s[3] > 0) { 
                                if (s[3] = 1) {
                                    result.push(s[3] = 2);
                                } else if (s[3] = 3) {
                                    result.push(s[3] = 1);
                                } else {
                                    result.push(undefined);
                                }
                            } else {
                                result.push(undefined);
                            }
                        }
                        return result;
                    })();
                }
           },
           {
               name: "Novice Technician",
               id: 53,
               slot: "Crew",
               points: 4
           },
           {
               name: "Perceptive Copilot",
               id: 54,
               slot: "Crew",
               points: 10
           },
           {
               name: "Qi'ra",
               id: 55,
               slot: "Crew",
               points: 2,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: "R2-D2 (Crew)",
               id: 56,
               slot: "Crew",
               canonical_name: 'r2d2-crew',
               xws: "r2d2-crew",
               points: 8,
               unique: true,
               faction: "Rebel Alliance"
           },
           {
               name: "Sabine Wren",
               id: 57,
               slot: "Crew",
               points: 3,
               unique: true,
               faction: "Rebel Alliance"
           },
           {
               name: "Saw Gerrera",
               id: 58,
               slot: "Crew",
               points: 8,
               unique: true,
               faction: "Rebel Alliance"
           },
           {
               name: "Seasoned Navigator",
               id: 59,
               slot: "Crew",
               points: 5
           },
           {
               name: "Seventh Sister",
               id: 60,
               slot: "Crew",
               points: 12,
               force: 1,
               unique: true,
               faction: "Galactic Empire",
               modifier_func(stats) {
                    return stats.force += 1;
                }
           },
           {
               name: "Tactical Officer",
               id: 61,
               slot: "Crew",
               points: 2,
               restriction_func(ship) {
                    let needle;
                    return (needle = "Coordinate", Array.from(ship.effectiveStats().actionsred).includes(needle));
                },
               modifier_func(stats) {
                    if (!Array.from(stats.actions).includes('Coordinate')) { return stats.actions.push('Coordinate'); }
                }
           },
           {
               name: "Tobias Beckett",
               id: 62,
               slot: "Crew",
               points: 2,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: "0-0-0",
               id: 63,
               slot: "Crew",
               points: 3,
               unique: true,
               restriction_func(ship) {
                    const { builder } = ship;
                    if (builder.faction === "Scum and Villainy") { return true; }
                    for (let t in builder.uniques_in_use) {
                        var needle;
                        const things = builder.uniques_in_use[t];
                        if ((needle = 'darthvader', Array.from((Array.from(things).map((thing) => thing.canonical_name.getXWSBaseName()))).includes(needle))) { return true; }
                    }
                    return false;
                }
           },
           {
               name: "Unkar Plutt",
               id: 64,
               slot: "Crew",
               points: 2,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: '"Zeb" Orrelios', 
               id: 65,
               slot: "Crew",
               points: 1,
               unique: true,
               faction: "Rebel Alliance"
           },
           {
               name: "Zuckuss",
               id: 66,
               slot: "Crew",
               points: 3,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: "Bomblet Generator",
               id: 67,
               slot: "Device",
               points: 5,
               charge: 2,
               applies_condition: 'Bomblet'.canonicalize(),
               restriction_func(ship, upgrade_obj) {
                    return ship.hasAnotherUnoccupiedSlotLike(upgrade_obj);
                },
               validation_func(ship, upgrade_obj) {
                    return upgrade_obj.occupiesAnotherUpgradeSlot();
                },
               also_occupies_upgrades: [ "Device" ]
           },
           {
               name: "Conner Nets",
               id: 68,
               slot: "Device",
               points: 6,
               charge: 1,
               applies_condition: 'Conner Net'.canonicalize()
           },
           {
               name: "Proton Bombs",
               id: 69,
               slot: "Device",
               points: 5,
               charge: 2,
               applies_condition: 'Proton Bomb'.canonicalize()
           },
           {
               name: "Proximity Mines",
               id: 70,
               slot: "Device",
               points: 6,
               charge: 2,
               applies_condition: 'Proximity Mine'.canonicalize()
           },
           {
               name: "Seismic Charges",
               id: 71,
               slot: "Device",
               points: 3,
               charge: 2,
               applies_condition: 'Seismic Charge'.canonicalize()
           },
           {
               name: "Heightened Perception",
               id: 72,
               slot: "Force",
               points: 3
           },
           {
               name: "Instinctive Aim",
               id: 73,
               slot: "Force",
               points: 2
           },
           {
               name: "Supernatural Reflexes",
               id: 74,
               slot: "Force",
               points: 12,
               restriction_func(ship) {
                    return !((ship.data.large != null) || (ship.data.medium != null));
                }
           },
           {
               name: "Sense",
               id: 75,
               slot: "Force",
               points: 6
           },
           {
               name: "Agile Gunner",
               id: 76,
               slot: "Gunner",
               points: 10
           },
           {
               name: "Bistan",
               id: 77,
               slot: "Gunner",
               points: 14,
               unique: true,
               faction: "Rebel Alliance"
           },
           {
               name: "Bossk",
               id: 78,
               slot: "Gunner",
               points: 10,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: "BT-1",
               id: 79,
               slot: "Gunner",
               points: 2,
               unique: true,
               restriction_func(ship) {
                    const { builder } = ship;
                    if (builder.faction === "Scum and Villainy") { return true; }
                    for (let t in builder.uniques_in_use) {
                        var needle;
                        const things = builder.uniques_in_use[t];
                        if ((needle = 'darthvader', Array.from((Array.from(things).map((thing) => thing.canonical_name.getXWSBaseName()))).includes(needle))) { return true; }
                    }
                    return false;
                }
           },
           {
               name: "Dengar",
               id: 80,
               slot: "Gunner",
               points: 6,
               unique: true,
               faction: "Scum and Villainy",
               recurring: true,
               charge: 1

           },
           {
               name: "Ezra Bridger",
               id: 81,
               slot: "Gunner",
               points: 18,
               force: 1,
               unique: true,
               faction: "Rebel Alliance",
               modifier_func(stats) {
                    return stats.force += 1;
                }
           },
           {
               name: "Fifth Brother",
               id: 82,
               slot: "Gunner",
               points: 12,
               force: 1,
               unique: true,
               faction: "Galactic Empire",
               modifier_func(stats) {
                    return stats.force += 1;
                }
           },
           {
               name: "Greedo",
               id: 83,
               slot: "Gunner",
               points: 1,
               unique: true,
               faction: "Scum and Villainy",
               charge: 1,
               recurring: true 
           },
           {
               name: "Han Solo",
               id: 84,
               slot: "Gunner",
               xws: "hansolo", 
               points: 12,
               unique: true,
               faction: "Rebel Alliance"
           },
           {
               name: "Han Solo (Scum)",
               id: 85,
               slot: "Gunner",
               xws: "hansolo-gunner",
               points: 4,
               unique: true,
               faction: "Scum and Villainy"
           },
           {
               name: "Hotshot Gunner",
               id: 86,
               slot: "Gunner",
               points: 7
           },
           {
               name: "Luke Skywalker",
               id: 87,
               slot: "Gunner",
               points: 30,
               force: 1,
               unique: true,
               faction: "Rebel Alliance",
               modifier_func(stats) {
                    return stats.force += 1;
                }
           },
           {
               name: "Skilled Bombardier",
               id: 88,
               slot: "Gunner",
               points: 2
           },
           {
               name: "Veteran Tail Gunner",
               id: 89,
               slot: "Gunner",
               points: 4,
               restriction_func(ship) {
                    return (ship.data.attackb != null);
                }
           },
           {
               name: "Veteran Turret Gunner",
               id: 90,
               slot: "Gunner",
               points: 8,
               restriction_func(ship) {
                    let needle, needle1;
                    return (needle = "Rotate Arc", Array.from(ship.effectiveStats().actions).includes(needle)) || (needle1 = "Rotate Arc", Array.from(ship.effectiveStats().actionsred).includes(needle1));
                }
           },
           {
               name: "Cloaking Device",
               id: 91,
               slot: "Illicit",
               points: 5,
               unique: true,
               charge: 2,
               restriction_func(ship) {
                    return (ship.data.large == null);
                }
           },
           {
               name: "Contraband Cybernetics",
               id: 92,
               slot: "Illicit",
               points: 5,
               charge: 1
           },
           {
               name: "Deadman's Switch",
               id: 93,
               slot: "Illicit",
               points: 2
           },
           {
               name: "Feedback Array",
               id: 94,
               slot: "Illicit",
               points: 4
           },
           {
               name: "Inertial Dampeners",
               id: 95,
               slot: "Illicit",
               points: 1
           },
           {
               name: "Rigged Cargo Chute",
               id: 96,
               slot: "Illicit",
               points: 4,
               charge: 1,
               restriction_func(ship) {
                    return (ship.data.medium != null)  || (ship.data.large != null);
                }
           },
           {
               name: "Barrage Rockets",
               id: 97,
               slot: "Missile",
               points: 6,
               attack: 3,
               range: "2-3",
               rangebonus: true, 
               charge: 5,
               restriction_func(ship, upgrade_obj) {
                   return ship.hasAnotherUnoccupiedSlotLike(upgrade_obj);
               },
               validation_func(ship, upgrade_obj) {
                   return upgrade_obj.occupiesAnotherUpgradeSlot();
               },
               also_occupies_upgrades: [ 'Missile' ]
           },
           {
               name: "Cluster Missiles",
               id: 98,
               slot: "Missile",
               points: 5,
               attack: 3,
               range: "1-2",
               rangebonus: true, 
               charge: 4
           },
           {
               name: "Concussion Missiles",
               id: 99,
               slot: "Missile",
               points: 6,
               attack: 3,
               range: "2-3",
               rangebonus: true, 
               charge: 3
           },
           {
               name: "Homing Missiles",
               id: 100,
               slot: "Missile",
               points: 3,
               attack: 4,
               range: "2-3",
               rangebonus: true, 
               charge: 2
           },
           {
               name: "Ion Missiles",
               id: 101,
               slot: "Missile",
               points: 4,
               attack: 3,
               range: "2-3",
               rangebonus: true, 
               charge: 3
           },
           {
               name: "Proton Rockets",
               id: 102,
               slot: "Missile",
               points: 7,
               attackbull: 5,
               range: "1-2",
               rangebonus: true, 
               charge: 1
           },
           {
               name: "Ablative Plating",
               id: 103,
               slot: "Modification",
               points: 4,
               charge: 2,
               restriction_func(ship) {
                    return (ship.data.medium != null)  || (ship.data.large != null);
                }
           },
           {
               name: "Advanced SLAM",
               id: 104,
               slot: "Modification",
               points: 3,
               restriction_func(ship) { 
                    let needle, needle1;
                    return (needle = "Slam", Array.from(ship.effectiveStats().actions).includes(needle)) || (needle1 = "Slam", Array.from(ship.effectiveStats().actionsred).includes(needle1));
                }
           },
           {
               name: "Afterburners",
               id: 105,
               slot: "Modification",
               points: 8,
               charge: 2,
               restriction_func(ship) {
                    return !((ship.data.large != null ? ship.data.large : false) || (ship.data.medium != null ? ship.data.medium : false));
                }
           },
           {
               name: "Electronic Baffle",
               id: 106,
               slot: "Modification",
               points: 2
           },
           {
               name: "Engine Upgrade",
               id: 107,
               slot: "Modification",
               points: '*',
               basepoints: 3,
               variablebase: true,
               restriction_func(ship) {
                    let needle;
                    return (needle = "Boost", Array.from(ship.effectiveStats().actionsred).includes(needle));
                },
               modifier_func(stats) {
                    if (!Array.from(stats.actions).includes('Boost')) { return stats.actions.push('Boost'); }
                }
           },
           {
               name: "Munitions Failsafe",
               id: 108,
               slot: "Modification",
               points: 2
           },
           {
               name: "Static Discharge Vanes",
               id: 109,
               slot: "Modification",
               points: 6
           },
           {
               name: "Tactical Scrambler",
               id: 110,
               slot: "Modification",
               points: 2,
               restriction_func(ship) {
                    return (ship.data.medium != null)  || (ship.data.large != null);
                }
           },
           {
               name: "Advanced Sensors",
               id: 111,
               slot: "Sensor",
               points: 8
           },
           {
               name: "Collision Detector",
               id: 112,
               slot: "Sensor",
               points: 5,
               charge: 2
           },
           {
               name: "Fire-Control System",
               id: 113,
               slot: "Sensor",
               points: 3
           },
           {
               name: "Trajectory Simulator",
               id: 114,
               slot: "Sensor",
               points: 3
           },
           {
               name: "Composure",
               id: 115,
               slot: "Talent",
               points: 2,
               restriction_func(ship) {
                    let needle, needle1;
                    return (needle = "Focus", Array.from(ship.effectiveStats().actions).includes(needle)) || (needle1 = "Focus", Array.from(ship.effectiveStats().actionsred).includes(needle1));
                }
           },
           {
               name: "Crack Shot",
               id: 116,
               slot: "Talent",
               points: 1,
               charge: 1
           },
           {
               name: "Daredevil",
               id: 117,
               slot: "Talent",
               points: 3,
               restriction_func(ship) {
                    let needle;
                    return (needle = "Boost", Array.from(ship.effectiveStats().actions).includes(needle)) && !((ship.data.large != null) || (ship.data.medium != null));
                }
           },
           {
               name: "Debris Gambit",
               id: 118,
               slot: "Talent",
               points: 2,
               restriction_func(ship) {
                    return (ship.data.large == null);
                },
               modifier_func(stats) {
                    if (!Array.from(stats.actionsred).includes('Evade')) { return stats.actionsred.push('Evade'); }
                }
           },
           {
               name: "Elusive",
               id: 119,
               slot: "Talent",
               points: 3,
               charge: 1,
               restriction_func(ship) {
                    return (ship.data.large == null);
                }
           },
           {
               name: "Expert Handling",
               id: 120,
               slot: "Talent",
               points: '*',
               basepoints: 2,
               variablebase: true,
               restriction_func(ship) {
                    let needle;
                    return (needle = "Barrel Roll", Array.from(ship.effectiveStats().actionsred).includes(needle));
                },
               modifier_func(stats) {
                    if (!Array.from(stats.actions).includes('Barrel Roll')) { return stats.actions.push('Barrel Roll'); }
                }
           },
           {
               name: "Fearless",
               id: 121,
               slot: "Talent",
               points: 3,
               faction: "Scum and Villainy"
           },
           {
               name: "Intimidation",
               id: 122,
               slot: "Talent",
               points: 3
           },
           {
               name: "Juke",
               id: 123,
               slot: "Talent",
               points: 4,
               restriction_func(ship) {
                    return (ship.data.large == null);
                }
           },
           {
               name: "Lone Wolf",
               id: 124,
               slot: "Talent",
               points: 4,
               unique: true,
               recurring: true,
               charge: 1
           },
           {
               name: "Marksmanship",
               id: 125,
               slot: "Talent",
               points: 1
           },
           {
               name: "Outmaneuver",
               id: 126,
               slot: "Talent",
               points: 6
           },
           {
               name: "Predator",
               id: 127,
               slot: "Talent",
               points: 2
           },
           {
               name: "Ruthless",
               id: 128,
               slot: "Talent",
               points: 1,
               faction: "Galactic Empire"
           },
           {
               name: "Saturation Salvo",
               id: 129,
               slot: "Talent",
               points: 6,
               restriction_func(ship) {
                    let needle, needle1;
                    return (needle = "Reload", Array.from(ship.effectiveStats().actions).includes(needle)) || (needle1 = "Reload", Array.from(ship.effectiveStats().actionsred).includes(needle1));
                }
           },
           {
               name: "Selfless",
               id: 130,
               slot: "Talent",
               points: 3,
               faction: "Rebel Alliance"
           },
           {
               name: "Squad Leader",
               id: 131,
               slot: "Talent",
               points: 4,
               unique: true,
               modifier_func(stats) {
                    if (stats.actionsred != null) {
                        if (!Array.from(stats.actionsred).includes('Coordinate')) { return stats.actionsred.push('Coordinate'); }
                    }
                }
           },
           {
               name: "Swarm Tactics",
               id: 132,
               slot: "Talent",
               points: 3
           },
           {
               name: "Trick Shot",
               id: 133,
               slot: "Talent",
               points: 1
           },
           {
               name: "Adv. Proton Torpedoes",
               id: 134,
               slot: "Torpedo",
               points: 6,
               attack: 5,
               range: "1",
               rangebonus: true, 
               charge: 1
           },
           {
               name: "Ion Torpedoes",
               id: 135,
               slot: "Torpedo",
               points: 6,
               attack: 4,
               range: "2-3",
               rangebonus: true, 
               charge: 2
           },
           {
               name: "Proton Torpedoes",
               id: 136,
               slot: "Torpedo",
               points: 9,
               attack: 4,
               range: "2-3",
               rangebonus: true, 
               charge: 2
           },
           {
               name: "Dorsal Turret",
               id: 137,
               slot: "Turret",
               points: 4,
               attackt: 2,
               range: "1-2",
               modifier_func(stats) {
                    if (!Array.from(stats.actions).includes('Rotate Arc')) { return stats.actions.push('Rotate Arc'); }
                }
           },
           {
               name: "Ion Cannon Turret",
               id: 138,
               slot: "Turret",
               points: 6,
               attackt: 3,
               range: "1-2",
               modifier_func(stats) {
                    if (!Array.from(stats.actions).includes('Rotate Arc')) { return stats.actions.push('Rotate Arc'); }
                }
           },
           {
               name: "Os-1 Arsenal Loadout",
               id: 139,
               points: 0,
               slot: "Configuration",
               ship: "Alpha-Class Star Wing",
               confersAddons: [
                    {
                        type: exportObj.Upgrade,
                        slot: "Torpedo"
                    },
                    {
                        type: exportObj.Upgrade,
                        slot: "Missile"
                    }
                ]
           },
           {
               name: "Pivot Wing",
               id: 140,
               points: 0,
               slot: "Configuration",
               ship: "U-Wing"
           },
           {
               name: "Pivot Wing (Open)",
               id: 141,
               points: 0,
               skip: true 
           },
           {
               name: "Servomotor S-Foils",
               id: 142,
               points: 0,
               slot: "Configuration",
               ship: "X-Wing"
           },
           {
               name: "Blank",
               id: 143,
               skip: true
           },
           {
               name: "Xg-1 Assault Configuration",
               id: 144,
               points: 0,
               slot: "Configuration",
               ship: "Alpha-Class Star Wing",
               confersAddons: [
                    {
                        type: exportObj.Upgrade,
                        slot: "Cannon"
                    }
               ]
           },
           {
               name: "L3-37's Programming",
               id: 145,
               skip: true, 
               points: 0,
               slot: "Configuration",
               faction: "Scum and Villainy"
           },
           {
               name: "Andrasta",
               id: 146,
               slot: "Title",
               points: 6,
               unique: true,
               faction: "Scum and Villainy",
               ship: "Firespray-31",
               confersAddons: [
                  {
                      type: exportObj.Upgrade,
                      slot: "Device"
                  }
                ],
               modifier_func(stats) {
                    if (!Array.from(stats.actions).includes('Reload')) { return stats.actions.push('Reload'); }
                }
           },
           {
               name: "Dauntless",
               id: 147,
               slot: "Title",
               points: 6,
               unique: true,
               faction: "Galactic Empire",
               ship: "VT-49 Decimator"
           },
           {
               name: "Ghost",
               id: 148,
               slot: "Title",
               unique: true,
               points: 0,
               faction: "Rebel Alliance",
               ship: "VCX-100"
           },
           {
               name: "Havoc",
               id: 149,
               slot: "Title",
               points: 4,
               unique: true,
               faction: "Scum and Villainy",
               ship: "Scurrg H-6 Bomber",
               unequips_upgrades: [
                    'Crew'
                ],
               also_occupies_upgrades: [
                    'Crew'
               ],
               confersAddons: [
                    {
                        type: exportObj.Upgrade,
                        slot: 'Sensor'
                    },
                    {
                        type: exportObj.Upgrade,
                        slot: 'Astromech'
                    }
               ]
           },
           {
               name: "Hound's Tooth",
               id: 150,
               slot: "Title",
               points: 1,
               unique: true,
               faction: "Scum and Villainy",
               ship: "YV-666"
           },
           {
               name: "IG-2000",
               id: 151,
               slot: "Title",
               points: 2,
               faction: "Scum and Villainy",
               ship: "Aggressor"
           },
           {
               name: "Lando's Millennium Falcon",
               id: 152,
               slot: "Title",
               points: 6,
               unique: true,
               faction: "Scum and Villainy",
               ship: "Customized YT-1300"
           },
           {
               name: "Marauder",
               id: 153,
               slot: "Title",
               points: 3,
               unique: true,
               faction: "Scum and Villainy",
               ship: "Firespray-31",
               confersAddons: [
                  {
                      type: exportObj.Upgrade,
                      slot: "Gunner"
                  }
                ]       },
           {
               name: "Millennium Falcon",
               id: 154,
               slot: "Title",
               points: 6,
               unique: true,
               faction: "Rebel Alliance",
               ship: "YT-1300",
               modifier_func(stats) {
                    if (!Array.from(stats.actions).includes('Evade')) { return stats.actions.push('Evade'); }
                }
           },
           {
               name: "Mist Hunter",
               id: 155,
               slot: "Title",
               points: 2,
               unique: true,
               faction: "Scum and Villainy",
               ship: "G-1A Starfighter",
               modifier_func(stats) {
                    if (!Array.from(stats.actions).includes('Barrel Roll')) { return stats.actions.push('Barrel Roll'); }
                },
               confersAddons: [
                    {
                        type: exportObj.Upgrade,
                        slot: "Cannon"
                    }
               ]
           },
           {
               name: "Moldy Crow",
               id: 156,
               slot: "Title",
               points: 12,
               unique: true,
               ship: "HWK-290",
               modifier_func(stats) {
                    return stats.attack = 3;
                }
           },
           {
               name: "Outrider",
               id: 157,
               slot: "Title",
               points: 14,
               unique: true,
               faction: "Rebel Alliance",
               ship: "YT-2400"
           },
           {
               name: "Phantom (Sheathipede)",
               id: 158,
               skip: true, 
               slot: "Title",
               points: 2,
               unique: true,
               faction: "Rebel Alliance",
               ship: "Sheathipede-Class Shuttle"
           },
           {
               name: "Punishing One",
               id: 159,
               slot: "Title",
               points: 8,
               unique: true,
               faction: "Scum and Villainy",
               ship: "JumpMaster 5000",
               unequips_upgrades: [
                    'Crew'
               ],
               also_occupies_upgrades: [
                    'Crew'
               ],
               confersAddons: [
                    {
                        type: exportObj.Upgrade,
                        slot: 'Astromech'
                    }
               ]
           },
           {
               name: "Shadow Caster",
               id: 160,
               slot: "Title",
               points: 6,
               unique: true,
               faction: "Scum and Villainy",
               ship: "Lancer-Class Pursuit Craft"
           },
           {
               name: "Slave I",
               id: 161,
               slot: "Title",
               points: 5,
               unique: true,
               faction: "Scum and Villainy",
               ship: "Firespray-31",
               confersAddons: [
                  {
                      type: exportObj.Upgrade,
                      slot: "Torpedo"
                  }
                ]       },
           {
               name: "ST-321",
               id: 162,
               slot: "Title",
               points: 6,
               unique: true,
               faction: "Galactic Empire",
               ship: "Lambda-Class Shuttle"
           },
           {
               name: "Virago",
               id: 163,
               slot: "Title",
               points: 10,
               unique: true,
               charge: 2,
               ship: "StarViper",
               modifier_func(stats) {
                    return stats.shields += 1;
                },       
               confersAddons: [
                    {
                        type: exportObj.Upgrade,
                        slot: "Modification"
                    }
                ]
           },
           {
               name: "Hull Upgrade",
               id: 164,
               slot: "Modification",
               points: '*',
               basepoints: 2,
               variableagility: true,
               modifier_func(stats) {
                    return stats.hull += 1;
                }       
           },
           {
               name: "Shield Upgrade",
               id: 165,
               slot: "Modification",
               points: '*',
               basepoints: 3,
               variableagility: true,
               modifier_func(stats) {
                    return stats.shields += 1;
                }       
           },
           {
               name: "Stealth Device",
               id: 166,
               slot: "Modification",
               points: '*',
               basepoints: 3,
               variableagility: true,
               charge: 1,
               modifier_func(stats) {
                    return stats.agility += 1;
                }       
           },
           {
               name: "Phantom",
               id: 167,
               slot: "Title",
               points: 2,
               unique: true,
               faction: "Rebel Alliance",
               ship: ["Attack Shuttle","Sheathipede-Class Shuttle"]
           },
           {
                name: "Hardpoint: Cannon",
                id: 168,
                slot: "Hardpoint",
                points: 0,
                ignorecollection: true,
                confersAddons: [
                    {
                        type: exportObj.Upgrade,
                        slot: "Cannon"
                    }
                ]
           },
           {
                name: "Hardpoint: Torpedo",
                id: 169,
                slot: "Hardpoint",
                ignorecollection: true,
                points: 0,
                confersAddons: [
                    {
                        type: exportObj.Upgrade,
                        slot: "Torpedo"
                    }
                ]
           },
           {
                name: "Hardpoint: Missile",
                id: 170,
                slot: "Hardpoint",
                ignorecollection: true,
                points: 0,
                confersAddons: [
                    {
                        type: exportObj.Upgrade,
                        slot: "Missile"
                    }
                ]
           },
           {
                name: "Black One",
                id: 171,
                slot: "Title",
                unique: true,
                charge: 1,
                points: 2,
                faction: "Resistance",
                ship: "T-70 X-Wing",
                modifier_func(stats) {
                    if (!Array.from(stats.actions).includes('Slam')) { return stats.actions.push('Slam'); }
                }
           },
           {
                name: "Heroic",
                id: 172,
                slot: "Talent",
                points: 1,
                faction: "Resistance"
           },
           {
                name: "Rose Tico",
                id: 173,
                slot: "Crew",
                points: 9,
                unique: true,
                faction: "Resistance"
           },
           {
                name: "Finn",
                id: 174,
                slot: "Gunner",
                points: 10,
                unique: true,
                faction: "Resistance"
           },
           {
                name: "Integrated S-Foils",
                id: 175,
                slot: "Configuration",
                points: 0,
                faction: "Resistance",
                ship: "T-70 X-Wing"
           },
           {
                name: "Integrated S-Foils (Open)",
                id: 176,
                skip: true
           },
           {
                name: "Targeting Synchronizer",
                id: 177,
                slot: "Tech",
                points: 5,
                restriction_func(ship) {
                    let needle, needle1;
                    return (needle = "Lock", Array.from(ship.effectiveStats().actions).includes(needle)) || (needle1 = "Lock", Array.from(ship.effectiveStats().actionsred).includes(needle1));
                }
           },
           {
                name: "Primed Thrusters",
                id: 178,
                slot: "Tech",
                points: 8,
                restriction_func(ship) {
                    return !((ship.data.large != null) || (ship.data.medium != null));
                }
           },
           {
                name: "Kylo Ren",
                id: 179,
                slot: "Crew",
                points: 11,
                force: 1,
                faction: "First Order",
                unique: true,
                applies_condition: 'I\'ll Show You the Dark Side'.canonicalize(),
                modifier_func(stats) {
                    return stats.force += 1;
                }
           },
           {
                name: "General Hux",
                id: 180,
                slot: "Crew",
                points: 10,
                unique: true,
                faction: "First Order",
                restriction_func(ship) {
                    let needle;
                    return (needle = "Coordinate", Array.from(ship.effectiveStats().actions).includes(needle));
                }
           },
           {
                name: "Fanatical",
                id: 181,
                slot: "Talent",
                points: 2,
                faction: "First Order"
           },
           {
                name: "Special Forces Gunner",
                id: 182,
                slot: "Gunner",
                points: 10,
                faction: "First Order",
                ship: "TIE/SF Fighter"
           },
           {
                name: "Captain Phasma",
                id: 183,
                slot: "Crew",
                unique: true,
                points: 5,
                faction: "First Order"
           },
           {
                name: "Supreme Leader Snoke",
                id: 184,
                slot: "Crew",
                unique: true,
                points: 13,
                force: 1,
                faction: "First Order",
                restriction_func(ship, upgrade_obj) {
                    return ship.hasAnotherUnoccupiedSlotLike(upgrade_obj);
                },
                validation_func(ship, upgrade_obj) {
                    return upgrade_obj.occupiesAnotherUpgradeSlot();
                },
                also_occupies_upgrades: [ "Crew" ],
                modifier_func(stats) {
                    return stats.force += 1;
                }
           },
           {
                name: "Hyperspace Tracking Data",
                id: 185,
                slot: "Tech",
                faction: "First Order",
                points: 2,
                restriction_func(ship) {
                    return (ship.data.large != null);
                }
           },
           {
                name: "Advanced Optics",
                id: 186,
                slot: "Tech",
                points: 4
           },
           {
                name: "Rey",
                id: 187,
                slot: "Gunner",
                points: 14,
                unique: true,
                force: 1,
                faction: "Resistance",
                modifier_func(stats) {
                    return stats.force += 1;
                }
           },
           {
                name: "Chewbacca (Resistance)",
                id: 188,
                slot: "Crew",
                points: 5,
                charge: 2,
                unique: true,
                faction: "Resistance"
           },
           {
                name: "Paige Tico",
                id: 189,
                slot: "Gunner",
                points: 7,
                unique: true,
                faction: "Resistance"
           },
           {
                name: "R2-HA",
                id: 190,
                slot: "Astromech",
                points: 4,
                unique: true,
                faction: "Resistance"
           },
           {
                name: "C-3PO (Resistance)",
                id: 191,
                slot: "Crew",
                points: 6,
                unique: true,
                faction: "Resistance",
                modifier_func(stats) {
                    if (!Array.from(stats.actions).includes('Calculate')) { stats.actions.push('Calculate'); }
                    if (!Array.from(stats.actionsred).includes('Coordinate')) { return stats.actionsred.push('Coordinate'); }
                }
           },
           {
                name: "Han Solo (Resistance)",
                id: 192,
                slot: "Crew",
                points: 6,
                unique: true,
                faction: "Resistance",
                modifier_func(stats) {
                    if (!Array.from(stats.actionsred).includes('Evade')) { return stats.actionsred.push('Evade'); }
                }
           },
           {
                name: "Rey's Millenium Falcon",
                id: 193,
                slot: "Title",
                points: 5,
                unique: true,
                ship: "Scavenged YT-1300",
                faction: "Resistance"
           },
           {
                name: "Petty Officer Thanisson",
                id: 194,
                slot: "Crew",
                points: 4,
                unique: true,
                faction: "First Order"
           },
           {
                name: "BB-8",
                id: 195,
                slot: "Astromech",
                points: 8,
                charge: 2,
                unique: true,
                faction: "Resistance"
           },
           {
                name: "BB Astromech",
                id: 196,
                slot: "Astromech",
                points: 5,
                charge: 2,
                faction: "Resistance"
           },
           {
                name: "M9-G8",
                id: 197,
                slot: "Astromech",
                points: 7,
                unique: true,
                faction: "Resistance"
           },
           {
                name: "Ferrosphere Paint",
                id: 198,
                slot: "Tech",
                points: 6,
                faction: "Resistance"
           },
           {
                name: "Brilliant Evasion",
                id: 199,
                slot: "Force",
                points: 0
           },
           {
                name: "Calibrated Laser Targeting",
                id: 200,
                slot: "Configuration",
                ship: "Delta-7 Aethersprite",
                points: 0,
                unequips_upgrades: [ "Modification" ],
                also_occupies_upgrades: [ "Modification" ]
           },
           {
                name: "Delta-7B",
                id: 201,
                slot: "Configuration",
                ship: "Delta-7 Aethersprite",
                points: 0,
                modifier_func(stats) {
                    stats.attack += 1;
                    stats.agility += -1;
                    return stats.shields += 2;
                }
           },
           {
                name: "Biohexacrypt Codes",
                id: 202,
                slot: "Tech",
                points: 1,
                faction: "First Order",
                restriction_func(ship) {
                    let needle, needle1;
                    return (needle = "Lock", Array.from(ship.effectiveStats().actions).includes(needle)) || (needle1 = "Lock", Array.from(ship.effectiveStats().actionsred).includes(needle1));
                }
           },
           {
                name: "Predictive Shot",
                id: 203,
                slot: "Force",
                points: 4
           },
           {
                name: "Hate",
                id: 204,
                slot: "Force",
                points: 3
           },
           {
                name: "R5-X3",
                id: 205,
                slot: "Astromech",
                faction: "Resistance",
                charge: 2,
                points: 5
           },
           {
                name: "Pattern Analyzer",
                id: 206,
                slot: "Tech",
                points: 5
           }


    ],


        conditionsById: [
            {
                name: 'Zero Condition',
                id: 0
            },
            {
                name: 'Suppressive Fire',
                id: 1,
                unique: true
            },
            {
                name: 'Hunted',
                id: 2,
                unique: true
            },
            {
                name: 'Listening Device',
                id: 3,
                unique: true
            },
            {
                name: 'Optimized Prototype',
                id: 4,
                unique: true
            },
            {
                name: 'I\'ll Show You the Dark Side',
                id: 5,
                unique: true
            },
            {
                name: 'Proton Bomb',
                id: 6
            },
            {
                name: 'Seismic Charge',
                id: 7
            },
            {
                name: 'Bomblet',
                id: 8
            },
            {
                name: 'Loose Cargo',
                id: 9
            },
            {
                name: 'Conner Net',
                id: 10
            },
            {
                name: 'Proximity Mine',
                id: 11
            }
        ]
    })
;



exportObj.setupCardData = function(basic_cards, pilot_translations, upgrade_translations, condition_translations) {
    // assert that each ID is the index into BLAHById (should keep this, in general)
    let card, condition, condition_data, condition_name, e, field, i, name, pilot, pilot_data, pilot_name, source, translation, translations, upgrade, upgrade_data, upgrade_name;
    for (i = 0; i < basic_cards.pilotsById.length; i++) {
        pilot_data = basic_cards.pilotsById[i];
        if (pilot_data.id !== i) {
            throw new Error(`ID mismatch: pilot at index ${i} has ID ${pilot_data.id}`);
        }
    }
    for (i = 0; i < basic_cards.upgradesById.length; i++) {
        upgrade_data = basic_cards.upgradesById[i];
        if (upgrade_data.id !== i) {
            throw new Error(`ID mismatch: upgrade at index ${i} has ID ${upgrade_data.id}`);
        }
    }
    for (i = 0; i < basic_cards.conditionsById.length; i++) {
        condition_data = basic_cards.conditionsById[i];
        if (condition_data.id !== i) {
            throw new Error(`ID mismatch: condition at index ${i} has ID ${condition_data.id}`);
        }
    }

    exportObj.pilots = {};
    // Assuming a given pilot is unique by name...
    for (pilot_data of Array.from(basic_cards.pilotsById)) {
        if (pilot_data.skip == null) {
            pilot_data.sources = [];
            if (pilot_data.canonical_name == null) { pilot_data.canonical_name = pilot_data.name.canonicalize(); }
            exportObj.pilots[pilot_data.name] = pilot_data;
        }
    }
    // pilot_name is the English version here as it's the common index into
    // basic card info
                
    exportObj.upgrades = {};
    for (upgrade_data of Array.from(basic_cards.upgradesById)) {
        if (upgrade_data.skip == null) {
            upgrade_data.sources = [];
            if (upgrade_data.canonical_name == null) { upgrade_data.canonical_name = upgrade_data.name.canonicalize(); }
            exportObj.upgrades[upgrade_data.name] = upgrade_data;
        }
    }

    exportObj.conditions = {};
    for (condition_data of Array.from(basic_cards.conditionsById)) {
        if (condition_data.skip == null) {
            condition_data.sources = [];
            if (condition_data.canonical_name == null) { condition_data.canonical_name = condition_data.name.canonicalize(); }
            exportObj.conditions[condition_data.name] = condition_data;
        }
    }

    for (let ship_name in basic_cards.ships) {
        const ship_data = basic_cards.ships[ship_name];
        if (ship_data.canonical_name == null) { ship_data.canonical_name = ship_data.name.canonicalize(); }
        ship_data.sources = [];
    }

    // Set sources from manifest
    for (let expansion in exportObj.manifestByExpansion) {
        // console.log(exportObj.manifestByExpansion)
        const cards = exportObj.manifestByExpansion[expansion];
        for (card of Array.from(cards)) {
            if (card.skipForSource) { continue; } // heavy scyk special case :(
            try {
                switch (card.type) {
                    case 'pilot':
                        exportObj.pilots[card.name].sources.push(expansion);
                        break;
                    case 'upgrade':
                        exportObj.upgrades[card.name].sources.push(expansion);
                        break;
                    case 'ship':
                        exportObj.ships[card.name].sources.push(expansion);
                        break;
                    default:
                        throw new Error(`Unexpected card type ${card.type} for card ${card.name} of ${expansion}`);
                }
            } catch (error) {
                e = error;
                console.log(e);
                console.error(`Error adding card ${card.name} (${card.type}) from ${expansion}`);
            }
        }
    }


    for (name in exportObj.pilots) {
        card = exportObj.pilots[name];
        card.sources = card.sources.sort();
    }
    for (name in exportObj.upgrades) {
        card = exportObj.upgrades[name];
        card.sources = card.sources.sort();
    }

    exportObj.expansions = {};

    exportObj.pilotsById = {};
    for (pilot_name in exportObj.pilots) {
        pilot = exportObj.pilots[pilot_name];
        exportObj.fixIcons(pilot);
        exportObj.pilotsById[pilot.id] = pilot;
        for (source of Array.from(pilot.sources)) {
            if (!(source in exportObj.expansions)) { exportObj.expansions[source] = 1; }
        }
    }
    if (Object.keys(exportObj.pilotsById).length !== Object.keys(exportObj.pilots).length) {
        throw new Error("At least one pilot shares an ID with another");
    }

    exportObj.pilotsByFactionCanonicalName = {};
    // uniqueness can't be enforced just be canonical name, but by the base part
    exportObj.pilotsByUniqueName = {};
    for (pilot_name in exportObj.pilots) {
        var base, name1;
        pilot = exportObj.pilots[pilot_name];
        (((base = exportObj.pilotsByFactionCanonicalName[pilot.faction] != null ? exportObj.pilotsByFactionCanonicalName[pilot.faction] : (exportObj.pilotsByFactionCanonicalName[pilot.faction] = {})))[pilot.canonical_name] != null ? base[pilot.canonical_name] : (base[pilot.canonical_name] = [])).push(pilot);
        (exportObj.pilotsByUniqueName[name1 = pilot.canonical_name.getXWSBaseName()] != null ? exportObj.pilotsByUniqueName[name1] : (exportObj.pilotsByUniqueName[name1] = [])).push(pilot);
    }

    exportObj.pilotsByFactionXWS = {};
    for (pilot_name in exportObj.pilots) {
        var base1;
        pilot = exportObj.pilots[pilot_name];
        (((base1 = exportObj.pilotsByFactionXWS[pilot.faction] != null ? exportObj.pilotsByFactionXWS[pilot.faction] : (exportObj.pilotsByFactionXWS[pilot.faction] = {})))[pilot.xws] != null ? base1[pilot.xws] : (base1[pilot.xws] = [])).push(pilot);
    }
        

    exportObj.upgradesById = {};
    for (upgrade_name in exportObj.upgrades) {
        upgrade = exportObj.upgrades[upgrade_name];
        exportObj.fixIcons(upgrade);
        exportObj.upgradesById[upgrade.id] = upgrade;
        for (source of Array.from(upgrade.sources)) {
            if (!(source in exportObj.expansions)) { exportObj.expansions[source] = 1; }
        }
    }
    if (Object.keys(exportObj.upgradesById).length !== Object.keys(exportObj.upgrades).length) {
        throw new Error("At least one upgrade shares an ID with another");
    }

    exportObj.upgradesBySlotCanonicalName = {};
    exportObj.upgradesBySlotXWSName = {};
    exportObj.upgradesBySlotUniqueName = {};
    for (upgrade_name in exportObj.upgrades) {
        upgrade = exportObj.upgrades[upgrade_name];
        (exportObj.upgradesBySlotCanonicalName[upgrade.slot] != null ? exportObj.upgradesBySlotCanonicalName[upgrade.slot] : (exportObj.upgradesBySlotCanonicalName[upgrade.slot] = {}))[upgrade.canonical_name] = upgrade;
        (exportObj.upgradesBySlotXWSName[upgrade.slot] != null ? exportObj.upgradesBySlotXWSName[upgrade.slot] : (exportObj.upgradesBySlotXWSName[upgrade.slot] = {}))[upgrade.xws] = upgrade;
        (exportObj.upgradesBySlotUniqueName[upgrade.slot] != null ? exportObj.upgradesBySlotUniqueName[upgrade.slot] : (exportObj.upgradesBySlotUniqueName[upgrade.slot] = {}))[upgrade.canonical_name.getXWSBaseName()] = upgrade;
    }

    exportObj.conditionsById = {};
    for (condition_name in exportObj.conditions) {
        condition = exportObj.conditions[condition_name];
        exportObj.fixIcons(condition);
        exportObj.conditionsById[condition.id] = condition;
        for (source of Array.from(condition.sources)) {
            if (!(source in exportObj.expansions)) { exportObj.expansions[source] = 1; }
        }
    }
    if (Object.keys(exportObj.conditionsById).length !== Object.keys(exportObj.conditions).length) {
        throw new Error("At least one condition shares an ID with another");
    }

    exportObj.conditionsByCanonicalName = {};
    for (condition_name in exportObj.conditions) {
        condition = exportObj.conditions[condition_name];
        (exportObj.conditionsByCanonicalName != null ? exportObj.conditionsByCanonicalName : (exportObj.conditionsByCanonicalName = {}))[condition.canonical_name] = condition;
    }

    exportObj.expansions = Object.keys(exportObj.expansions).sort();

    for (upgrade_name in upgrade_translations) {
        translations = upgrade_translations[upgrade_name];
        exportObj.fixIcons(translations);
        for (field in translations) {
            translation = translations[field];
            try {
                exportObj.upgrades[upgrade_name][field] = translation;
            } catch (error1) {
                e = error1;
                console.error(`Cannot find translation for attribute ${field} for upgrade ${upgrade_name}`);
                throw e;
            }
        }
    }

    for (condition_name in condition_translations) {
        translations = condition_translations[condition_name];
        exportObj.fixIcons(translations);
        for (field in translations) {
            translation = translations[field];
            try {
                exportObj.conditions[condition_name][field] = translation;
            } catch (error2) {
                e = error2;
                console.error(`Cannot find translation for attribute ${field} for condition ${condition_name}`);
                throw e;
            }
        }
    }

    return (() => {
        const result = [];
        for (pilot_name in pilot_translations) {
            translations = pilot_translations[pilot_name];
            exportObj.fixIcons(translations);
            result.push((() => {
                const result1 = [];
                for (field in translations) {
                    translation = translations[field];
                    try {
                        result1.push(exportObj.pilots[pilot_name][field] = translation);
                    } catch (error3) {
                        e = error3;
                        console.error(`Cannot find translation for attribute ${field} for pilot ${pilot_name}`);
                        throw e;
                    }
                }
                return result1;
            })());
        }
        return result;
    })();
};

exportObj.fixIcons = function(data) {
    if (data.text != null) {
        return data.text = data.text
            .replace(/%ASTROMECH%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-astromech"></i>')
            .replace(/%BULLSEYEARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-bullseyearc"></i>')
            .replace(/%GUNNER%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-gunner"></i>')
            .replace(/%SINGLETURRETARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-singleturretarc"></i>')
            .replace(/%FRONTARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-frontarc"></i>')
            .replace(/%REARARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reararc"></i>')
            .replace(/%LEFTARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-leftarc"></i>')
            .replace(/%RIGHTARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-rightarc"></i>')
            .replace(/%ROTATEARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-rotatearc"></i>')
            .replace(/%FULLFRONTARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-fullfrontarc"></i>')
            .replace(/%FULLREARARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-fullreararc"></i>')
            .replace(/%DEVICE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-device"></i>')
            .replace(/%MODIFICATION%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-modification"></i>')
            .replace(/%RELOAD%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reload"></i>')
            .replace(/%CONFIG%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-config"></i>')
            .replace(/%TALENT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-talent"></i>')
            .replace(/%FORCE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-forcecharge"></i>')
            .replace(/%CHARGE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-charge"></i>')
            .replace(/%CALCULATE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-calculate"></i>')
            .replace(/%BANKLEFT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-bankleft"></i>')
            .replace(/%BANKRIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-bankright"></i>')
            .replace(/%BARRELROLL%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-barrelroll"></i>')
            .replace(/%BOMB%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-bomb"></i>')
            .replace(/%BOOST%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-boost"></i>')
            .replace(/%CANNON%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-cannon"></i>')
            .replace(/%CARGO%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-cargo"></i>')
            .replace(/%CLOAK%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-cloak"></i>')
            .replace(/%COORDINATE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-coordinate"></i>')
            .replace(/%CRIT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-crit"></i>')
            .replace(/%CREW%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-crew"></i>')
            .replace(/%DUALCARD%/g, '<span class="card-restriction">Dual card.</span>')
            .replace(/%ELITE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-elite"></i>')
            .replace(/%EVADE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-evade"></i>')
            .replace(/%FOCUS%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-focus"></i>')
            .replace(/%HARDPOINT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-hardpoint"></i>')
            .replace(/%HIT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-hit"></i>')
            .replace(/%ILLICIT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-illicit"></i>')
            .replace(/%JAM%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-jam"></i>')
            .replace(/%KTURN%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-kturn"></i>')
            .replace(/%MISSILE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-missile"></i>')
            .replace(/%RECOVER%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-recover"></i>')
            .replace(/%REINFORCE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reinforce"></i>')
            .replace(/%SALVAGEDASTROMECH%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-salvagedastromech"></i>')
            .replace(/%SLAM%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-slam"></i>')
            .replace(/%SLOOPLEFT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-sloopleft"></i>')
            .replace(/%SLOOPRIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-sloopright"></i>')
            .replace(/%STRAIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-straight"></i>')
            .replace(/%STOP%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-stop"></i>')
            .replace(/%SENSOR%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-sensor"></i>')
            .replace(/%LOCK%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-lock"></i>')
            .replace(/%TEAM%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-team"></i>')
            .replace(/%TECH%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-tech"></i>')
            .replace(/%TORPEDO%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-torpedo"></i>')
            .replace(/%TROLLLEFT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-trollleft"></i>')
            .replace(/%TROLLRIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-trollright"></i>')
            .replace(/%TURNLEFT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-turnleft"></i>')
            .replace(/%TURNRIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-turnright"></i>')
            .replace(/%TURRET%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-turret"></i>')
            .replace(/%UTURN%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-kturn"></i>')
            .replace(/%LARGESHIPONLY%/g, '<span class="card-restriction">Large ship only.</span>')
            .replace(/%SMALLSHIPONLY%/g, '<span class="card-restriction">Small ship only.</span>')
            .replace(/%REBELONLY%/g, '<span class="card-restriction">Rebel only.</span>')
            .replace(/%IMPERIALONLY%/g, '<span class="card-restriction">Imperial only.</span>')
            .replace(/%SCUMONLY%/g, '<span class="card-restriction">Scum only.</span>')
            .replace(/%LIMITED%/g, '<span class="card-restriction">Limited.</span>')
            .replace(/%LINEBREAK%/g, '<br /><br />');
    }
};
            
exportObj.canonicalizeShipNames = card_data =>
    (() => {
        const result = [];
        for (let ship_name in card_data.ships) {
            const ship_data = card_data.ships[ship_name];
            result.push(ship_data.canonical_name != null ? ship_data.canonical_name : (ship_data.canonical_name = ship_data.name.canonicalize()));
        }
        return result;
    })()
;

exportObj.renameShip = (name, new_name) => exportObj.ships[name].display_name = new_name;

exportObj.randomizer = function(faction_name, points) {
    let listcount;
    const shiplistmaster = exportObj.basicCardData; //export ship database
    return listcount = 0; //start count at 0
};
    //for shiplistmaster in shiplistmaster.pilotsbyid.faction == faction_name loop grab pilots by faction
        //if Math.random() >= 0.9
        //append.shiplistmaster.pilotsbyid.xws ? shiplistmaster.pilotsbyid.canonical_name ? shiplistmaster.pilotsbyid.name.canonicalize())    
            
        
    
    
