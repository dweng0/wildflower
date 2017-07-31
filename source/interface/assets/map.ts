import {Asset} from './asset';

export interface Map {
      name: string;
      activePlayers: number;
      assets: Array<Asset>;
      description: string;
      assetUrl: string;
      redStartingPointX: number;
      redStartingPointY: number;
      redStartingPointZ: number;
      blueStartingPointX: number;
      blueStartingPointY: number;
      blueStartingPointZ: number;
}