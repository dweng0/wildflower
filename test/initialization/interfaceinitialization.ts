import * as sinon from 'sinon';
import { expect } from 'chai';
import { Interface } from '../../source/core/interface';

describe('Api and interface initialization', () => {
      let restInterface;
      let url = "http://google.com";
      beforeEach(() => {
        restInterface = new Interface(url);
      });

      it('Should have an api url', () => {
            expect(false).to.be.true;
      });

     it('Should callback on handshake success', () => {
        let success = sinon.spy();
        let error = sinon.spy();
        restInterface.handshake(success, error);
        expect(success.calledOnce).to.be.true;
        expect(error.notCalled).to.be.true;
     });

      it('Should callback on handshake error', () => {
        let success = sinon.spy();
        let error = sinon.spy();
        restInterface.handshake(success, error);
        expect(error.calledOnce).to.be.true;
        expect(success.notCalled).to.be.true;
     });

     it('should provide assets manfest (json)', () => {
          let success = sinon.spy();
          let error = sinon.spy();
          restInterface.handshake();
          restInterface.fetchManifest(success, error);

          expect(success.calledOnce).to.be.true;
          expect(error.notCalled).to.be.true;
     });

       it('should provide handle request error for manifest (json)', () => {
          let success = sinon.spy();
          let error = sinon.spy();
          restInterface.handshake();
          restInterface.fetchManifest(success, error);

          expect(error.calledOnce).to.be.true;
          expect(success.notCalled).to.be.true;
     });

      it('Should handle 200 responses', () => {
        expect(false).to.be.true;
      });

      it('Should handle 300 responses', () => {
        expect(false).to.be.true;
      });

      it('Should handle 400 responses', () => {
        expect(false).to.be.true;
      });

       it('Should handle 500 responses', () => {
        expect(false).to.be.true;
      });

      it("should contain JSON", () => {
          expect(false).to.be.true;
      });
});