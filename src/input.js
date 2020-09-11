export default class InputHandler {
  constructor(character, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          character.moveLeft();
          break;

        case 38:
          character.moveUp();
          break;

        case 39:
          character.moveRight();
          break;

        case 40:
          character.moveDown();
          break;

        case 27:
          game.togglePause();
          break;

        case 32:
          game.start();
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (character.speed < 0) character.stop();
          break;

        case 38:
          if (character.speed < 0) character.stop();
          break;

        case 39:
          if (character.speed > 0) character.stop();
          break;
        
        case 40:
          if (character.speed < 0) character.stop();
          break;
      }
    });
  }
}
