import * as BABYLON from 'babylonjs';
import { DomHandler } from './preloader/dom';
import { AssetsManager } from './core/assetsmanager';
import { Interface } from './core/interface';
import {Stage} from './core/stage';

import {UrlManifest} from './interface/urlmanifest';

export class Game {
      private _url: "http://google.com";
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


      constructor(campaignId: number, canvasId?: string) {
            let domHandler = new DomHandler(canvasId);
            this._canvas = domHandler.getCanvas();
            this._interface = new Interface(this._url);
      }

      start(): void {
            this.load()
                  .then(() => this.loadAssets()
                              .then(() => this.loadBabylon()
                                          .then( () => { this.onLoaded(); })))
                                          .catch( (reason) => {
                                                      console.log('Babylon loading failed');
                                                      this.handleLoadingLifecycleError(this.ifBabylonFailedToLoad, reason);
                                          })
                              .catch((reason) => {
                                    console.log('Asset loading failed');
                                    this.handleLoadingLifecycleError(this.ifAssetsFailedToLoad, reason);
                              })
                  .catch((reason) => {
                        console.log('Interface failed to load');
                        this.handleLoadingLifecycleError(this.ifInterfaceFailedToLoad, reason);
                  });
      }

      render(): void {
            this._stage.debugMode(this._debug);
      }

      hasBabylon(): boolean {
            return (BABYLON) ? true : false;
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
            this.onBeforeLoad();
            return new Promise<boolean>((resolve, reject) => {
                  this._interface.handshake(() => {
                        this._interface.fetchManifest((manifest: UrlManifest) => {
                              resolve();
                        }, (err) => { reject(err)});
                  }, (err) => reject(err));
            });
      }

      loadBabylon(): Promise<Array<string>> {
            this.onBeforeBabylonLoad();
            let errors = new Array<string>();
            return new Promise<Array<string>>((resolve, reject) => {
                  errors.concat(errors, this.setEngine());
                  this._stage = new Stage(this._engine);
                  errors.concat(errors, this._stage.setTheStage(this._canvas));
                  if (errors.length === 0) {
                        resolve(errors);
                  }
                  else {
                        reject(errors);
                  }
            });
      }

      /**
       * starts the asset loading process and returns a promise when complete (success or failure).
       * calls the optional function onBeforeAssetsLoad
       * @returns {promise<boolean>}
       */
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
      onLoaded(): void {
            this.onReady();
      }

      handleLoadingLifecycleError (eventFn: (errors?: any) => any, errors: Array<string>) {
            this._engine.loadingUIText =  this.buildErrorMessage(errors);

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
      buildErrorMessage (errors: Array<string>): string {
            let message = "Landing Aborted";

            errors.forEach((error) => {
                  message += error;
            });
            return message;
      }
}

window.addEventListener('DOMContentLoaded', () => {
      let game = new Game(12, 'renderCanvas');
      game.start();
});

