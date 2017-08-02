import * as BABYLON from 'babylonjs';
import { DomHandler } from './preloader/dom';
import { AssetsManager } from './core/assetsmanager';
import { Interface } from './core/interface';
import {Stage} from './core/stage';

import {UrlManifest} from './interface/urlmanifest';

export class Game {
      private _url = "/game";
      private _engine: BABYLON.Engine;
      private _debug: true;
      private _stage: Stage;

      _canvas: HTMLCanvasElement;
      _assetsManager: AssetsManager;
      _interface: Interface;

      /**
      * Life cycle functions that can be overridden
      */
      public onBeforeLoad: () => any;
      public onBeforeBabylonLoad: () => any;
      public onBeforeAssetsLoad: () => any;
      public onReady: () => any;

      /**
      * Event functions that can be overridden
      */
      public ifAssetsFailedToLoad: (errors: Array<string>) => any;
      public ifBabylonFailedToLoad: (errors: Array<string>) => any;
      public ifInterfaceFailedToLoad: (errors: Array<string>) => any;


      constructor(campaignId: string, canvasId?: string) {
            let domHandler = new DomHandler(canvasId);
            this._canvas = domHandler.getCanvas();
            this._interface = new Interface(this._url, campaignId);

            this.ifAssetsFailedToLoad = () => {console.log('stub function ifAssetsFailedToLoad')}
            this.ifBabylonFailedToLoad = () => {console.log('stub function ifBabylonFailedToLoad')}
            this.ifInterfaceFailedToLoad = () => {console.log('stub function ifInterfaceFailedToLoad')}
      }

      onLoadBabylon(manifest: UrlManifest) {
            this.loadBabylon(manifest).then(() => {
                  // at this point we have the scene, so we can set up the assets manager
                  this._assetsManager = new AssetsManager(manifest, this._stage.getScene());
                  this.onBeginLoadAssets(manifest); }).catch((reasons) => {
                  console.log('Babylon loading failed');
                  this.handleLoadingLifecycleError(this.ifAssetsFailedToLoad, reasons);
            });
      }

      onBeginLoadAssets(manifest: UrlManifest) {
            this.loadAssets().then((manifest: any) => {this.onLoaded()}).catch((reasons) => {
                  console.log('Asset loading failed');
                  this.handleLoadingLifecycleError(this.ifAssetsFailedToLoad, reasons);
            });
      };

      start(): void {
            this.load().then((manifest: any) => { this.onLoadBabylon(manifest)}).catch((reasons) => {
                  console.log('Interface failed to load');
                  this.handleLoadingLifecycleError(this.ifInterfaceFailedToLoad, reasons);
            });
      }

      hasBabylon(): boolean {
            return (BABYLON) ? true : false;
      }

      switchCameras(): void {
            return this._stage.switchCameras();
      }

      /**
       * Loads the babylon engine, returns an array of error messages, if there are no error messages then it was succesfull
       * @returns {Array<string>}
       */
      setEngine(): Array<string> {
            let errors = new Array<string>();

            if (!this._canvas) {
                  errors.push("No canvas element could be found to attach the engine to")
            }
            this._engine = new BABYLON.Engine(this._canvas, true);
            this._engine.loadingUIText = "Loading... (assets)";

            window.addEventListener('resize', () => {
                  this._engine.resize();
            });

            return errors;
      }


      load(): Promise<boolean> {
            if (this.onBeforeLoad) {
                  this.onBeforeLoad();
            }

            return new Promise<boolean>((resolve, reject) => {
                  this._interface.fetchManifest((response: any) => {
                        resolve(JSON.parse(response.entity));
                  }, (err) => { reject(err.error)});
            });
      }

      loadBabylon(manifest: UrlManifest): Promise<Array<string>> {
            if (this.onBeforeBabylonLoad) {
                  this.onBeforeBabylonLoad();
            }

            let errors = new Array<string>();
            return new Promise<Array<string>>((resolve, reject) => {
                  errors.concat(errors, this.setEngine());
                  this._stage = new Stage(this._engine, manifest);
                  errors.concat(errors, this._stage.setTheStage(this._canvas));
                  if (errors.length === 0) {
                        resolve(errors);
                  }
                  else {
                        this.ifBabylonFailedToLoad(errors);
                        reject(errors);
                  }
            });
      }

      /**
       * starts the asset loading process and returns a promise (success or failure).
       * calls the optional function onBeforeAssetsLoad
       * @returns {promise<boolean>}
       */
      loadAssets(): Promise<boolean> {
            if (this.onBeforeAssetsLoad) {
                  this.onBeforeAssetsLoad();
            }

            return new Promise<boolean>((resolve, reject) => {
                  if (!this._interface.manifest) {
                      reject("No Manifest found");
                  }
                  this._assetsManager.loadInstanceAssets(this._engine).then(() => { resolve() }).catch((reason) => {
                        this.ifAssetsFailedToLoad(reason);
                        reject(reason)});
            });
      }

      /**
       * At this point, we are ready and waiting of the green light from the server
       * @param callback {function}
       */
      onLoaded(): void {
            if (this.onReady) {
                  this.onReady();
            }

            this._stage.setCameraOnPlayer("sphere1");
            this._engine.runRenderLoop(() => {
                  this._stage.showTime(this._debug);
            });
      }

      handleLoadingLifecycleError (eventFn: (errors?: any) => any, errors: Array<string>) {
            this._engine.loadingUIText =  this.buildErrorMessage(errors);

            if (errors.length === undefined) {
                  errors = new Array<string>();
                  errors.push(<any>errors);
            }

            if (eventFn) {
                  eventFn(errors);
            } else {
                  throw new Error("failed to load");
            }
      }

      /**
       * builds up an error message from a list of error messages
       * @param errors {Array<string>}
       * @returns {string}
       */
      buildErrorMessage (errors: any): string {
            let message = "Landing Aborted";
            throw new Error(errors);
      }
}
let game = new Game("12", 'renderCanvas');
window.addEventListener('DOMContentLoaded', () => {
      game.start();
});

window.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
            case 27:
            {
                  game.switchCameras();
            }
            default: {
                  console.log('key pressed, ', e.keyCode);
            }
      }
});