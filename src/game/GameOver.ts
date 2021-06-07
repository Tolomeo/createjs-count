/* eslint-disable max-classes-per-file */
import Sound, { Sounds } from "../sound";
import settings from "../settings";
import Text from "./shared/Text";
import Background from "./shared/Background";
import Button from "./shared/Button";

type Props = {
  restart: () => void;
  quit: () => void;
};

class GameOver extends createjs.Container {
  static sound() {
    Sound.play(Sounds.gameOver);
  }

  constructor(private props: Props) {
    super();

    const text = new Text({ text: "Congratulations", color: "#404040" });
    const textBounds = text.getBounds();
    text.regX = textBounds.width * 0.5;
    text.regY = textBounds.height * 0.5;
    text.x = settings.width * 0.5;
    text.y = settings.height * 0.3;

    const restart = new Button({ text: "Restart" });
    const restartBounds = restart.getBounds();
    restart.regX = restartBounds.width * 0.5;
    restart.regY = restartBounds.height * 0.5;
    restart.x = settings.width * 0.5;
    restart.y = settings.height * 0.5;
    restart.on("click", this.props.restart);

    const quit = new Button({ text: "Quit" });
    const quitBounds = quit.getBounds();
    quit.regX = quitBounds.width * 0.5;
    quit.regY = quitBounds.height * 0.5;
    quit.x = settings.width * 0.5;
    quit.y = settings.height * 0.66;
    quit.on("click", this.props.quit);

    GameOver.sound();

    this.addChild(new Background(), text, restart, quit);
  }
}

export default GameOver;
