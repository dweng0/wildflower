import {PlayerStats} from './playerstats';
import {Commander} from './commander';
import {Asset} from './asset';

export interface Player {
      id: number;
      stats: PlayerStats;
      username: string;
      commander: Commander
      x: number;
      y: number;
      z: number;
}