import * as WebRequest from 'rest';
import * as mime from 'rest/interceptor/mime';
import {UrlManifest} from '../interface/urlmanifest';

/** dummy data */
import {DummyManifestData} from '../../test/data/urlmanifest';

/**
 * Handles the loading of files for the game, does not handle web sockets or real time streams
 */
export class Interface {
      private _testSuccessURL = "foo.com";
      private _testFailUrl = "bar.com";
      private _testMode: boolean = false;
      _handShakeUrl: string;
      _manifestUrl: string;
      manifest: UrlManifest;
     constructor(url: string, campaignId: string, testMode?: boolean) {
      this._manifestUrl = url + "/manifest/" + campaignId;
      this._testMode = testMode;
      if (this._handShakeUrl === null) {
            throw new Error("No handshake url provided");
      }
     }

     /**
      * check the server exists, also sets the manifest url, to get manifest data.
      */
     handshake(callback: (data: any) => any, errCall?: (data: any) => any): void {
           this.fetch(this._handShakeUrl, (data: any) => {this.setManifestUrl(data.message); callback(data); }, (err) => {
                 if (errCall) {
                        errCall(err);
                  } else {
                        throw new Error(err);
                  }
            });
     }

     /**
      * Returns a url manifest of all urls needed to load the game
      * @param callback {function}
      */
     fetchManifest (callback: (data: UrlManifest) => any, errCall?: (data: any) => any): void {
            if (!this._manifestUrl) {
                  throw new Error("No manifest url found. Handshake with server is requried");
            }
            this.fetch(this._manifestUrl, (data) => {
                  this.manifest = data;
                  callback(data);
            }, (err) => {
                  if (errCall) {
                        errCall(err);
                  }
                  else {
                        throw new Error(err);
                  }
            });
      }

      /**
       * Function makes calls to the server and passes the response back to the appropriate callback functions
       * @param url {string} The url to fetch on
       * @param successCallback {function} the success callback
       * @param errorCallback {function} the error callback
       */
     fetch(url: string, successCallback: (data: any) => any, errorCallback: (data: any) => any) {
            let request;
            if (this._testMode) {
                  if (url === this._testFailUrl) {
                        return errorCallback({message:  "failure test"});
                  }
                  if (this._manifestUrl) {
                        return successCallback(new DummyManifestData());
                  } else if (this._handShakeUrl) {
                         return successCallback({message: "manifesturl.com"});
                  }
            } else {
                  request =  WebRequest(url).then(successCallback).catch(errorCallback);
            }
           return request;
     }

      /**
      * Using the data provided, attempts to set it to our url manifest, we can then use the manifest url whenever we like, to get a list of all the urls needed to load assets into the game
      * @param data {object}
      */
     setManifestUrl (url: string): void {
            this._manifestUrl = url;
     }

}