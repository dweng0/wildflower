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

export class Character {
  private commander: Commander;
  private _player: Player;
  private movementThreshold: number = 5;

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
   * Move a player by applying an impulse to match the movementpackage
   */
  updateMovement() {
    let mesh = this.commander.fetchMesh();
    let direction = this.movementPackage.destination.subtract(mesh.position);
    let tolerance = 5;
    // To be able to apply scaling correctly, normalization is required.
    direction = direction.normalize();

    var impulse = direction.scale(20);
    mesh.lookAt(this.movementPackage.destination);
    mesh.physicsImpostor.setLinearVelocity(impulse);
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