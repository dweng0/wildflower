import { IPhysics } from '../physics';

export interface ICharacterData {
      height: number;
      textureUrl: string;
      width: number;
      physics: IPhysics;
      meshUrl: string;
      meshes: Array<string>;
}