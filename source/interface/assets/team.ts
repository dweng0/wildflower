import {Player} from './player';
import {Faction} from './faction';

export interface Team {
    id: string;
    name: string;
    /**
     * The teams level
     */
    level: number;
    faction: Faction;
    players: Array<Player>;
}