import * as BABYLON from 'babylonjs';
import { Character } from './character';
import { PipeStream } from './pipestream';
export interface KeyboardMapping {
    forward: number;
    back: number;
    strafeLeft: number;
    strafeRight: number;
    jump: number;
    target: number;
    firstAbility: number;
    secondAbility: number;
    thirdAbility: number;
    fourthAbility: number;
    fithAbility: number;
}
export declare class Input {
    private _character;
    private _keyboardMapping;
    private _scene;
    private _stream;
    /**
     * TODO we really need to place a 'character' class that can just be told to move, the character class will then get the necessary data
     * such as the matric
     */
    constructor(stream: PipeStream);
    updateKeyboardMaps(mapping: KeyboardMapping): void;
    onCharacterReady(character: Character): void;
    isNotReady(): boolean;
    setScene(scene: BABYLON.Scene): void;
    onKeyboardInput(event: KeyboardEvent): void;
    onMouseInput(event: MouseEvent): void;
    onMouseScroll(event: any): void;
    jump(): void;
}
