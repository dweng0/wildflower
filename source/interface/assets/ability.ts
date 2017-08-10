 export enum EtackDepletesOn {
    hit, // every hit removes a stack
    timeout // stack depletes after an amount of time
}

export enum ETargeting {
      singleTarget, // must select a target
      groundArea, // must select a ground area to trigger this on
      dropsFromSelf, // drops on current user location
      passiveOnSelf, // is passively applied to self
      passiveOnTarget, // Is applied passively to a target
      passiveOnArea // Is applied passively to a target area
}

export interface IFactionAbility {
      id: number;
}

export interface IAbility {
      id: number;
      name: string;
      description: string;
      taskBarBadgeUrl: string;
      activeBadgeUrl: string;
      aggressive: boolean;
      defensive: boolean;
      targeting: ETargeting;
      areaOfEffectRadius: number; // if set to 0 only effect target

      // should this not be on the commander?
      health: number; // put yourpips into these
      shield: number;
      power: number;
      pips: number;

      kineticDamage: number; // the base number of kinetic damage this ability does
      plasmaDamage: number; // base number of ...
      kineticDefense: number; // base number of ...
      plasmaDefense: number; // base number of ...

      speed: number; // how much this ability improves speed
      agility: number; // how much this ability improves agility
      criticalHit: number; // how much this ability ...
      money: number; // money bonus this ability gives
      experience: number; // how musch this ability ...

      stacks: boolean; // does this ability stack?
      stackLimit: number; // how much can this ablity stack by?

      coolDownTime: number;
      coolDownReducedBy: number;
      duration: number; // if 0, always on

      triggersGlobalCoolDown: boolean;
      isAPercentage: boolean; // if true use the ints as a percentage
      isPassive: boolean;
}