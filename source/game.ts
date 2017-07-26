import * as BABYLON from 'babylonjs';
import { DomHandler } from './preloader/dom';
import { AssetsManager } from './core/assetsmanager';
import { Interface } from './core/interface';

export class Game {
      private _url: "http://google.com";
      _canvas: HTMLCanvasElement;

      _assetsManager: AssetsManager;

      _interface: Interface;

      constructor(canvasId?: string) {
            let domHandler = new DomHandler(canvasId);

            this._canvas = domHandler.getCanvas();
            this._assetsManager = new AssetsManager();
            this._interface = new Interface(this._url);
      }

      hasBabylon(): boolean {
            return (BABYLON) ? true : false;
      }

      /**
      * This function should be called before the assets manager is used, here we can focus on handshaking the server getting a manifest and/or instructions about what to load
      * @param callback {function}
      */
      onBeforeLoad(callback: () => any): void {

      }

      /**
      * We have a manifest, we can expect this function to primarily work with the assets manager to load assets
      * @param callback
      */
      onAssetLoad(callback: () => any): void {

      }

      /**
       * By this point, our API interface should be green light, our assets should be loaded and we should be setting up scene/doing babylon stuff
       * @param callback {function}
       */
      onBabylonLoad(callback: () => any): void {

      }

      /**
       * At this point, we are ready and waiting of the green light from the server
       * @param callback {function}
       */
      onReady(callback: () => any): void {

      }
}

window.addEventListener('DOMContentLoaded', () => {
      let game = new Game('renderCanvas');
});

