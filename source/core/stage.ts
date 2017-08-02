import * as BABYLON from 'babylonjs';
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
      private _thisCharacter: BABYLON.Mesh; // for now this will be a mesh

      constructor(engine: BABYLON.Engine, manifest: UrlManifest) {
            console.log('A magical stage has been created')
            this._engine = engine;
            this._worldPhysics = manifest.world;
      }


      /**
       * Sets the camera on a specific mesh object
       * @param meshObjectName {string}
       */
      setCameraOnPlayer(meshObjectName: string) {
            this._camera.lockedTarget = this._scene.getMeshByName(meshObjectName);
      }

      setTheStage(canvas: HTMLCanvasElement): Array<string> {
            let errors = new Array<string>();
            this._setScene(errors);
            this._setCamera(errors, canvas);
            this.setDebugCamera(canvas);
            this._setLighting();
            this._setPlayers();
            return errors;
      }

      switchCameras() {
            if (this._scene.activeCamera instanceof BABYLON.FollowCamera) {
                  this._scene.activeCamera = this._freeCamera;
                  } else {
                  this._scene.activeCamera = this._camera;
            }
      }

      showTime(debug: boolean): void {
            this._scene.activeCamera = this._camera;
            this._scene.render();
             if (debug) {
                  this._scene.debugLayer.show();
            }
      }

      getScene(): BABYLON.Scene {
            return this._scene;
      }

      setDebugCamera(canvas): void {
            this._freeCamera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1, -10), this._scene);

            // for debugging the scene
            this._freeCamera.keysUp = [87];
            this._freeCamera.keysDown = [83];
            this._freeCamera.keysLeft = [65];
            this._freeCamera.keysRight = [68];
            this._freeCamera.attachControl(canvas)
           // this._camera.speed = 3.0;
      }

      getCharacter(): BABYLON.Mesh {
            return this._thisCharacter;
      }

      /**
       * Attempts to set the camera, returns an array of error messages. if the array is empty, then it was successful
       * @param {error}
       * @returns {Array<string>}
       */
      private _setCamera(errors: Array<string>, canvas): Array<string> {

            if (!this._engine) {
                  errors.push("Cannot set camera, no canvas element has been set");
            }

            if (!this._scene) {
                  errors.push("Cannot set camera, no scene has been set");
            }

            this._camera = new BABYLON.FollowCamera("Follow", new BABYLON.Vector3(0, 15, 45), this._scene);
            this._camera.radius = 30; // how far from the object to follow
            this._camera.heightOffset = 8; // how high above the object to place the camera
            this._camera.rotationOffset = 180; // the viewing angle
            this._camera.cameraAcceleration = 0.05 // how fast to move
            this._camera.maxCameraSpeed = 20 // speed limit

            // camera positioning
            this._camera.setTarget(new BABYLON.Vector3(-20, -10, -20));
            this._camera.attachControl(canvas);
            window['camera'] = this._camera;

            return errors;
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
            // just for testing purposes
            let sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, this._scene);
            // Move the sphere upward 1/2 its height
            sphere.position.y = 20;
            sphere.position.z = 100;
            sphere.position.x = -10;
            sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 1, restitution: 0, friction: 0.9}, this._scene);
            this._thisCharacter = sphere;
      }

}