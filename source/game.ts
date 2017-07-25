export class Game {
  constructor(canvasElement: string) {
  }

  createScene(): void {
  }

  animate(): void {
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Create the game using the 'renderCanvas'
  let game = new Game('renderCanvas');

  // Create the scene
  game.createScene();

  // start animation
  game.animate();
});