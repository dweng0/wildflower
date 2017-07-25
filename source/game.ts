import * as BABYLON from 'babylonjs';
import { DomHandler } from './preloader/dom';
import { AssetsManager } from './core/assetsmanager';
import { Interface } from './core/interface';

export class Game {
      _canvas: HTMLCanvasElement;

      _assetsManager: AssetsManager;

      _interface: Interface;

      constructor(canvasId?: string) {
            console.log('Wildflower launched');
            let domHandler = new DomHandler(canvasId);
            this._canvas = domHandler.getCanvas();
      }

      hasBabylon(): boolean {
            return (BABYLON) ? true : false;
      }
}

window.addEventListener('DOMContentLoaded', () => {
      let game = new Game('renderCanvas');
});

