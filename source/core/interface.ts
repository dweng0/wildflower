import * as WebRequest from 'rest';
import * as mime from 'rest/interceptor/mime';
import {UrlManifest, ManifestItem} from '../interface/urlmanifest';

export class Interface {
      private _testMode: boolean = false;
      _handShakeUrl: string;
      _manifestUrl: string;
     constructor(url: string, testMode?: boolean) {
      this._handShakeUrl = url;
      this._testMode = testMode;
      if (this._handShakeUrl === null) {
            throw new Error("No handshake url provided");
      }
      if (this._testMode) {
            console.log('test mode active');
      }
     }

     /**
      * check the server exists, also sets the manifest url, to get manifest data.
      */
     handshake(callback: (data: any) => any): void {
           this.fetch(this._handShakeUrl, (data: any) => {this.setManifestUrl(data); callback(data); }, (err) => {throw new Error(err)});
     }

     /**
      * Returns a url manifest of all urls needed to load the game
      * @param callback {function}
      */
     fetchManifest (callback: (data: UrlManifest) => any): void {
      if (!this._manifestUrl) {
            throw new Error("No manifest url found. Handshake with server is requried");
      }
      this.fetch(this._manifestUrl, callback, (err) => { throw new Error(err)});
      }

     fetch(url: string, successCallback: (data: any) => any, errorCallback: (data: any) => any) {
            let request;
            if (this._testMode) {
                  let manifest: UrlManifest;
                  manifest.map = "http://test";
                  manifest.handshake = "http://google.com";
                  return successCallback(manifest);
            } else {
                  request =  WebRequest(url).then(successCallback).catch(errorCallback);
            }
           return request;
     }

     async fetchJSON(url: string, success: () => any, error: () => any) {
           let request;
            if (this._testMode) {
                  request = new Promise((success, error) => {
                        success({test: true});
                  });
            } else {
                  request =  WebRequest(url).then(success).catch(success);
            }
           return request;
     }

      /**
      * Using the data provided, attempts to set it to our url manifest, we can then use the manifest url whenever we like, to get a list of all the urls needed to load assets into the game
      * @param data {object}
      */
     setManifestUrl (data: any): void {
       this._manifestUrl = <string>data;
     }

}