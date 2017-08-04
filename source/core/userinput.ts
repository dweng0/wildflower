import * as BABYLON from 'babylonjs';
import { Character } from './character';

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

      /**
       * TODO we really need to place a 'character' class that can just be told to move, the character class will then get the necessary data
       * such as the matric
       */
      constructor() {
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

      onWindowInput(event: KeyboardEvent) {
            if (this.isNotReady()) {
                  return console.log('Player not ready yet...');
            }

            console.log('Player input logged, a request to move, for now just stub:');

            if (event.keyCode === this._keyboardMapping.forward) {
                  this.forward();
            };

            if (event.keyCode === this._keyboardMapping.back) {
                  this.back();
            }
            if (event.keyCode === this._keyboardMapping.strafeLeft) {
                  this.left();
            }
            if (event.keyCode === this._keyboardMapping.strafeRight) {
                  this.right();
            }
            if (event.keyCode === this._keyboardMapping.jump) {
                  this.jump();
            }
      }

      left() {
            console.log('left');
            this._character.moveLeftRight(-8);
      }

      right() {
            console.log("right");
            this._character.moveLeftRight(8);
      }

      jump() {
             console.log("jump");
      }
      /**
       * These are stubs this shoudl call an interface to ask the server rather then directly move the character
       */
      forward() {
             console.log("forward");
             this._character.moveForwardBackward(8);
      }

      back() {
              console.log("Backward");
             this._character.moveForwardBackward(-8);
      }
}