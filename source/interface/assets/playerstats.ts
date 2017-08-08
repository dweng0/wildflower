import {PlayerState} from './playerstate';

export interface PlayerStats {
      state: PlayerState;
      deaths: number;
      kills: number;
      experience: number;
      gold: number;
      damageDealt: number;
      damageReceived: number;
      healingDealt: number;
      healingRecieved: number;
}