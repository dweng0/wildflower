/**
 * TODO add stats boosters
 */
export interface Faction {
      id: number;
      name: string;
      imgUrl: string;
      factionAbilities: any;
      timespicked: number;
      wins: number;
      losses: number;
      description: string;
      winPercentage: number;
}