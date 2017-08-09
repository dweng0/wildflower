import * as BABYLON from 'babylonjs';
/**
 * More like pipe dream HUE HUE HUE
 */
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

export class PipeStream {
      private _signalR: any;

      private _movePlayerSuccess: (playerId: string, locationRequest: BABYLON.Vector3) => any;
      private _movePlayerFailure: (reason: string) => any;
      private _attackPlayerSuccess: (playerId: string, locationRequest: BABYLON.Vector3) => any;
      private _attackPlayerFailure: (reason: string) => any;

      constructor() {
            // provide signal R here, it should already be connected to the server the connection process should not be handled by this class
      }

      setStreamHandlers (functionHooks: StreamHandlingPackage) {
      }

      isReady(): boolean {
            return true;
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