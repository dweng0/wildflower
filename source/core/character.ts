import * as BABYLON from 'babylonjs';
import { Commander } from './commander';

export enum Axis {
  x,
  y,
  z
}

export interface IImpulseData {
  force: BABYLON.Vector3;
  position: BABYLON.Vector3;
}

export interface IMovementPackage {
  finished: boolean;
  destination: BABYLON.Vector3;
}

export class Character {
  private commander: Commander;
  movementPackage: IMovementPackage;

  constructor(manifest: any, scene: BABYLON.Scene) {
    // just for testing purposes
    this.commander = new Commander();
    this.commander.createMesh(scene);

    this.movementPackage = {
      finished: true,
      destination: new BABYLON.Vector3(0, 0, 0)
    }
  }

  fetchMesh(): BABYLON.Mesh {
    return this.commander.fetchMesh();
  }

  calculateForce(axis: Axis, movement: number): BABYLON.Vector3 {
    let x = (axis === Axis.x) ? movement : 0;
    let y = (axis === Axis.y) ? movement : 0;
    let z = (axis === Axis.z) ? movement : 0;

    let newMovementVector = new BABYLON.Vector3(x, y, z);
    // let newMovementVector = new BABYLON.Vector3(0, 0, 0.5)
    console.log('moving:', x, y, z);
    let force = this.transformFromGlobalVectorToLocal(this.computeWorldMatrix(), newMovementVector);
    return newMovementVector;
  }

  updateMovement() {
    let mesh = this.commander.fetchMesh();
    // https://gamedevelopment.tutsplus.com/tutorials/quick-tip-smoothly-move-an-entity-to-the-position-of-the-mouse--gamedev-7356
    let myPos = mesh.getAbsolutePosition();
    let hitVector = this.movementPackage.destination;
    let x = 0;
    let z = 0;
    let y;
    let tolerance = 0.05;
    let xFinished = false;

    if (hitVector.x > myPos.x + tolerance) {
      x = 8
    } else if (hitVector.x < myPos.x - tolerance) {
      x = -8
    } else {
      xFinished = true;
    }

    if (hitVector.z > myPos.z + tolerance) {
      z = 8
    } else if (hitVector.z < myPos.z - tolerance) {
      z = -8
    } else {
      if (xFinished === true) {
        this.movementPackage.finished = true;
      }
    }
    mesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(x, 0, z));
  }

  moveByMouse(hitVector: BABYLON.Vector3) {
    this.movementPackage = {
      finished: false,
      destination: hitVector
    }
  }

  moveForwardBackward(force: number) {
    // this.mesh.physicsImpostor.setLinearVelocity(this.calculateForce(Axis.z, force));
  }

  moveLeftRight(force: number) {
    // this.mesh.physicsImpostor.setLinearVelocity(this.calculateForce(Axis.x, force));
  }

  computeWorldMatrix(): BABYLON.Matrix {
    return this.commander.fetchMesh().getWorldMatrix();
  }

  transformFromGlobalVectorToLocal(global: BABYLON.Matrix, newVector: BABYLON.Vector3): BABYLON.Vector3 {
    return BABYLON.Vector3.TransformCoordinates(newVector, global);
  }
}