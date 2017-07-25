import * as BABYLON from 'babylonjs';
import { DomHandler } from './dom';

/**
 * Focus on loading game assets
 */
export class Loader {
      constructor() {}

      loadInstanceAssets(loadingText: string, scene: BABYLON.Scene, campaign: Campaign, onSuccess: any, onFail: any) {
            var errors = new Array<string>();
            this._assets = new BABYLON.AssetsManager(scene);

            this._loadingText = loadingText;
            this._loadingText = "Distance to touchdown 9000km";

            this.getMapAssets(scene, campaign, errors);
            this.getInstancePlayerAssets(scene, campaign, errors);
            this.getOtherPlayerAssets(scene, campaign, errors);

            if (errors.length > 0) {
                  onFail(errors);
            }
            else {
                  this._loadingText = "Distance to touchdown 3000km";
                  this._assets.onFinish = onSuccess;
            }
      }
}