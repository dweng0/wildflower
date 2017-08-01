import { expect } from 'chai';
import * as sinon from 'sinon';
import { Game } from '../../source/game';
import { AssetsManager } from '../../source/core/assetsmanager';
import { Interface } from '../../source/core/interface';

describe('Game initialization', () => {
      let game = new Game("12", 'renderCanvas');

      it('Should have a canvas', () => {
            expect(false).to.be.true;
      });

      it('Should have access to BABYLON', () => {
        expect(game.hasBabylon()).to.be.true;
      });

      it('Should have an instance of the assets loader', () => {
          expect(game._assetsManager).to.be.instanceOf(AssetsManager);
      });

      it("should have network interface", () => {
          expect(game._interface).to.be.instanceOf(Interface);
      });

      it("Expect onbefore load to be called ", () => {
            game.onBeforeLoad = function(){console.log('test')}
            sinon.spy(game, "onBeforeLoad");
            expect(game.onBeforeLoad).to.have.been.called;
      });

      it("should have called on before load", () => {
          expect(false).to.be.true;
      });

      it("should have called onbeforebabylonload", () => {
         expect(false).to.be.true;
      });

      it("should set engine and scene", () => {
         expect(false).to.be.true;
      });

      it("Should sucessfully load assets ", () => {
           expect(false).to.be.true;
      });

});