import {Player} from './player';

export interface Team {
    id: string;
    name: string;
    /**
     * The teams level
     */
    level: number;
    players: Array<Player>
}