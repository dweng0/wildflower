import { expect } from 'chai';
import { Game } from '../../source/game';


describe('Game initialization', () => {
      let game = new Game('renderCanvas');

      /**
       * Testing the game to make sure it has got the canvas
       */
      it('It should have a canvas', () => {
            expect(game._canvas).to.exist;
            expect(game._canvas).to.be.an.instanceof(HTMLCanvasElement);
      });

      /**
       * Testing the loader to make sure it has loaded
       */
      it('Should have a the assets loader', () => {

      });
});
