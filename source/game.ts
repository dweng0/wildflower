import * as BABYLON from 'babylonjs';
import { DomHandler } from './preloader/dom';
import { AssetsManager } from './core/assetsmanager';
import { Interface } from './core/interface';

import {UrlManifest} from './interface/urlmanifest';

export class Game {
      private _url: "http://google.com";
      private _scene: BABYLON.Scene;
      private _engine: BABYLON.Engine;

      _canvas: HTMLCanvasElement;
      _assetsManager: AssetsManager;
      _interface: Interface;

      onBeforeLoad: () => any;
      onBeforeBabylonLoad: () => any;
      onBeforeAssetsLoad: () => any;

      constructor(campaignId: number, canvasId?: string) {
            let domHandler = new DomHandler(canvasId);
            this._canvas = domHandler.getCanvas();
            this._interface = new Interface(this._url);
      }

      hasBabylon(): boolean {
            return (BABYLON) ? true : false;
      }

      setEngine(): boolean {
            if (!this._canvas) {
                  return false;
            }
            this._engine = new BABYLON.Engine(this._canvas, true);
            this._engine.loadingUIText = "Loading... (assets)";

            window.addEventListener('resize', () => {
                  this._engine.resize();
            });

            return true;
      }

      setScene(): boolean {
            if (!this._engine) {
                  return false;
            }
            this._scene = new BABYLON.Scene(this._engine);
            return true;
      }

      load(): Promise<boolean> {
            this.onBeforeLoad();
            return new Promise<boolean>((resolve, reject) => {
                  this._interface.handshake(() => {
                        this._interface.fetchManifest((manifest: UrlManifest) => {
                              resolve();
                        }, (err) => { reject(err)});
                  }, (err) => reject(err));
            });
      }

      loadBabylon(): Promise<boolean> {
            this.onBeforeBabylonLoad();
            return new Promise<boolean>((resolve, reject) => {
                  let success = false;
                  success = this.setEngine();
                  success = this.setScene();

                  if (success) {
                        resolve(true);
                  }
                  else {
                        reject("Failed to load babylon framework");
                  }
            });
      }

      loadAssets(): Promise<boolean> {
            this.onBeforeAssetsLoad();
            return new Promise<boolean>((resolve, reject) => {
                  if (!this._interface.manifest) {
                      reject("No Manifest found");
                  }
                  this._assetsManager.loadInstanceAssets(this._engine.loadingUIText).then(() => { resolve() }).catch((reason) => { reject(reason)});
            });
      }

      /**
       * At this point, we are ready and waiting of the green light from the server
       * @param callback {function}
       */
      onReady(callback: () => any): void {

      }
}

window.addEventListener('DOMContentLoaded', () => {
      let game = new Game(12, 'renderCanvas');
});

