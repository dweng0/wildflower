import { DomHandler } from './preloader/dom';
import 'jsdom';
import 'jsdom-global';

export class Game {
      _canvas: HTMLCanvasElement;
      constructor(canvasId?: string) {
            console.log('Wildflower launched');
            let domHandler = new DomHandler(canvasId);
            this._canvas = domHandler.getCanvas();
      }
}

