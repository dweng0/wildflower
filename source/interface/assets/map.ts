import * as BABYLON from 'babylonjs';

export interface Map {
      name: string;
      groundMesh: BABYLON.Mesh;
      skyMesh: BABYLON.Mesh;
      activePlayers: number;
      description: string;
      redStartingPointX: number;
      redStartingPointY: number;
      redStartingPointZ: number;
      blueStartingPointX: number;
      blueStartingPointY: number;
      blueStartingPointZ: number;
}