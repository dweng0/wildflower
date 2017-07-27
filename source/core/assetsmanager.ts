import * as BABYLON from 'babylonjs';
import {UrlManifest} from '../interface/urlmanifest';
export class AssetsManager {
      private _assets: BABYLON.AssetsManager;
      private _manifest: UrlManifest;
      private _scene: BABYLON.Scene;

      loadingText: string;

      constructor(manifest: UrlManifest, scene: BABYLON.Scene) {
            this._manifest = manifest;
            this._scene = scene;
      }

      /**
       * Loads all instance assets for the game
       * @param loadingText {string} the text shown while the game is loading.
       * @returns {Promise}
       */
     loadInstanceAssets(loadingText: string): Promise<Array<string>> {
      return new Promise<Array<string>>((resolve, reject) => {
            let errors = new Array<string>();

            this._assets = new BABYLON.AssetsManager(this._scene);
            loadingText = "Distance to touchdown 3000km";

            let mapLoadingErrors = this.getMapAssets(loadingText, this._scene, this._manifest);
            errors.concat(errors, mapLoadingErrors);

            let playerLoadingErrors = this.getPlayerAssets(loadingText, this._scene, this._manifest);
            errors.concat(errors, playerLoadingErrors);

            if (errors.length > 0) {
                  reject(errors);
            } else {
                  resolve();
            }
      });
     }

     getPlayerAssets(text: string, scene: BABYLON.Scene, manifest: UrlManifest): Array<string> {
      return new Array<string>();
     }

      /**
       * Get the map assets required to load the map
       * @param text {string} The text used to show during game load
       * @param scene {BABYLON.Scene} The scene passed in from the game class
       * @param manifest {UrlManifest} The manifest of urls required to load this game
       * @param errors {Array<string>} The list of errors, if any incurred in this code path.
       */
      getMapAssets(text: string, scene: BABYLON.Scene, manifest: UrlManifest): Array<string> {
            let errors = new Array<string>();
            text = "Distance to touchdown 2700km";

            /** Load ground texture */
            this.loadTexture("Ground texture", manifest.map.texture, () => {text = "Distance to touchdown 2400km"}, () => {errors.push("Failed to load map texture")});

            /** Load height map */
            this.loadImage("heightMap", manifest.map.heightMap, () => {text = "Distance to touchdown 2200km"}, () => {errors.push("Failed to load height map")});

            /** Load sky box */
            let skybox = BABYLON.Mesh.CreateBox("skyBox", 500.0, scene);
            let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);

            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.disableLighting = true;

            skybox.material = skyboxMaterial;

            skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(manifest.map.skybox, scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skybox.renderingGroupId = 0;

            return errors;
      }

      /**
       * Given a set of arguments, attempts to load an image into the assets manager
       * @param taskName string name of the task
       * @param url string the url of where to find the image
       * @param success fn
       * @param fail fn
       */
      loadImage(taskName: string, url: string, success: () => any, fail: () => any) {
            console.log('loading image...', taskName);
            let imageLoader = this._assets.addImageTask(taskName, url);
            imageLoader.onSuccess = success;
            imageLoader.onError = fail;
            return imageLoader;
      }

      /**
      * Given a set of arguments, attempts to load a texture into the assets manage
      */
      loadTexture(taskName: string, url: string, success: () => any, fail: () => any, noMipMap?: boolean, sampling?: boolean) {
            console.log('loading texture...', taskName);
            let textureLoad = this._assets.addTextureTask(taskName, url, noMipMap, sampling);
            textureLoad.onSuccess = success.bind(this);
            textureLoad.onError = fail.bind(this);
            return textureLoad;
      }
}