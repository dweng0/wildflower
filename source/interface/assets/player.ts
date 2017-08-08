import {PlayerStats} from './playerstats';
import {ICommander} from './commander';
import {Asset} from './asset';
import {Faction} from './faction';

/// <summary>
/// The commander class contains all the base stats as well as combat stats and assets for rendering in WEBGL
/// It has a one to many relatinship with commander abilities, these abilities are then applied on top of stats the user currently has.
/// </summary>
export interface Player {
      id: string;
      stats: PlayerStats;
      username: string;
      commander: ICommander
      faction: Faction
      x: number;
      y: number;
      z: number;
}