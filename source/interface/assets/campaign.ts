import { Team } from './team';
import { Map } from './map';

export interface Campaign {
      Id: number;
      Notes: string;
      Map: Map;
      RedTeam: Team;
      BlueTeam: Team;
      SpectatingTeam: Team;
}