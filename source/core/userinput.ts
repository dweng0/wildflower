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
      fithAbility: number
}

export class Input {
      private _character: Character;
      private _keyboardMapping: KeyboardMapping;
      private _scene: BABYLON.Scene;
      private _stream: PipeStream;

      /**
       * TODO we really need to place a 'character' class that can just be told to move, the character class will then get the necessary data
       * such as the matric
       */
      constructor(stream: PipeStream) {
            // set to WASD
            this.updateKeyboardMaps({
                  forward: 87,
                  back: 83,
                  strafeLeft: 65,
                  strafeRight: 68,
                  jump: 32, // spacebar
                  target: 223, // tilde
                  firstAbility: 49, // 1
                  secondAbility: 50, // 2
                  thirdAbility: 51, // 3
                  fourthAbility: 52, // 4
                  fithAbility: 53 // 5
            })

            this._stream = stream;
      }

      updateKeyboardMaps(mapping: KeyboardMapping) {
            this._keyboardMapping = mapping;
      }

      onCharacterReady(character: Character) {
            this._character = character;
      }

      isNotReady(): boolean {
            return (this._character === undefined);
      }

      setScene(scene: BABYLON.Scene) {
            this._scene = scene;
      }

      onKeyboardInput(event: KeyboardEvent) {
            if (this.isNotReady()) {
                  return console.log('Player not ready yet...');
            }

            console.log('Player input logged, a request to move, for now just stub:');
            if (event.keyCode === this._keyboardMapping.jump) {
                  this.jump();
            }
      }

      onMouseInput(event: MouseEvent) {
            if (this._scene && !this.isNotReady()) {
                  let pickResult: BABYLON.PickingInfo = this._scene.pick(this._scene.pointerX, this._scene.pointerY);
                  if (pickResult.hit) {
                        debugger;
                        this._stream.movePlayerRequest(this._character.playerId, pickResult.pickedPoint);
                     //  this._character.moveByMouse(pickResult.pickedPoint);
                  }
            }
      }

      onMouseScroll(event: any) {
            debugger;
            if (event.wheelDelta / 120 > 0) {
                  this._character.zoomIn();
            } else {
                 this._character.zoomOut();
            }
      }

      jump() {
             console.log("jump");
      }
}