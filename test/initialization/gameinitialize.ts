import { expect } from 'chai';
import * as sinon from 'sinon';
import { Game } from '../../source/game';
import { AssetsManager } from '../../source/core/assetsmanager';
import { Interface } from '../../source/core/interface';

describe('Game initialization', () => {
      let game = new Game('renderCanvas');

      it('Should have a canvas', () => {
            expect(true).to.be.true;
      });

      it('Should have access to BABYLON', () => {
        expect(game.hasBabylon()).to.be.true;
      });

      it('Should have a the assets loader', () => {
          expect(game._assetsManager).to.be.instanceOf(AssetsManager);
      });

      it("should have network interface", () => {
          expect(game._interface).to.be.instanceOf(Interface);
      });

       it("Should callback when a handshake has been made with server", () => {
            let callback = sinon.spy();
            let gameTest = new Game('renderCanvas');
            gameTest.onBeforeLoad(callback);
            expect(callback.calledOnce).to.be.true;
      });

      it("should callback when assets have been loaded", () => {
            let callback = sinon.spy();
            let assetTest = new Game('renderCanvas');
            assetTest.onAssetLoad(callback);
            expect(callback.calledOnce).to.be.true;
      });

        it("should callback when individual assets have been loaded", () => {
            let callback = sinon.spy();
            let assetTest = new Game('renderCanvas');
            assetTest.onAssetLoad(callback);
            expect(callback.calledOnce).to.be.true;
      });

      it("should callback when babylon is loaded", () => {
            let callback = sinon.spy();
            let babylonTest = new Game('renderCanvas');
            babylonTest.onAssetLoad(callback);
            expect(callback.calledOnce).to.be.true;
      });
});