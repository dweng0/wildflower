import * as BABYLON from 'babylonjs';
import * as WebRequest from 'rest';
import { UrlManifest, CharacterManifest} from '../interface/urlmanifest';
import {ICharacterData} from '../interface/assets/characterdata';
import { IPhysics } from '../interface/physics';
import {ICommander} from '../interface/assets/commander';
import { Campaign } from '../interface/assets/campaign';

export class AssetsManager {
      private _assets: BABYLON.AssetsManager;
      private _manifest: UrlManifest;
      private _scene: BABYLON.Scene;
      private _loadedAvatarStatistics: Array<ICharacterData>;
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
      loadInstanceAssets(engine: BABYLON.Engine, campaign: Campaign): Promise<any> {

            return new Promise<Array<string>>((resolve, reject) => {
                  this._assets = new BABYLON.AssetsManager(this._scene);

                  let numberOfAssets = this.countAllAssets(this._manifest);

                  engine.loadingUIText = "Distance to touchdown " + numberOfAssets + "000km";

                  this.getMapAssets(this._scene, this._manifest, reject);
                  this.getAvatarStatistics(this._scene, this._manifest, campaign).then((characterData: Array<ICharacterData>) => {
                        this._loadedAvatarStatistics = characterData;
                        this._assets.load();
                  }).catch(() => {
                        throw new Error('Failed to load Players');
                  });

                  this._assets.onFinish = (tasks: Array<BABYLON.IAssetTask>) => {
                        console.log('tasks finished');
                        engine.loadingUIText = "Activating landing gears";
                        resolve();
                  };

                  this._assets.onTaskError = (task: BABYLON.IAssetTask) => {
                        console.log('task loading failure');
                        engine.loadingUIText = "Landing aborted";
                  }

                  this._assets.onTaskSuccess = (task: BABYLON.IAssetTask) => {
                        numberOfAssets = (numberOfAssets - 1);
                        engine.loadingUIText = "Distance to touchdown " + numberOfAssets + "000km";
                  };
            });
      }

      countAllAssets(manifest: UrlManifest): number {
            return 3;
      }

      getAvatarStatistics(scene: BABYLON.Scene, manifest: UrlManifest, campaign: Campaign): Promise<Array<ICharacterData>> {
            let url = manifest.baseUrl + "/characters";
            let loadedCharacters = Array<ICharacterData>();

            let loadCharacter = (player: any, response: WebRequest.Response) => {
                  let characterManifest  = <ICharacterData>JSON.parse(response.entity);
                  this.loadCharacter(url, player.commander, characterManifest);
                  loadedCharacters.push(characterManifest);

                  // when all characters have been loaded into the assets manager, resolve the promise
                  if (loadedCharacters.length === campaign.redTeam.players.length + campaign.blueTeam.players.length) {
                        return true;
                  }
            }

            return new Promise<Array<ICharacterData>>((resolve, reject) => {
                  // load red team avatars
                  campaign.redTeam.players.forEach((redPlayer) => {
                        WebRequest(url + redPlayer.commander.assetsUrl + "/manifest").then((response: WebRequest.Response) => {
                             if (loadCharacter(redPlayer, response)) {
                                   resolve(loadedCharacters);
                             }
                        }).catch( () => { throw new Error("Failed to load character manifest") });
                  });

                  // load blue team avatars
                  campaign.blueTeam.players.forEach((bluePlayer) => {
                        WebRequest(url + bluePlayer.commander.assetsUrl + "/manifest").then((response: WebRequest.Response) => {
                              if (loadCharacter(bluePlayer, response)) {
                                   resolve(loadedCharacters);
                             }
                        }).catch( () => { throw new Error("Failed to load character manifest") });
                  });
            });
      }

      loadCharacter(url: string, commander: ICommander, manifest: ICharacterData) {
            debugger;
            let bodyTextureUrl = url + commander.assetsUrl + "/textures" + manifest.textureUrl;
            let meshUrl = url + commander.assetsUrl + manifest.meshUrl;
            let meshTask = this._assets.addMeshTask("skull task", "", meshUrl, manifest.meshes[0]);
            meshTask.onSuccess = function (task: any) {
                  // http://www.html5gamedevs.com/topic/6732-question-about-mesh-impostor/
                  debugger;
                  let mesh = <BABYLON.AbstractMesh>task.loadedMeshes[1];
                  debugger;
                  mesh.position = BABYLON.Vector3.Zero();
                  mesh.name = commander.name + "_mesh";
                  mesh.outlineWidth = 20;

                  mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, {
                        mass: commander.physics.mass,
                        restitution: commander.physics.restitution,
                        friction: commander.physics.friction
                  }, this._scene);
                  commander.mesh = mesh;
            }
      }

      setTerrain(url: string, scene: BABYLON.Scene, manifest: UrlManifest, reject: any): void {
            let ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", url + "/heightmap" + manifest.map.heightMap, 300, 250, 100, 0, 12, scene, true);

            /** Load ground texture */
            this.loadTexture("ground", url + "/texture" + manifest.map.texture, (asset) => {
                  let groundMaterial = new BABYLON.StandardMaterial("ground", scene);
                  groundMaterial.diffuseTexture = asset.texture;
                  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                  ground.material = groundMaterial;
                  ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.HeightmapImpostor, { mass: 0, restitution: 0.8, friction: 0.2 }, scene);
                  // physics
                  WebRequest(url + manifest.map.physics).then((response: WebRequest.Response) => {
                        let physics = <IPhysics>JSON.parse(response.entity);
                        // ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.HeightmapImpostor, physics, scene);
                  }).catch((reason) => { reject(reason) });
            }, () => { reject(["Failed to load map texture"]) });
      }

      setFlatTerrain(url: string, scene: BABYLON.Scene, manifest: UrlManifest, reject: any): void {
            let ground = BABYLON.Mesh.CreateGround("ground", 300, 250, 100, scene, true);

            /** Load ground texture */
            this.loadTexture("ground", url + "/texture" + manifest.map.texture, (asset) => {
                  let groundMaterial = new BABYLON.StandardMaterial("ground", scene);
                  groundMaterial.diffuseTexture = asset.texture;
                  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                  ground.material = groundMaterial;
                  ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.HeightmapImpostor, { mass: 0, restitution: 0.5, friction: 0.8 }, scene);
                  // physics
                  WebRequest(url + manifest.map.physics).then((response: any) => {
                        let physics = <IPhysics>JSON.parse(response.entity);
                        // ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.HeightmapImpostor, physics, scene);
                  }).catch((reason) => { reject(reason) });
            }, () => { reject(["Failed to load map texture"]) });
      }

      setBoxTerrain(url: string, scene: BABYLON.Scene, manifest: UrlManifest, reject: any): void {
            // Object
            let g = BABYLON.Mesh.CreateBox("ground", 1600, scene);
            g.position.y = -20;
            g.scaling.y = 0.01;

            /** Load ground texture */
            this.loadTexture("ground", url + "/texture" + manifest.map.texture, (asset) => {
                  let groundMaterial = new BABYLON.StandardMaterial("ground", scene);
                  groundMaterial.diffuseTexture = asset.texture;
                  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                  g.material = groundMaterial;
                  g.physicsImpostor = new BABYLON.PhysicsImpostor(g, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5, friction: 0.7 }, scene);
            }, () => { reject(["Failed to load map texture"]) });
      }

      /**
       * Sets the skybox
       * @param url {string} The url used to get the material
       * @param scene
       * @param manifest
       * @param reject
       */
      setSkyBox(url: string, scene: BABYLON.Scene, manifest: UrlManifest, reject: any): void {
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
      }

      /**
       * this creates a sphere testing.
       */
      setSkyPhere(url: string, scene: BABYLON.Scene, manifest: UrlManifest, reject: any): void {
            let skybox = BABYLON.Mesh.CreateSphere("skyBox", 10, 2500, scene);
            let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);

            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.disableLighting = true;

            skybox.material = skyboxMaterial;

            skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(url + "/skybox" + manifest.map.skybox, scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skybox.renderingGroupId = 0;
      }

      /**
       * Get the map assets required to load the map
       * @param text {string} The text used to show during game load
       * @param scene {BABYLON.Scene} The scene passed in from the game class
       * @param manifest {UrlManifest} The manifest of urls required to load this game
       * @param errors {Array<string>} The list of errors, if any incurred in this code path.
       */
      getMapAssets(scene: BABYLON.Scene, manifest: UrlManifest, reject: any): void {
            let url = manifest.baseUrl + "/map" + manifest.map.baseUrl;

            // this.setTerrain(url, scene, manifest, reject);
            this.setFlatTerrain(url, scene, manifest, reject);
            // this.setSkyBox(url, scene, manifest, reject);
            this.setSkyPhere(url, scene, manifest, reject);
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
      loadTexture(taskName: string, url: string, success: (textureAsset: BABYLON.ITextureAssetTask) => any, fail: () => any, noMipMap?: boolean, sampling?: boolean) {
            let textureLoad = this._assets.addTextureTask(taskName, url, noMipMap, sampling);
            textureLoad.onSuccess = success.bind(this);
            textureLoad.onError = fail.bind(this);
            return textureLoad;
      }

      loadMesh(taskName: string, meshNames: any, rootUrl: string, success: (meshAsset: BABYLON.MeshAssetTask) => any, fail: () => any) {
            console.log('loading mesh', taskName);
            let meshLoader = this._assets.addMeshTask(taskName, "", rootUrl, meshNames);
            meshLoader.onSuccess = success.bind(this);
            meshLoader.onError = fail.bind(this);
            return meshLoader;
      }

}