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
            expect(game._canvas).to.exist;
            expect(game._canvas).to.be.an.instanceof(HTMLCanvasElement);
      });

      it('Should have access to BABYLON', () => {
            let hasBabylon = game.hasBabylon();
           expect(hasBabylon).to.equal(true);
      });

      /**
       * Testing the loader to make sure it has loaded
       */
      it('Should have a the assets loader', () => {
            expect(game._assetsManager).to.exist;
            expect(game._assetsManager).to.be.an.instanceof(AssetsManager);
      });

      /**
      * Make sure the networok interface has loaded
      */
      it("should have network interface", () => {
            expect(game._interface).to.exist;
            expect(game._interface).to.be.an.instanceof(Interface);
      });
});
