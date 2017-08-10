import * as BABYLON from 'babylonjs';

export interface StreamResult {
      success: boolean;
      message: string;
      response: any;
}

export interface StreamHandlingPackage {
      movePlayerSuccess:  (playerId: string, locationRequest: BABYLON.Vector3) => any;
      movePlayerFailure: (reason: string) => any;
      attackPlayerSuccess: (playerId: string, locationRequest: BABYLON.Vector3) => any;
      attackPlayerFailure: (reason: string) => any;
}

/**
 * @classdesc More like pipe dream HUE HUE HUE
 */
export class PipeStream {
      private _signalR: any;
      private _ready: boolean = false;
      private _movePlayerSuccess: (playerId: string, locationRequest: BABYLON.Vector3) => any;
      private _movePlayerFailure: (reason: string) => any;
      private _attackPlayerSuccess: (playerId: string, locationRequest: BABYLON.Vector3) => any;
      private _attackPlayerFailure: (reason: string) => any;

      constructor() {
            // provide signal R here, it should already be connected to the server the connection process should not be handled by this class
      }

      setStreamHandlers (functionHooks: StreamHandlingPackage) {
            this._movePlayerSuccess = functionHooks.movePlayerSuccess;
            this._movePlayerFailure = functionHooks.movePlayerFailure;
            this._attackPlayerSuccess = functionHooks.attackPlayerSuccess;
            this._attackPlayerFailure = functionHooks.attackPlayerFailure;
            this._ready = true;
      }

      isReady(): boolean {
            return this._ready;
      }

      movePlayerRequest (playerId: string, locationRequest: BABYLON.Vector3) {
            console.log('todo make signal r request to server');
            // stub server should decide if below function is called
            let streamResult: StreamResult = {
                  success: true,
                  message: "yeah",
                  response: {
                        playerId: playerId,
                        locationRequest: locationRequest
                  }
            }
            this.movePlayerResponse(streamResult);
      }

      /**
       * We get this from the server.
       * @param result
       */
      movePlayerResponse (result: StreamResult) {
            if (result.success) {
                  this._movePlayerSuccess(result.response.playerId, result.response.locationRequest);
            } else {
                  this._movePlayerFailure(result.message);
            }
      }

      attackPlayerRequest () {

      }

      attackPlayerResponse () {

      }
}