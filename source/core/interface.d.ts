/// <reference types="when" />
import { UrlManifest } from '../interface/urlmanifest';
/**
 * Handles the loading of files for the game, does not handle web sockets or real time streams
 */
export declare class Interface {
    private _testSuccessURL;
    private _testFailUrl;
    private _testMode;
    _handShakeUrl: string;
    _manifestUrl: string;
    manifest: UrlManifest;
    constructor(url: string, campaignId: number, testMode?: boolean);
    /**
     * check the server exists, also sets the manifest url, to get manifest data.
     */
    handshake(callback: (data: any) => any, errCall?: (data: any) => any): void;
    /**
     * Returns a url manifest of all urls needed to load the game
     * @param callback {function}
     */
    fetchManifest(callback: (data: UrlManifest) => any, errCall?: (data: any) => any): void;
    /**
     * Function makes calls to the server and passes the response back to the appropriate callback functions
     * @param url {string} The url to fetch on
     * @param successCallback {function} the success callback
     * @param errorCallback {function} the error callback
     */
    fetch(url: string, successCallback: (data: any) => any, errorCallback: (data: any) => any): When.Promise<any>;
    /**
    * Using the data provided, attempts to set it to our url manifest, we can then use the manifest url whenever we like, to get a list of all the urls needed to load assets into the game
    * @param data {object}
    */
    setManifestUrl(url: string): void;
}
