import * as WebRequest from 'web-request';
import {UrlManifest, ManifestItem} from '../interface/urlmanifest';

export class Interface {
      _handShakeUrl: string;
      _manifestUrl: string;
     constructor(url: string) {
      this._handShakeUrl = url;

      if (!this._handShakeUrl) {
            throw new Error("No handshake url provided");
      }
     }

     /**
      * check the server exists, also sets the manifest url, to get manifest data.
      */
     handshake(callback: (data: any) => any): void {
           this.fetch(this._handShakeUrl, (data: any) => { this.setManifestUrl(data); callback(data); }, (err) => {throw new Error(err)});
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

     async fetch(url: string, successCallback: (data: any) => any, errorCallback: (data: any) => any) {
            return await WebRequest.get(url).then(successCallback).catch(errorCallback);
     }

     async fetchJSON(url: string, success: () => any, error: () => any) {
           return await WebRequest.json<any>(url).then(success).catch(error);
     }

      /**
      * Using the data provided, attempts to set it to our url manifest, we can then use the manifest url whenever we like, to get a list of all the urls needed to load assets into the game
      * @param data {object}
      */
     setManifestUrl (data: any): void {
       this._manifestUrl = <string>data;
     }

}