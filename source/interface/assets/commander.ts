import {ITextureSet} from './texturemanifest';
import {IPhysics} from '../physics';
/// <summary>
/// The commander class contains all the base stats as well as combat stats and assets for rendering in WEBGL
/// It has a one to many relatinship with commander abilities, these abilities are then applied on top of stats the user currently has.
/// </summary>
export interface ICommander {
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
    mesh: any;
    physics: IPhysics;
}