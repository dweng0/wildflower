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

    constructor(mesh: BABYLON.Mesh) {
      this.mesh = mesh;
    }

    fetchMesh(): BABYLON.Mesh {
      return this.mesh;
    }

    calculateForce(axis: Axis, movement: number): IImpulseData {
      let x = (axis === Axis.x) ? movement : 0;
      let y = (axis === Axis.y) ? movement : 0;
      let z = (axis === Axis.z) ? movement : 0;

      let newMovementVector = new BABYLON.Vector3(x, y, z);
      let force = this.transformFromGlobalVectorToLocal(this.computeWorldMatrix(), newMovementVector);

      return {
          force: force,
          position: this.mesh.position
      }

    }

    movementGrantedForward(zAxis: number) {
            let impulseData = this.calculateForce(Axis.y, zAxis);
            this.mesh.applyImpulse(impulseData.force, impulseData.position);
    }

    computeWorldMatrix(): BABYLON.Matrix {
          return this.mesh.getWorldMatrix();
    }

    transformFromGlobalVectorToLocal(global: BABYLON.Matrix, newVector: BABYLON.Vector3): BABYLON.Vector3 {
          return BABYLON.Vector3.TransformCoordinates(newVector, global);
    }
 }