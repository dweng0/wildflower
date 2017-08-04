import * as BABYLON from 'babylonjs';
import {Character} from './character';
import {UrlManifest, WorldPhysics} from '../interface/urlmanifest';
/**
 * Handles the loading of files for the game, does not handle web sockets or real time streams
 */
export class Stage {
      private _engine: BABYLON.Engine;
      private _lighting: BABYLON.HemisphericLight;
      private _scene: BABYLON.Scene;
      private _camera: BABYLON.FollowCamera;
      private _freeCamera: BABYLON.FreeCamera;
      private _activeCamera: any;
      private _environment: BABYLON.StandardMaterial;
      private _worldPhysics: WorldPhysics;
      private _thisCharacter: Character; // for now this will be a mesh
      private _characters: Array<Character>;

      constructor(engine: BABYLON.Engine, manifest: UrlManifest) {
            console.log('A magical stage has been created')
            this._engine = engine;
            this._worldPhysics = manifest.world;
            this._characters = new Array<Character>();
      }

      /**
       * Sets the camera on a specific mesh object
       * @param meshObjectName {string}
       */
      setCameraOnPlayer(meshObjectName: string) {
            console.log('Locking camera on character');
            let characterMesh = this._thisCharacter.fetchMesh();
            if (this._scene.activeCamera instanceof BABYLON.FollowCamera) {
                  this._scene.activeCamera.lockedTarget = characterMesh;
            } else {
                  let newVectoring = new BABYLON.Vector3(characterMesh.position.x, characterMesh.position.y, characterMesh.position.z - 10);
                  this._scene.activeCamera.position = newVectoring;
            }
      }

      setTheStage(canvas: HTMLCanvasElement): Array<string> {
            let errors = new Array<string>();
            this._setScene(errors);
            this._setPlayers();
            this._setCamera(canvas);
           // this.setDebugCamera(canvas);
            this._setLighting();
            return errors;
      }

      switchCameras() {
            return
            /**if (this._scene.activeCamera instanceof BABYLON.FollowCamera) {
                  this._scene.activeCamera = this._freeCamera;
                  } else {
                  this._scene.activeCamera = this._camera;
            }*/
      }

      showTime(debug: boolean): void {
            this._scene.activeCamera = this._camera;
            this._scene.registerBeforeRender(() => {
                  this.updateCharacterMovements();
            });
            this._scene.render();
             if (debug) {
                  this._scene.debugLayer.show();
            }
      }

      getScene(): BABYLON.Scene {
            return this._scene;
      }

      setDebugCamera(canvas): void {
            this._freeCamera = new BABYLON.FreeCamera("camera1",  new BABYLON.Vector3(0, 15, -45), this._scene);

            // for debugging the scene
            this._freeCamera.keysUp = [38];
            this._freeCamera.keysDown = [40];
            this._freeCamera.keysLeft = [37];
            this._freeCamera.keysRight = [39];
            this._freeCamera.attachControl(canvas)
            this._freeCamera.speed = 3.0;
            // camera positioning
           // this._freeCamera.setTarget(this._thisCharacter.fetchMesh().position);
            this._freeCamera.attachControl(canvas, true);
      }

      getCharacter(): Character {
            return this._thisCharacter;
      }

      updateCharacterMovements() {
            this._characters.forEach((character: Character) => {
                  !(character.movementPackage.finished) ? character.updateMovement() : null;
            });
      };


      /**
       * Attempts to set the camera, returns an array of error messages. if the array is empty, then it was successful
       * @param {error}
       * @returns {Array<string>}
       */
      private _setCamera(canvas): void {

            this._camera = new BABYLON.FollowCamera("Follow", new BABYLON.Vector3(0, 15, 45), this._scene);
            this._camera.radius = 50; // how far from the object to follow
            this._camera.heightOffset = 50; // how high above the object to place the camera
            this._camera.rotationOffset = 720; // the viewing angle
            this._camera.cameraAcceleration = 0.7 // how fast to move
            this._camera.maxCameraSpeed = 20 // speed limit

            this._camera.attachControl(canvas, true);
            window['camera'] = this._camera;
      }

       /**
       * Attempts to set the scene, returns an array of error messages. if the array is empty, then it was successful
       * @returns {Array<string>}
       */
      private _setScene(errors: Array<string>): Array<string> {
            if (!this._engine) {
                  errors.push("Failed to set scene, the engine is missing.");
            } else {
                  this._scene = new BABYLON.Scene(this._engine);
                  this._scene.enablePhysics(new BABYLON.Vector3(this._worldPhysics.gravityVector.x, this._worldPhysics.gravityVector.y, this._worldPhysics.gravityVector.z), new BABYLON.OimoJSPlugin());
            }
            return errors;
      }

      private _setLighting(): void {
            this._lighting = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);
            this._lighting.diffuse = new BABYLON.Color3(1, 1, 1);
            this._lighting.specular = new BABYLON.Color3(0, 0, 0);
      }

      private _setPlayers(): void {
            // stub
            let characterManifest;
            this._thisCharacter = new Character(characterManifest, this._scene);
            this._characters.push(this._thisCharacter);
      }

      addCharacter(character: Character) {
            this._characters.push(character);
      }
}