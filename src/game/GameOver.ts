/* eslint-disable max-classes-per-file */
import settings from "../settings";
import Background from "./shared/Background";
import Button from "./shared/Button";

type Props = {
  restart: () => void;
  quit: () => void;
};

class GameOver extends createjs.Container {
  constructor(private props: Props) {
    super();

    const text = new createjs.Text("You won!", "26px Courier", "yellow");
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

    createjs.Sound.play("gameOver");

    this.addChild(new Background(), text, restart, quit);
  }
}

export default GameOver;
