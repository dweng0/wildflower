import { DomHandler } from './preloader/dom';

export class Game {
      _canvas: HTMLCanvasElement;
      constructor(canvasId?: string) {
            console.log('Wildflower launched');
            let domHandler = new DomHandler(canvasId);
            this._canvas = domHandler.getCanvas();
      }
}

window.addEventListener('DOMContentLoaded', () => {
      // Create the game using the 'renderCanvas'
      debugger;
      let game = new Game('renderCanvas');
});

