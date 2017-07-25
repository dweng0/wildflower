import { expect } from 'chai';
import { Game } from '../../source/game';
import { AssetsManager } from '../../source/core/assetsmanager';
import { Interface } from '../../source/core/interface';

describe('Game initialization', () => {
      let game = new Game('renderCanvas');

      /**
       * Testing the game to make sure it has got the canvas
       */
      it('Should have a canvas', () => {
            expect(false).to.be.true;
      });

      it('Should have access to BABYLON', () => {
        expect(false).to.be.true;
      });

      /**
       * Testing the loader to make sure it has loaded
       */
      it('Should have a the assets loader', () => {
          expect(false).to.be.true;
      });

      /**
      * Make sure the networok interface has loaded
      */
      it("should have network interface", () => {
          expect(false).to.be.true;
      });
});