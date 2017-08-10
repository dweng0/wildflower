import { Team } from './team';
import { Map } from './map';

export interface Campaign {
      id: number;
      notes: string;
      map: Map;
      redTeam: Team;
      blueTeam: Team;
      spectatingTeam: Team;
}