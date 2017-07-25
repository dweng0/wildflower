import { expect } from 'chai';
import { DomHandler } from '../../source/preloader/dom';

describe('DOM Interaction', () => {

  let domHandler = new DomHandler();
  domHandler.element = document.createElement('canvas');
  domHandler.element.id = "renderCanvas";

  it('Should get element by id', () => {
      expect(false).to.be.true;
  });
  it('should return an element id specified by the user', () => {
       expect(false).to.be.true;
  });
});