import * as BABYLON from 'babylonjs';

export class Character {
    private mesh: BABYLON.Mesh;

    constructor(mesh: BABYLON.Mesh) {
      this.mesh = mesh;
    }

    fetchMesh(): BABYLON.Mesh {
      return this.mesh;
    }

    movementGrantedForward(zAxis: number) {
            let worldCoords = this.computeWorldMatrix();
            let vector = new BABYLON.Vector3(0, 0, zAxis);
            let v2 = this.transformFromGlobalVectorToLocal(worldCoords, vector);
            this.mesh.applyImpulse(v2, this.mesh.position);
    }

     movementGrantedBackward(zAxis: number) {
            let worldCoords = this.computeWorldMatrix();
            let vector = new BABYLON.Vector3(0, 0, zAxis);
            let v2 = this.transformFromGlobalVectorToLocal(worldCoords, vector);
            this.mesh.applyImpulse(v2, this.mesh.position);
    }

    computeWorldMatrix(): BABYLON.Matrix {
          return this.mesh.getWorldMatrix();
    }

    transformFromGlobalVectorToLocal(global: BABYLON.Matrix, newVector: BABYLON.Vector3): BABYLON.Vector3 {
          return BABYLON.Vector3.TransformCoordinates(newVector, global);
    }
 }