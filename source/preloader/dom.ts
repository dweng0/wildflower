import * as test from 'ts-node';
import 'jsdom';
import 'jsdom-global';

export class DomHandler {
      defaultElementId: string = 'gui';
      private element: HTMLCanvasElement;
      constructor(id?: string) {
            let elementId = (id) ? id : this.defaultElementId
            this.element = <HTMLCanvasElement>document.getElementById(elementId);
      }

      getCanvas(): HTMLCanvasElement {
            return this.element;
      }
}