import * as BABYLON from 'babylonjs';
import { UrlManifest } from '../interface/urlmanifest';
import { ICharacterData } from '../interface/assets/characterdata';
import { ICommander } from '../interface/assets/commander';
import { Campaign } from '../interface/assets/campaign';
export declare class AssetsManager {
    private _assets;
    private _manifest;
    private _scene;
    private _campaign;
    private _loadedAvatarStatistics;
    loadingText: string;
    constructor(manifest: UrlManifest, scene: BABYLON.Scene, campaign: Campaign);
    /**
     * Loads all instance assets for the game
     * @param loadingText {string} the text shown while the game is loading.
     * @returns {Promise}
     */
    loadInstanceAssets(engine: BABYLON.Engine): Promise<any>;
    countAllAssets(manifest: UrlManifest): number;
    getAvatarStatistics(scene: BABYLON.Scene, manifest: UrlManifest): Promise<Array<ICharacterData>>;
    loadCharacter(url: string, commander: ICommander, manifest: ICharacterData, startingVector: BABYLON.Vector3): void;
    setTerrain(url: string, scene: BABYLON.Scene, manifest: UrlManifest, reject: any): void;
    setFlatTerrain(url: string, scene: BABYLON.Scene, manifest: UrlManifest, reject: any): void;
    /**
     * Sets the skybox
     * @param url {string} The url used to get the material
     * @param scene
     * @param manifest
     * @param reject
     */
    setSkyBox(url: string, scene: BABYLON.Scene, manifest: UrlManifest, reject: any): void;
    setSkyPhere(url: string, scene: BABYLON.Scene, manifest: UrlManifest, reject: any): void;
    /**
     * Get the map assets required to load the map
     * @param text {string} The text used to show during game load
     * @param scene {BABYLON.Scene} The scene passed in from the game class
     * @param manifest {UrlManifest} The manifest of urls required to load this game
     * @param errors {Array<string>} The list of errors, if any incurred in this code path.
     */
    getMapAssets(scene: BABYLON.Scene, manifest: UrlManifest, reject: any): void;
    /**
     * Given a set of arguments, attempts to load an image into the assets manager
     * @param taskName string name of the task
     * @param url string the url of where to find the image
     * @param success fn
     * @param fail fn
     */
    loadImage(taskName: string, url: string, success: () => any, fail: () => any): BABYLON.IAssetTask;
    /**
    * Given a set of arguments, attempts to load a texture into the assets manage
    */
    loadTexture(taskName: string, url: string, success: (textureAsset: BABYLON.ITextureAssetTask) => any, fail: () => any, noMipMap?: boolean, sampling?: boolean): BABYLON.ITextureAssetTask;
    loadMesh(taskName: string, meshNames: any, rootUrl: string, success: (meshAsset: BABYLON.MeshAssetTask) => any, fail: () => any): BABYLON.IAssetTask;
}
