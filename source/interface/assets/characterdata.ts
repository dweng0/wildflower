import {IPhysics} from '../physics';

export interface ICharacterVisualComponents {
      height: number;
      texture: string;
      width: number;
      physics: IPhysics
}

export interface ICharacterData {
      wheels: ICharacterVisualComponents;
      body: ICharacterVisualComponents;
}