import {PlayerState} from './playerstate';
import {Asset} from './asset';

export interface PlayerStats {
      state: PlayerState;
      assets: Array<Asset>;
      deaths: number;
      kills: number;
      experience: number;
      gold: number;
      damageDealt: number;
      damageReceived: number;
      healingDealt: number;
}