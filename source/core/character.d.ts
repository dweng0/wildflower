import * as BABYLON from 'babylonjs';
import { Campaign } from '../interface/assets/campaign';
import { Player } from '../interface/assets/player';
/**
 * Used to determine if a character still needs to move on a per frame render basis
 */
export interface IMovementPackage {
    finished: boolean;
    angleApplied: boolean;
    destination: BABYLON.Vector3;
}
/**
 * Handles the current size for an object
 */
export interface ICurrentSize {
    width: number;
    height: number;
}
export declare class Character {
    private commander;
    private _player;
    private currentSize;
    movementPackage: IMovementPackage;
    playerId: string;
    zoom: number;
    constructor(username: string, campaign: Campaign, scene: BABYLON.Scene);
    zoomOut(): void;
    zoomIn(): void;
    findUserInCampaign(username: string, campaign: Campaign): Player;
    fetchMesh(): BABYLON.AbstractMesh;
    setPlayerId(id: string): void;
    getCommanderName(): string;
    /**
    * This functionality needs improving, the character keeps tipping when moved
    */
    updateMovement(): void;
    /**
     * TODO add logic that lets us know if the x y coords fall inside this characters hitbox area
     * @param x
     * @param z
     */
    clickingSelf(x: number, z: number): boolean;
    moveByMouse(hitVector: BABYLON.Vector3): void;
    computeWorldMatrix(): BABYLON.Matrix;
    transformFromGlobalVectorToLocal(global: BABYLON.Matrix, newVector: BABYLON.Vector3): BABYLON.Vector3;
}
