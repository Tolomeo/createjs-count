import fadeOutFx from "./fadeout.ogg";
import gameOverFx from "./gameover.ogg";
import clickFx from "./click.ogg";

export enum Sounds {
  click = "click",
  fadeOut = "fadeOut",
  gameOver = "gameOver",
}

class Sound {
  static load() {
    createjs.Sound.registerSound(clickFx, Sounds.click);
    createjs.Sound.registerSound(fadeOutFx, Sounds.fadeOut);
    createjs.Sound.registerSound(gameOverFx, Sounds.gameOver);
  }

  static play(sound: Sounds) {
    createjs.Sound.play(sound);
  }
}

export default Sound;
