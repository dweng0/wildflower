import * as BABYLON from 'babylonjs';
import { Character } from './character';
import { UrlManifest, WorldPhysics } from '../interface/urlmanifest';
import { Campaign } from '../interface/assets/campaign';
/**
 * @classdesc Handles the setting up of scenes, cameras and management of active characters in the scene.
 * The entry point for 'setting up' is 'setTheStage'
 * The entry point for starting everything up is 'showTime'
 */
export class Stage {
      private _engine: BABYLON.Engine;
      private _lighting: BABYLON.HemisphericLight;
      private _scene: BABYLON.Scene;
      private _camera: BABYLON.FollowCamera;
      private _arcCamera: BABYLON.ArcRotateCamera;
      private _freeCamera: BABYLON.FreeCamera;
      private _activeCamera: any;
      private _environment: BABYLON.StandardMaterial;
      private _worldPhysics: WorldPhysics;
      private _thisCharacter: Character; // for now this will be a mesh
      characters: Array<Character>;

      constructor(engine: BABYLON.Engine, manifest: UrlManifest) {
            console.log('A magical stage has been created')
            this._engine = engine;
            this._worldPhysics = manifest.world;
            this.characters = new Array<Character>();
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

      /**
       * Allows easy camera setting.
       * @param type {string} camera type to be used
       * @param canvas {HTMLCanvasElement} the canvas that the camera may like to attach to
       */
      useCamera(type: string, canvas: HTMLCanvasElement) {
            let camera;
            switch (type) {
                  case "free":
                        {
                              camera = this.setDebugCamera(canvas);
                              break;
                        }
                  case "arc":
                        {
                              camera = this._setArcCamera(canvas);
                              break;
                        }
                  case "follow":
                        {
                              camera = this._setCamera(canvas);
                              break;
                        }
            }
            this._scene.activeCamera = camera;
      }

      /**
       * Creates the scene, sets up the cameras and the lighting
       * @param canvas {HTMLCanvasElement} required for the camera to attach controls to
       */
      setTheStage(canvas: HTMLCanvasElement): Array<string> {
            let errors = new Array<string>();
            this._setScene(errors);
            this.useCamera("arc", canvas);
            this._setLighting();
            return errors;
      }

      /**
       * Called after everything is loaded and the server has provided back a ready call
       * @param debug {boolean} determines if the debug layer should be shown
       */
      showTime(debug?: boolean): void {
       //     this._arcCamera.position = this.getCharacter().fetchMesh().absolutePosition;
            this._scene.registerBeforeRender(() => {
                  this._updateCharacterMovements();
            });
            this._scene.render();
            if (debug) {
                  this._scene.debugLayer.show();
            }
      }

      /**
       * simple getter, returns the private scene
       * @returns {BABYLON.Scene}
       */
      getScene(): BABYLON.Scene {
            return this._scene;
      }

      /**
       * Sets up a free camera, attaches movement controls, note the controls prevent default even with noPreventDefault bool set to true
       * @param canvas {HTMLCanvasElement} element the camera needs to attach controls to
       */
      setDebugCamera(canvas: HTMLCanvasElement): any {
            this._freeCamera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 15, -45), this._scene);

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
            return this._freeCamera;
      }

      /**
       * Gets 'this client' character
       * @todo should return any character based on the id passeed in... or something.
       * @return {Character}
       */
      getCharacter(): Character {
            return this._thisCharacter;
      }

      /**
       * Called in registerBeforeRender, updates character movements
       * @private
       */
      private _updateCharacterMovements() {
            this.characters.forEach((character: Character) => {
                  !(character.movementPackage.finished) ? character.updateMovement() : null;
            });
      };

      /**
       * Sets up a follow camera and attaches controls
       * @param canvas {HTMLCanvasElement}
       * @return {BABYLON.FollowCamera}
       */
      private _setCamera(canvas: HTMLCanvasElement): BABYLON.FollowCamera {

            this._camera = new BABYLON.FollowCamera("Follow", new BABYLON.Vector3(0, 15, 45), this._scene);
            this._camera.radius = 50; // how far from the object to follow
            this._camera.heightOffset = 50; // how high above the object to place the camera
            this._camera.rotationOffset = 720; // the viewing angle
            this._camera.cameraAcceleration = 0.7 // how fast to move
            this._camera.maxCameraSpeed = 20 // speed limit

            this._camera.attachControl(canvas, true);
            window['camera'] = this._camera;
            return this._camera;
      }

      /**
       * Sets up an arc camera sets it on the member variable, but also returns it
       * @param canvas {HTMLCanvasElement}
       * @returns {BABYLON.ArcRotateCamera}
       */
      private _setArcCamera(canvas): BABYLON.ArcRotateCamera {
            this._arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this._scene);
            this._arcCamera.setPosition(new BABYLON.Vector3(0, 20, 50));
            this._arcCamera.attachControl(canvas, true);
            return this._arcCamera;
      }

      /**
       * Attempts to set the scene, returns an array of error messages. if the array is empty, then it was successful
       * @private
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

      /**
       * Sets scen lightingq
       * @private
       */
      private _setLighting(): void {
            this._lighting = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);
            this._lighting.diffuse = new BABYLON.Color3(1, 1, 1);
            this._lighting.specular = new BABYLON.Color3(0, 0, 0);
      }

      /**
       * Sets the '_thisCharacter' variable and pushes it into the list of characters in the scene
       */
      setThisPlayer(userName: string, campaign: Campaign): void {
            this._thisCharacter = new Character(userName, campaign, this._scene);
            this.characters.push(this._thisCharacter);
      }

      /**
       * Adds the character argument to the list of characters array
       * @param character {Character}
       */
      addCharacter(character: Character) {
            this.characters.push(character);
      }
}