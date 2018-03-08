import {ITextureSet} from './texturemanifest';
import {IAbility, EtackDepletesOn} from './ability';
import {IPhysics} from '../physics';




export interface ICommandeAbility extends IAbility {
    id: number;
    levelAvailable: number;
    damgerOverTimeTick?: number;
    damagePerTick?: number;
    criticalHitChange: number;
    stackBuff: number;
    stackDepletesOn: EtackDepletesOn;

}
/// <summary>
/// The commander class contains all the base stats as well as combat stats and assets for rendering in WEBGL
/// It has a one to many relatinship with commander abilities, these abilities are then applied on top of stats the user currently has.
/// </summary>
export interface ICommander {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
    assetsUrl: string;
    baseHealth: number;
    baseShield: number;
    basePower: number;
    baseSpeed: number;
    baseAgility: number;
    level: number;
    experiencePoints: number;
    levelUpMultiplier: number;
    mesh: any;
    physics: IPhysics;
    abilities: Array<ICommandeAbility>;
    width: number;
    height: number;
}