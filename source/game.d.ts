import { AssetsManager } from './core/assetsmanager';
import { Interface } from './core/interface';
import { Input } from './core/userinput';
import { Campaign } from './interface/assets/campaign';
import { UrlManifest } from './interface/urlmanifest';
/**
 * @classdesc Ahh the trusty game class, the puppeteer pulling all the strings, the functions have been placed in the order that they are called, but essentially, this loads other classes and waits for their response before continuing onto the next function
 */
export declare class Game {
    private _campaignId;
    private _url;
    private _engine;
    private _statisticsHandler;
    private _debug;
    private _stage;
    private _stream;
    private _transport;
    _canvas: HTMLCanvasElement;
    _assetsManager: AssetsManager;
    _interface: Interface;
    input: Input;
    /**
    * Life cycle functions that can be overridden
    */
    onBeforeLoad: () => any;
    onBeforeBabylonLoad: () => any;
    onBeforeAssetsLoad: () => any;
    onBeforeLoadGameData: () => any;
    onReady: () => any;
    /**
    * Event functions that can be overridden
    */
    ifAssetsFailedToLoad: (errors: Array<string>) => any;
    ifBabylonFailedToLoad: (errors: Array<string>) => any;
    ifInterfaceFailedToLoad: (errors: Array<string>) => any;
    /**
     * Set up member variables
     * @param campaignId {number} the campaing instance id used for loading map assets and players
     * @param canvasId {string} the canvas element id string
     */
    constructor(campaignId: number, canvasId?: string);
    /**
     * Starts us off... calls the load function and handles the success (by calling onLoadBabylon) or error (by calling handleLoadingLifecycleError)
     */
    start(): void;
    /**
     * Promise does some pre babylon loading errands, like fetching the game instance manifest, uses the onBeforeLoad function if it is set. Returns a promise
     * @return {Promise}
     */
    load(): Promise<boolean>;
    onBeginLoadGameData(manifest: UrlManifest): void;
    onLoadGameData(manifest: UrlManifest): Promise<any>;
    /**
     * If the load promise was successful this function is called, does some more promisy stuff, but this time we have the url manifest from the previous promise.
     * This function sets the scene for other classes that need it (now that its loaded) and attempts to set up the assets manager (a wrapper around the babylon assetsmanager class). If it succeeds it calls onBeginLoadAssets, if it fails it calls 'handleLoadingLifecycleError'
     * @param manifest {UrlManifest}
     */
    onLoadBabylon(manifest: UrlManifest, campaign: Campaign): void;
    /**
     * Sets up babylon in the stage class
     * @see Stage
     * @param manifest {UrlManifest} contains urls for loading componentsin other classes
     */
    loadBabylon(manifest: UrlManifest, campaign: Campaign): Promise<Array<string>>;
    /**
     * Have an instance of the assets manager set up, have BABYLON set up, now its time to get assets for this game... Calls load assets, handles success (calls onBeginLoadGameData) and failure (calls handleLoadingLifecycleError)
     * @param manifest {UrlManifest}
     */
    onBeginLoadAssets(manifest: UrlManifest, campaign: Campaign): void;
    /**
     * starts the asset loading process and returns a promise (success or failure).
     * calls the optional function onBeforeAssetsLoad
     * @returns {promise<boolean>}
     */
    loadAssets(campaign: Campaign): Promise<boolean>;
    /**
     * At this point, all assets (textures, meshes, stats for physics ect) have been loaded and we can start the engine
     * @todo tell server we are ready and wait for it to tell us to start the engine.
     * @param callback {function}
     */
    onLoaded(manifest: UrlManifest, campaign: Campaign): void;
    hasBabylon(): boolean;
    /**
     * Loads the babylon engine, returns an array of error messages, if there are no error messages then it was succesfull
     * @returns {Array<string>}
     */
    setEngine(): Array<string>;
    handleLoadingLifecycleError(eventFn: (errors?: any) => any, errors: Array<string>): void;
    /**
     * builds up an error message from a list of error messages
     * @param errors {Array<string>}
     * @returns {string}
     */
    buildErrorMessage(errors: any): string;
}
