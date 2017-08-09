import * as BABYLON from 'babylonjs';
import {IPhysics} from '../physics';
export interface Map {
      name: string;
      width: number;
      height: number;
      subDivisions: number;
      groundMesh: BABYLON.Mesh;
      physics: IPhysics;
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