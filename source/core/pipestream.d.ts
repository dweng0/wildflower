import * as BABYLON from 'babylonjs';
export interface StreamResult {
    success: boolean;
    message: string;
    response: any;
}
export interface StreamHandlingPackage {
    movePlayerSuccess: (playerId: string, locationRequest: BABYLON.Vector3) => any;
    movePlayerFailure: (reason: string) => any;
    attackPlayerSuccess: (playerId: string, locationRequest: BABYLON.Vector3) => any;
    attackPlayerFailure: (reason: string) => any;
}
/**
 * @classdesc More like pipe dream HUE HUE HUE
 * What it does:
 * Handles connections between client and server
 */
export declare class PipeStream {
    private _signalR;
    private _ready;
    private _movePlayerSuccess;
    private _movePlayerFailure;
    private _attackPlayerSuccess;
    private _attackPlayerFailure;
    constructor();
    getResponseFunctions(): any;
    setStreamHandlers(functionHooks: StreamHandlingPackage): void;
    isReady(): boolean;
    movePlayerRequest(playerId: string, locationRequest: BABYLON.Vector3): void;
    /**
     * We get this from the server.
     * @param result
     */
    movePlayerResponse(result: StreamResult): void;
    attackPlayerRequest(): void;
    attackPlayerResponse(): void;
}
