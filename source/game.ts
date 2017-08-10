import * as BABYLON from 'babylonjs';
import { DomHandler } from './preloader/dom';
import { AssetsManager } from './core/assetsmanager';
import { StatisticsHandler } from './core/statisticshandler';
import { Interface } from './core/interface';
import { Stage } from './core/stage';
import { Input } from './core/userinput';
import { PipeStream } from './core/pipestream';
import { Campaign } from './interface/assets/campaign';

import { UrlManifest } from './interface/urlmanifest';

/**
 * @classdesc Ahh the trusty game class, the puppeteer pulling all the strings, the functions have been placed in the order that they are called, but essentially, this loads other classes and waits for their response before continuing onto the next function
 */
export class Game {
      private _campaignId
      private _url: string = "/game";
      private _engine: BABYLON.Engine;
      private _statisticsHandler: StatisticsHandler;
      private _debug: true;
      private _stage: Stage;
      private _stream: PipeStream;

      _canvas: HTMLCanvasElement;
      _assetsManager: AssetsManager;
      _interface: Interface;

      input: Input;

      /**
      * Life cycle functions that can be overridden
      */
      public onBeforeLoad: () => any;
      public onBeforeBabylonLoad: () => any;
      public onBeforeAssetsLoad: () => any;
      public onBeforeLoadGameData: () => any;
      public onReady: () => any;

      /**
      * Event functions that can be overridden
      */
      public ifAssetsFailedToLoad: (errors: Array<string>) => any;
      public ifBabylonFailedToLoad: (errors: Array<string>) => any;
      public ifInterfaceFailedToLoad: (errors: Array<string>) => any;

      /**
       * Set up member variables
       * @param campaignId {number} the campaing instance id used for loading map assets and players
       * @param canvasId {string} the canvas element id string
       */
      constructor(campaignId: string, canvasId?: string) {
            let domHandler = new DomHandler(canvasId);
            this._canvas = domHandler.getCanvas();
            this._interface = new Interface(this._url, campaignId);
            this._campaignId = campaignId;
            this._stream = new PipeStream();
            this.input = new Input(this._stream);
            this._statisticsHandler = new StatisticsHandler();
            this.ifAssetsFailedToLoad = () => { console.log('stub function ifAssetsFailedToLoad') }
            this.ifBabylonFailedToLoad = () => { console.log('stub function ifBabylonFailedToLoad') }
            this.ifInterfaceFailedToLoad = () => { console.log('stub function ifInterfaceFailedToLoad') }
      }

      /**
       * Starts us off... calls the load function and handles the success (by calling onLoadBabylon) or error (by calling handleLoadingLifecycleError)
       */
      start(): void {
            console.log('starting...');
            this.load().then((manifest: any) => { this.onBeginLoadGameData(manifest) }).catch((reasons) => {
                  console.log('Interface failed to load');
                  this.handleLoadingLifecycleError(this.ifInterfaceFailedToLoad, reasons);
            });
      }

      /**
       * Promise does some pre babylon loading errands, like fetching the game instance manifest, uses the onBeforeLoad function if it is set. Returns a promise
       * @return {Promise}
       */
      load(): Promise<boolean> {
            if (this.onBeforeLoad) {
                  this.onBeforeLoad();
            }
            console.log('loading started');
            return new Promise<boolean>((resolve, reject) => {
                  this._interface.fetchManifest((response: any) => {
                        resolve(JSON.parse(response.entity));
                  }, (err) => { reject(err.error) });
            });
      }

      onBeginLoadGameData(manifest: UrlManifest) {
            console.log('loading game data');
            this.onLoadGameData(manifest)
                  .then((campaign: Campaign) => {
                        this.onLoadBabylon(manifest, campaign);
                  })
                  .catch((reason) => {
                        console.log("Game data loading failed");
                        this.handleLoadingLifecycleError(null, reason);
                  });
      }

      onLoadGameData(manifest: UrlManifest): Promise<any> {
            if (this.onBeforeLoadGameData) {
                  this.onBeforeLoadGameData();
            }
            return this._statisticsHandler.loadCampaign(manifest, this._campaignId);
      }


      /**
       * If the load promise was successful this function is called, does some more promisy stuff, but this time we have the url manifest from the previous promise.
       * This function sets the scene for other classes that need it (now that its loaded) and attempts to set up the assets manager (a wrapper around the babylon assetsmanager class). If it succeeds it calls onBeginLoadAssets, if it fails it calls 'handleLoadingLifecycleError'
       * @param manifest {UrlManifest}
       */
      onLoadBabylon(manifest: UrlManifest, campaign: Campaign ) {
            console.log('loading babylon files');
            this.loadBabylon(manifest, campaign).then(() => {
                  // at this point we have the scene, so we can set up the assets manager
                  this._assetsManager = new AssetsManager(manifest, this._stage.getScene(), campaign);

                  // and apply the scene to other classes that need it
                  this.input.setScene(this._stage.getScene());
                  this.onBeginLoadAssets(manifest, campaign);
            }).catch((reasons) => {
                  console.log('Babylon loading failed');
                  this.handleLoadingLifecycleError(this.ifAssetsFailedToLoad, reasons);
            });
      }

      /**
       * Sets up babylon in the stage class
       * @see Stage
       * @param manifest {UrlManifest} contains urls for loading componentsin other classes
       */
      loadBabylon(manifest: UrlManifest, campaign: Campaign): Promise<Array<string>> {
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
       * Have an instance of the assets manager set up, have BABYLON set up, now its time to get assets for this game... Calls load assets, handles success (calls onBeginLoadGameData) and failure (calls handleLoadingLifecycleError)
       * @param manifest {UrlManifest}
       */
      onBeginLoadAssets(manifest: UrlManifest, campaign: Campaign) {
            console.log('loading assets');
            this.loadAssets(campaign).then(() => { this.onLoaded(manifest, campaign) }).catch((reasons) => {
                  console.log('Asset loading failed');
                  this.handleLoadingLifecycleError(this.ifAssetsFailedToLoad, reasons);
            });
      };

      /**
       * starts the asset loading process and returns a promise (success or failure).
       * calls the optional function onBeforeAssetsLoad
       * @returns {promise<boolean>}
       */
      loadAssets(campaign: Campaign): Promise<boolean> {
            if (this.onBeforeAssetsLoad) {
                  this.onBeforeAssetsLoad();
            }

            return new Promise<boolean>((resolve, reject) => {
                  if (!this._interface.manifest) {
                        reject("No Manifest found");
                  }
                  this._assetsManager.loadInstanceAssets(this._engine).then(() => { resolve() }).catch((reason) => {
                        console.log("Assets manager failed.")
                        this.ifAssetsFailedToLoad(reason);
                        reject(reason)
                  });
            });
      }

      /**
       * At this point, all assets (textures, meshes, stats for physics ect) have been loaded and we can start the engine
       * @todo tell server we are ready and wait for it to tell us to start the engine.
       * @param callback {function}
       */
      onLoaded(manifest: UrlManifest, campaign: Campaign): void {
            console.log('finished loading');
            if (this.onReady) {
                  this.onReady();
            }
            this._stage.pipeUserInput(this._stream);
            this._stage.setThisPlayer(manifest.playerUsername, campaign);
            this.input.onCharacterReady(this._stage.getCharacter())
            this._engine.runRenderLoop(() => {
                  this._stage.showTime();
            });
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

      handleLoadingLifecycleError(eventFn: (errors?: any) => any, errors: Array<string>) {
            this._engine.loadingUIText = this.buildErrorMessage(errors);

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
      buildErrorMessage(errors: any): string {
            let message = "Landing Aborted";
            throw new Error(errors);
      }
}

let game = new Game("12", 'renderCanvas');
window.addEventListener('DOMContentLoaded', () => {
      game.start();
});

document.body.addEventListener("mousedown", (e) => {
      console.log("CLICK");
      game.input.onMouseInput(e);
}),

document.body.addEventListener("mousemove", (e) => {
      if (e.which === 1) {
            game.input.onMouseInput(e);
      }
})
window.addEventListener("keydown", (e) => {
      game.input.onKeyboardInput(e);
});
window.addEventListener("wheel", (e) => {
      game.input.onMouseScroll(e);
})