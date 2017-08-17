import * as BABYLON from 'babylonjs';
import { Character } from './character';
import { UrlManifest } from '../interface/urlmanifest';
import { Campaign } from '../interface/assets/campaign';
import { PipeStream } from './pipestream';
/**
 * @classdesc Handles the setting up of scenes, cameras and management of active characters in the scene.
 * The entry point for 'setting up' is 'setTheStage'
 * The entry point for starting everything up is 'showTime'
 */
export declare class Stage {
    private _engine;
    private _lighting;
    private _scene;
    private _camera;
    private _arcCamera;
    private _freeCamera;
    private _activeCamera;
    private _environment;
    private _worldPhysics;
    private _thisCharacter;
    characters: Array<Character>;
    constructor(engine: BABYLON.Engine, manifest: UrlManifest);
    /**
     * Allows easy camera setting.
     * @param type {string} camera type to be used
     * @param canvas {HTMLCanvasElement} the canvas that the camera may like to attach to
     */
    useCamera(type: string, canvas: HTMLCanvasElement): void;
    /**
     * Creates the scene, sets up the cameras and the lighting
     * @param canvas {HTMLCanvasElement} required for the camera to attach controls to
     */
    setTheStage(canvas: HTMLCanvasElement): Array<string>;
    /**
     * Called after everything is loaded and the server has provided back a ready call
     * @param debug {boolean} determines if the debug layer should be shown
     */
    showTime(debug?: boolean): void;
    /**
     * simple getter, returns the private scene
     * @returns {BABYLON.Scene}
     */
    getScene(): BABYLON.Scene;
    pipeUserInput(stream: PipeStream): void;
    /**
     * Sets up a free camera, attaches movement controls, note the controls prevent default even with noPreventDefault bool set to true
     * @param canvas {HTMLCanvasElement} element the camera needs to attach controls to
     */
    setDebugCamera(canvas: HTMLCanvasElement): any;
    /**
     * Gets 'this client' character
     * @todo should return any character based on the id passeed in... or something.
     * @return {Character}
     */
    getCharacter(): Character;
    private _setShadows();
    /**
     * Called in registerBeforeRender, updates character movements
     * @private
     */
    private _updateCharacterMovements();
    /**
     * Sets up a follow camera and attaches controls
     * @param canvas {HTMLCanvasElement}
     * @return {BABYLON.FollowCamera}
     */
    private _setCamera(canvas);
    /**
     * Sets up an arc camera sets it on the member variable, but also returns it
     * @param canvas {HTMLCanvasElement}
     * @returns {BABYLON.ArcRotateCamera}
     */
    private _setArcCamera(canvas);
    /**
     * Attempts to set the scene, returns an array of error messages. if the array is empty, then it was successful
     * @private
     * @returns {Array<string>}
     */
    private _setScene(errors);
    /**
     * Sets scen lightingq
     * @private
     */
    private _setLighting();
    /**
     * Sets the '_thisCharacter' variable and pushes it into the list of characters in the scene
     */
    setThisPlayer(userName: string, campaign: Campaign): void;
    /**
     * Adds the character argument to the list of characters array
     * @param character {Character}
     */
    addCharacter(character: Character): void;
}
