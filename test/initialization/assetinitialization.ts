import { expect } from 'chai';
import { AssetsManager } from '../../source/core/assetsmanager';
import { DummyManifestData } from '../data/urlmanifest';
import * as BABYLON from 'babylonjs';

describe('Asset initialization', () => {
    let canvas = document.createElement('canvas');
    
    let dummData = new DummyManifestData();
    let scene = new BABYLON.Scene(new BABYLON.Engine(canvas));
    let restInterface = new AssetsManager(dummData, scene);

    it('Should load manifest of assets needed', () => {
          expect(false).to.be.true;
    });

    it('Should handle failure to load assets', () => {
      expect(false).to.be.true;
    });

    it('Should callback for each individual asset loaded', () => {
      expect(false).to.be.true;
    });

    it('Should callback for all assets loaded', () => {
      expect(false).to.be.true;
    });
});