/* eslint-disable max-classes-per-file */
import settings from "../settings";
import Button from "./shared/Button";

type Props = {
  onRestart: () => void;
};

class GameOver extends createjs.Container {
  constructor({ onRestart }: Props) {
    super();

    const background = new createjs.Shape(
      new createjs.Graphics().beginFill("blue").drawRect(0, 0, settings.width, settings.height),
    );

    const text = new createjs.Text("You won!", "26px Courier", "yellow");
    const textBounds = text.getBounds();
    text.regX = textBounds.width / 2;
    text.regY = textBounds.height / 2;
    text.x = settings.width / 2;
    text.y = settings.height / 3;

    const restartButton = new Button({ text: "Restart" });
    restartButton.x = settings.width / 2;
    restartButton.y = settings.height / 2;
    restartButton.on("click", onRestart);

    this.addChild(background, text, restartButton);
  }
}

export default GameOver;
