import * as BABYLON from 'babylonjs';

export enum Axis {
  x,
  y,
  z
}

export interface IImpulseData {
  force: BABYLON.Vector3;
  position: BABYLON.Vector3;
}

export class Character {
  private mesh: BABYLON.Mesh;

  constructor(manifest: any, scene: BABYLON.Scene) {
    // just for testing purposes
    this.createMesh(scene);
  }

  createMesh(scene: BABYLON.Scene) {
    this.mesh = BABYLON.Mesh.CreateSphere("sphere1", 4, 2, scene);
    // Move the sphere upward 1/2 its height
    this.mesh.position.y = 20;
    this.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.mesh, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.2, friction: 0.9 }, scene);
  }

  fetchMesh(): BABYLON.Mesh {
    return this.mesh;
  }

  calculateForce(axis: Axis, movement: number): BABYLON.Vector3 {
    let x = (axis === Axis.x) ? movement : 0;
    let y = (axis === Axis.y) ? movement : 0;
    let z = (axis === Axis.z) ? movement : 0;

    let newMovementVector = new BABYLON.Vector3(x, y, z);
    // let newMovementVector = new BABYLON.Vector3(0, 0, 0.5)
    console.log('moving:', x, y, z);
    let force = this.transformFromGlobalVectorToLocal(this.computeWorldMatrix(), newMovementVector);
  return  newMovementVector

  }

  moveByMouse (hitVector: BABYLON.Vector3) {
    // https://gamedevelopment.tutsplus.com/tutorials/quick-tip-smoothly-move-an-entity-to-the-position-of-the-mouse--gamedev-7356
    let myPos = this.mesh.getAbsolutePosition();
    let x = 0;
    let z = 0;
    let y;

    if (hitVector.x > myPos.x) {
       x = 8
    } else if (hitVector.x < myPos.x) {
      x = -8
    }

    if (hitVector.z > myPos.z) {
       z = 8
    } else if (hitVector.z < myPos.z) {
       z = -8
    }
      this.mesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(x , 0, z));
  }

  moveForwardBackward(force: number) {
    this.mesh.physicsImpostor.setLinearVelocity(this.calculateForce(Axis.z, force));
  }

  moveLeftRight(force: number) {
    this.mesh.physicsImpostor.setLinearVelocity(this.calculateForce(Axis.x, force));
  }

  computeWorldMatrix(): BABYLON.Matrix {
    return this.mesh.getWorldMatrix();
  }

  transformFromGlobalVectorToLocal(global: BABYLON.Matrix, newVector: BABYLON.Vector3): BABYLON.Vector3 {
    return BABYLON.Vector3.TransformCoordinates(newVector, global);
  }
}