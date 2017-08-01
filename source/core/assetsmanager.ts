import * as BABYLON from 'babylonjs';
import {UrlManifest} from '../interface/urlmanifest';
export class AssetsManager {
      private _testMode: boolean = false;
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
     loadInstanceAssets(engine: BABYLON.Engine, test?: boolean): Promise<any> {

      this._testMode = test;
      return new Promise<Array<string>>((resolve, reject) => {
            let errors = new Array<string>();

            this._assets = new BABYLON.AssetsManager(this._scene);

            let numberOfAssets = this.countAllAssets(this._manifest);

            engine.loadingUIText = "Distance to touchdown " + numberOfAssets + "000km";

            let mapLoadingErrors = this.getMapAssets(this._scene, this._manifest, reject);
            errors.concat(errors, mapLoadingErrors);

            let playerLoadingErrors = this.getPlayerAssets(this._scene, this._manifest);
            errors.concat(errors, playerLoadingErrors);
            this._assets.onFinish = (tasks: Array<BABYLON.IAssetTask>) => {
                  console.log('tasks finished');
                  resolve();
            };

            this._assets.onTaskError = (task: BABYLON.IAssetTask) => {
                console.log('task loading failure');
                 engine.loadingUIText = "Landing aborted";
            }

            this._assets.onTaskSuccess = (task: BABYLON.IAssetTask) => {
                console.log("task loaded successfully");
                numberOfAssets = (numberOfAssets - 1);
                engine.loadingUIText = "Distance to touchdown " + numberOfAssets + "000km";
            }
            this._assets.load();
      });
     }

     countAllAssets(manifest: UrlManifest): number {
           return 5 + manifest.characters.length;
     }

     getPlayerAssets(scene: BABYLON.Scene, manifest: UrlManifest): Array<string> {
      return new Array<string>();
     }

      /**
       * Get the map assets required to load the map
       * @param text {string} The text used to show during game load
       * @param scene {BABYLON.Scene} The scene passed in from the game class
       * @param manifest {UrlManifest} The manifest of urls required to load this game
       * @param errors {Array<string>} The list of errors, if any incurred in this code path.
       */
      getMapAssets(scene: BABYLON.Scene, manifest: UrlManifest, reject: any): Array<string> {
            let errors = new Array<string>();
            let url = manifest.baseUrl + "/map" + manifest.map.baseUrl;

            /** Load ground texture */
            this.loadTexture("Ground texture", url + "/texture" + manifest.map.texture, () => {}, () => {reject(["Failed to load map texture"])});

            /** Load height map */
            this.loadImage("heightMap", url + "/heighmap" + manifest.map.heightMap, () => {}, () => {reject(["Failed to load height map"])});

            /** Load sky box */
            let skybox = BABYLON.Mesh.CreateBox("skyBox", 500.0, scene);
            let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);

            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.disableLighting = true;

            skybox.material = skyboxMaterial;

            skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(url + "/skybox" + manifest.map.skybox, scene);
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
            let imageLoader = this._assets.addImageTask(taskName, url);
            imageLoader.onSuccess = success.bind(this);
            imageLoader.onError = fail.bind(this);
            return imageLoader;
      }

      /**
      * Given a set of arguments, attempts to load a texture into the assets manage
      */
      loadTexture(taskName: string, url: string, success: () => any, fail: () => any, noMipMap?: boolean, sampling?: boolean) {
            let textureLoad = this._assets.addTextureTask(taskName, url, noMipMap, sampling);
            textureLoad.onSuccess = success.bind(this);
            textureLoad.onError = fail.bind(this);
            return textureLoad;
      }

         /**
     * Load mech components for the game
     * @param taskName
     * @param meshNames
     * @param rootUrl
     * @param sceneFileName
     * @param success
     * @param fail
     */
    loadMesh(taskName: string, meshNames: any, rootUrl: string, sceneFileName: string, success: () => any, fail: () => any) {
        console.log('loading mesh', taskName);
        let meshLoader = this._assets.addMeshTask(taskName, meshNames, rootUrl, sceneFileName);
        meshLoader.onSuccess = success.bind(this);
        meshLoader.onError = fail.bind(this);
        return meshLoader;
    }

}