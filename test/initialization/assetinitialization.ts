import * as chai from 'chai';
import * as ChaiAsPromise from 'chai-as-promised';
import * as sinonChai from 'sinon-chai'
import { AssetsManager } from '../../source/core/assetsmanager';
import { DummyManifestData } from '../data/urlmanifest';
import * as BABYLON from 'babylonjs';

chai.use(ChaiAsPromise)
chai.use(sinonChai)

let expect = chai.expect;


describe('Asset initialization', () => {
    let canvas = document.createElement('canvas');
    let dummData = new DummyManifestData();
    let scene = new BABYLON.Scene(new BABYLON.Engine(canvas));
    let asset = new AssetsManager(dummData, scene);
    it('Should eventually reject', () => {
      expect(asset.loadInstanceAssets("test")).to.eventually.be.rejected;
    });

    it('Should handle failure to load assets', () => {
      expect(asset.loadInstanceAssets("test", true)).to.eventually.have.property("tested")
    });

    it('Should callback for each individual asset loaded', () => {
      expect(false).to.be.true;
    });

    it('Should callback for all assets loaded', () => {
      expect(false).to.be.true;
    });
});