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
export declare class Character {
    private commander;
    private _player;
    private movementThreshold;
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
    applyImpulse(destination: any): void;
    /**
     * Move a player by applying an impulse to match the movementpackage
     */
    updateMovement(): void;
    moveByMouse(hitVector: BABYLON.Vector3): void;
    computeWorldMatrix(): BABYLON.Matrix;
    transformFromGlobalVectorToLocal(global: BABYLON.Matrix, newVector: BABYLON.Vector3): BABYLON.Vector3;
}
