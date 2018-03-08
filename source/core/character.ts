import * as BABYLON from 'babylonjs';
import { Commander } from './commander';
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

export class Character {
  private commander: Commander;
  private _player: Player;
  private currentSize: ICurrentSize;
  movementPackage: IMovementPackage;
  playerId: string;
  zoom: number = 0;

  constructor(username: string, campaign: Campaign, scene: BABYLON.Scene) {
    // find user in campaign
    this._player = this.findUserInCampaign(username, campaign);
    this.playerId = this._player.username;
    // create commander
    this.commander = new Commander(this._player.commander, scene);
    this.movementPackage = {
      finished: true,
      angleApplied: false,
      destination: new BABYLON.Vector3(0, 0, 0)
    }

    // set the curent size
    // this.currentSize.height
  }

  zoomOut(): void {
    if (this.zoom < 70) {
      this.zoom += 4;
    }
  }

  zoomIn(): void {
    if (this.zoom > -10) {
      this.zoom -= 4;
    }
  }

  findUserInCampaign(username: string, campaign: Campaign): Player {
    let foundPlayer: Player;
    campaign.blueTeam.players.forEach((player) => {
      if (player.username === username) {
        foundPlayer = player;
      }
    });

    campaign.redTeam.players.forEach((player) => {
      if (player.username === username) {
        foundPlayer = player;
      }
    });

    return foundPlayer;
  }

  fetchMesh(): BABYLON.AbstractMesh {
    return this.commander.fetchMesh();
  }

  setPlayerId(id: string) {
    this.playerId = id;
  }

  getCommanderName() {
    return this.commander.getName();
  }

  /**
  * This functionality needs improving, the character keeps tipping when moved
  */

  updateMovement() {
    let mesh = this.commander.fetchMesh();
    let myPos = mesh.getAbsolutePosition();
    let hitVector = this.movementPackage.destination;
    let x = 0;
    let z = 0;
    let y;
    let tolerance = 1;
    let xFinished = false;
    if (hitVector.x > myPos.x + tolerance) {
      x = this.commander.stats.baseSpeed;
    } else if (hitVector.x < myPos.x - tolerance) {
      x = -this.commander.stats.baseSpeed;
    } else {
      xFinished = true;
    }

    if (hitVector.z > myPos.z + tolerance) {
      z = this.commander.stats.baseSpeed;
    } else if (hitVector.z < myPos.z - tolerance) {
      z = -this.commander.stats.baseSpeed;
    } else {
      if (xFinished === true) {
        this.movementPackage.finished = true;
      }
    }

    if (!this.clickingSelf(x, z)) {
      mesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(x, 0, z));
    } else {
      xFinished = true;
    }

    if (!xFinished) {
      mesh.lookAt(hitVector);
    }
  }

  /**
   * TODO add logic that lets us know if the x y coords fall inside this characters hitbox area
   * @param x
   * @param z
   */
  clickingSelf(x: number, z: number): boolean {
    return false;
  }
  moveByMouse(hitVector: BABYLON.Vector3) {
    this.movementPackage = {
      finished: false,
      destination: hitVector,
      angleApplied: false
    }
  }

  computeWorldMatrix(): BABYLON.Matrix {
    return this.commander.fetchMesh().getWorldMatrix();
  }

  transformFromGlobalVectorToLocal(global: BABYLON.Matrix, newVector: BABYLON.Vector3): BABYLON.Vector3 {
    return BABYLON.Vector3.TransformCoordinates(newVector, global);
  }
}