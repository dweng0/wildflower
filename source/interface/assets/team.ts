import {Player} from './player';

export enum TeamSide {
    red,
    blue,
    spectator
}

export interface Team {
    id: number;
    side: TeamSide;
    name: string;
    players: Array<Player>
}