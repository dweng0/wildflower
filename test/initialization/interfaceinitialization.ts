import * as sinon from 'sinon';
import { expect } from 'chai';
import { Interface } from '../../source/core/interface';
import {UrlManifest, ManifestItem} from '../../source/interface/urlmanifest';

describe('Api and interface initialization', () => {
      let url = "http://google.com";
      let restInterface = new Interface(url, "12", true);

      it('Should have handshake url', () => {
            expect(restInterface._handShakeUrl).to.be.a('string', 'Must have a handshake url in order to continue');
      });

      it('Should throw if no url is provided', () => {
            expect(new Interface("", "")).to.throw;
      });

     it('Should callback on handshake success', () => {
        let success = sinon.spy();
        let error = sinon.spy();

        /** the class treats 'foo.com' like a succesfull url */
        let handshakeTest = new Interface("foo.com", "12", true);
        handshakeTest.handshake(success);

        expect(success.calledOnce).to.be.true;
        expect(error.notCalled).to.be.true;
     });

     it('Should set the manifest url on succesfull handshake', () => {
        let success = sinon.spy();
        let error = sinon.spy();

        /** the class treats 'foo.com' like a succesfull url */
        let handshakeTest = new Interface("foo.com", "12", true);
        handshakeTest.handshake(success);

        expect(success.calledOnce).to.be.true;
        expect(handshakeTest._manifestUrl).to.not.be.null;
        expect(handshakeTest._manifestUrl).to.be.a('string');
     });

      it('Should callback on handshake error', () => {
        let success = sinon.spy();
        let error = sinon.spy();
        let handshakeTest = new Interface("bar.com", "12", true);
        handshakeTest.handshake(success, error);
        expect(error.calledOnce).to.be.true;
        expect(success.notCalled).to.be.true;
     });

     it('should throw if no manifest url is provided', () => {
      let manifestUrlTest = new Interface("foo.com", "12", true);
      (function(){manifestUrlTest.fetchManifest(() => {})}).should.throw;
     });

      it('Should have a manifest that matches the signature of url manifest', () => {
         let manifestTest = new Interface("foo.com", "12", true);
         let manifest;
         manifestTest._manifestUrl = "test.com";
         manifestTest.fetchManifest((receivedManifest: any) => {
           manifest = receivedManifest;
         });

         expect(manifest).to.haveOwnProperty("handshake");
         expect(manifest).to.haveOwnProperty("map");
         expect(manifest).to.haveOwnProperty("mapModels");
         expect(manifest).to.haveOwnProperty("characters");
      });
});