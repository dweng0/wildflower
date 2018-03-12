import * as BABYLON from 'babylonjs';
import * as WebRequest from 'rest';
import { UrlManifest, CharacterManifest } from '../interface/urlmanifest';
import { ICharacterData } from '../interface/assets/characterdata';
import { IPhysics } from '../interface/physics';
import { ICommander } from '../interface/assets/commander';
import { Campaign } from '../interface/assets/campaign';
import { Team } from '../interface/assets/team';

export class AssetsManager {
      private _assets: BABYLON.AssetsManager;
      private _manifest: UrlManifest;
      private _scene: BABYLON.Scene;
      private _campaign: Campaign;
      private _loadedAvatarStatistics: Array<ICharacterData>;
      loadingText: string;

      constructor(manifest: UrlManifest, scene: BABYLON.Scene, campaign: Campaign) {
            this._manifest = manifest;
            this._scene = scene;
            this._campaign = campaign;
      }

      /**
       * Loads all instance assets for the game
       * @param loadingText {string} the text shown while the game is loading.
       * @returns {Promise}
       */
      loadInstanceAssets(engine: BABYLON.Engine): Promise<any> {

            return new Promise<Array<string>>((resolve, reject) => {
                  this._assets = new BABYLON.AssetsManager(this._scene);

                  let numberOfAssets = this.countAllAssets(this._manifest);

                  engine.loadingUIText = "Distance to touchdown " + numberOfAssets + "000km";

                  this.getMapAssets(this._scene, this._manifest, reject);
                  this.getAvatarStatistics(this._scene, this._manifest).then((characterData: Array<ICharacterData>) => {
                        this._loadedAvatarStatistics = characterData;
                        this._assets.load();
                  }).catch((error) => {
                        throw error;
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

      getAvatarStatistics(scene: BABYLON.Scene, manifest: UrlManifest): Promise<Array<ICharacterData>> {
            let url = manifest.baseUrl + "/characters";
            let loadedCharacters = Array<ICharacterData>();

            let loadCharacter = (player: any, startingVector: BABYLON.Vector3, response: WebRequest.Response) => {
                  let characterManifest = <ICharacterData>JSON.parse(response.entity);
                  this.loadCharacter(url, player.commander, characterManifest, startingVector);
                  loadedCharacters.push(characterManifest);

                  // when all characters have been loaded into the assets manager, resolve the promise
                  if (loadedCharacters.length === this._campaign.redTeam.players.length + this._campaign.blueTeam.players.length) {
                        return true;
                  }
            }

            return new Promise<Array<ICharacterData>>((resolve, reject) => {
                  // load red team avatars
                  this._campaign.redTeam.players.forEach((redPlayer) => {
                        WebRequest(url + redPlayer.commander.assetsUrl + "/manifest").then((response: WebRequest.Response) => {
                              let spaceMaker = (6 * loadCharacter.length);
                              let redStartingVector = new BABYLON.Vector3(this._campaign.map.redStartingPointX + spaceMaker, this._campaign.map.redStartingPointY, this._campaign.map.redStartingPointZ);
                              if (loadCharacter(redPlayer, redStartingVector, response)) {
                                    resolve(loadedCharacters);
                              }
                        }).catch((error) => { throw error });
                  });

                  // load blue team avatars
                  this._campaign.blueTeam.players.forEach((bluePlayer) => {
                        WebRequest(url + bluePlayer.commander.assetsUrl + "/manifest").then((response: WebRequest.Response) => {
                              let spaceMaker = (5 * loadCharacter.length);
                              let blueStartingVector = new BABYLON.Vector3(this._campaign.map.blueStartingPointX + spaceMaker, this._campaign.map.blueStartingPointY, this._campaign.map.blueStartingPointZ);
                              if (loadCharacter(bluePlayer, blueStartingVector, response)) {
                                    resolve(loadedCharacters);
                              }
                        }).catch((error) => { throw error });
                  });
            });
      }

      /**
       * Loads character based on data provided
       */
      loadCharacter(url: string, commander: ICommander, manifest: ICharacterData, startingVector: BABYLON.Vector3) {
            let bodyTextureUrl = url + commander.assetsUrl + "/textures" + manifest.textureUrl;
            let meshUrl = url + commander.assetsUrl + manifest.meshUrl;
            let meshTask = this._assets.addMeshTask("skull task", "", meshUrl, "buggy.babylon");
            meshTask.onSuccess = function (task: any) {
                  // http://www.html5gamedevs.com/topic/6732-question-about-mesh-impostor/
                  commander.mesh = BABYLON.Mesh.MergeMeshes(task.loadedMeshes)

                  commander.mesh.position = BABYLON.Vector3.Zero();
                  commander.mesh.name = commander.name + "_mesh";
                  commander.mesh.showBoundingBox = true;
                  commander.mesh.position = startingVector;
                  commander.mesh.edgesWidth = 20;
                  commander.mesh.outlineWidth = 20;
                  commander.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(commander.mesh, BABYLON.PhysicsImpostor.BoxImpostor, {
                        mass: manifest.physics.mass,
                        restitution: manifest.physics.restitution,
                        friction: manifest.physics.friction
                  }, this._scene);
            }
      }
      /**
       * loads the terrain assets and loads the ground texture
       */
      setTerrain(url: string, scene: BABYLON.Scene, manifest: UrlManifest, reject: any): void {
            let map = this._campaign.map
            let ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", url + "/heightmap" + manifest.map.heightMap, map.width, map.height, map.subDivisions, 0, 12, scene, true);

            /** Load ground texture */
            this.loadTexture("ground", url + "/texture" + manifest.map.texture, (asset) => {
                  let groundMaterial = new BABYLON.StandardMaterial("ground", scene);
                  groundMaterial.diffuseTexture = asset.texture;
                  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                  ground.material = groundMaterial;
                  ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: map.physics.mass, restitution: map.physics.restitution, friction: map.physics.friction }, scene);
                  this._campaign.map.groundMesh = ground;
            }, () => { reject(["Failed to load map texture"]) });
      }

      /**
       * Sets up a flat terrain using a mesh box for better physics interactions
       * @param url the url from which to load the texture
       * @param scene the scene to push the terrain into
       * @param manifest the url manifest for loading map json data
       * @param reject the reject function to call if the call fails
       */
      setFlatTerrain(url: string, scene: BABYLON.Scene, manifest: UrlManifest, reject: any): void {
            let map = this._campaign.map
           // let ground = BABYLON.Mesh.CreateGround("ground", map.width, scene);
           let ground = BABYLON.Mesh.CreateGround("ground", 500, 500, 1, scene);
            ground.position.y = 1;
            /** Load ground texture */
            this.loadTexture("ground", url + "/texture" + manifest.map.texture, (asset) => {
                  let groundMaterial = new BABYLON.StandardMaterial("ground", scene);
                  groundMaterial.diffuseTexture = asset.texture;
                  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                  ground.material = groundMaterial;
                  ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: map.physics.mass, restitution: map.physics.restitution, friction: map.physics.friction }, scene);
                  this._campaign.map.groundMesh = ground;
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
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(url + "/skybox" + manifest.map.skyBox, scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skybox.renderingGroupId = 0;
            this._campaign.map.skyMesh = skybox;
      }

      setSkyPhere(url: string, scene: BABYLON.Scene, manifest: UrlManifest, reject: any): void {
            let skybox = BABYLON.Mesh.CreateSphere("skyBox", 10, 2500, scene);
            let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);

            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.disableLighting = true;

            skybox.material = skyboxMaterial;

            skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(url + "/skybox" + manifest.map.skyBox, scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skybox.renderingGroupId = 0;
            this._campaign.map.skyMesh = skybox;
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

            this.setFlatTerrain(url, scene, manifest, reject);
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