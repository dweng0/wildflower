import { Map } from './map';
import { Team } from './team';
import { GameStatistics } from './gamestatistics';


export interface GameInstance {
    id: number;
    map: Map;
    redTeam: Team;
    blueTeam: Team;
    spectator: Team;
    statistics: GameStatistics;
}