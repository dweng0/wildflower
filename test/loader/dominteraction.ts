import { expect } from 'chai';
import { DomHandler } from '../../source/preloader/dom';

describe('DOM Interaction', () => {

  let domHandler = new DomHandler();
  domHandler.element = document.createElement('canvas');
  domHandler.element.id = "renderCanvas";

  it('Should get element by id', () => {
        expect(domHandler.getCanvas()).to.equal(HTMLCanvasElement);
  });
  it('should return an element id specified by the user', () => {
      let domHandler = new DomHandler('renderCanvas');
      expect(domHandler.getCanvas()).to.equal(HTMLCanvasElement);
  });
});