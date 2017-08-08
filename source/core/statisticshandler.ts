import * as WebRequest from 'rest';
import {Campaign} from '../interface/assets/campaign';
import {UrlManifest} from '../interface/urlmanifest';
export class StatisticsHandler {
      private _campaign: Campaign;

      constructor() {

      }

      loadCampaign(manifest: UrlManifest, campaignId: number): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                  WebRequest(manifest.baseUrl + manifest.campaign + "/" + campaignId).then((response: WebRequest.Response) => {
                        this._campaign = <Campaign>response.entity;
                        resolve();
                  }).catch(
                        (reason) => {reject(reason)}
                  );
            });
      }
 }