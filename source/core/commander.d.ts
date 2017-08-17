/**
 * @classdesc Welcome to the commander class, this is actually the avatar, this class will hold the mesh set, dictate the speed, physics, textures
 * and all that jazz, the 'character' class will create an instance of this class and any 'physical' interactions will need to be piped through the character class
 */
import * as BABYLON from 'babylonjs';
/**
 * Import the necessary IInterface
 */
import { ICommander } from '../interface/assets/commander';
export declare class Commander {
    stats: ICommander;
    private _mesh;
    constructor(commander: ICommander, scene: BABYLON.Scene);
    fetchMesh(): BABYLON.AbstractMesh;
    getName(): string;
}
