/**
 * @classdesc Welcome to the commander class, this is actually the avatar, this class will hold the mesh set, dictate the speed, physics, textures
 * and all that jazz, the 'character' class will create an instance of this class and any 'physical' interactions will need to be piped through the character class
 */
import * as BABYLON from 'babylonjs';
/**
 * Import the necessary IInterface
 */
import { ICommander } from '../interface/assets/commander';

export class Commander {
    private _stats: ICommander;
    private _mesh: BABYLON.AbstractMesh;
    constructor(commander: ICommander, scene: BABYLON.Scene) {
        this._stats = commander;
        this._mesh = commander.mesh;
        this.setPhysics(scene);
    }

    setPhysics(scene: BABYLON.Scene) {
        debugger;
        this._mesh.position.y = 20;
        this._mesh.physicsImpostor = new BABYLON.PhysicsImpostor(this._mesh, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: this._stats.physics.mass,
            restitution: this._stats.physics.restitution,
            friction: this._stats.physics.friction
        }, scene);
    }
    fetchMesh(): BABYLON.AbstractMesh {
        return this._mesh;
    }
    getName(): string {
        return this._stats.name;
    }
}