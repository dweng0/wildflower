import * as BABYLON from 'babylonjs';
/**
 * Handles the loading of files for the game, does not handle web sockets or real time streams
 */
export class Stage {
      private _engine: BABYLON.Engine;
      private _lighting: BABYLON.HemisphericLight;
      private _scene: BABYLON.Scene;
      private _camera: BABYLON.FreeCamera;
      private _environment: BABYLON.StandardMaterial;

      constructor(engine: BABYLON.Engine) {
            console.log('A magical stage has been created')
            this._engine = engine;
      }

      setTheStage(canvas: HTMLCanvasElement): Array<string> {
            let errors = new Array<string>();
            this._setScene(errors);
            this._setCamera(errors, canvas);
            this._setLighting();
            this._setPlayers();
            return errors;
      }

      debugMode(debug: boolean): void {
            if (debug) {
                  this._scene.debugLayer.show();
            }
      }

      show() {

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

            this._camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1, -10), this._scene);
            this._engine

            // camera positioning
            this._camera.setTarget(new BABYLON.Vector3(-10, -10, 0));
            this._camera.attachControl(canvas);

            // for debugging the scene
            this._camera.keysUp = [87];
            this._camera.keysDown = [83];
            this._camera.keysLeft = [65];
            this._camera.keysRight = [68];

            this._camera.speed = 3.0;

            let sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, this._scene);
            // Move the sphere upward 1/2 its height
            sphere.position.y = 1;
            sphere.position.z = -10;
            sphere.position.x = -10;

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
            sphere.position.y = 1;
            sphere.position.z = -10;
            sphere.position.x = -10;
      }

}