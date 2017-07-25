import { expect } from 'chai';
import { DomHandler } from '../../source/preloader/dom';

describe('DOM Interaction', () => {
  it('Should get element by id', () => {
        let domHandler = new DomHandler();
        expect(domHandler.getCanvas()).to.equal(HTMLElement);
  });
  it('should return an element id specified by the user', () => {
      let domHandler = new DomHandler('gui');
      expect(domHandler.getCanvas()).to.equal(HTMLElement);
  });
});