/* eslint-disable max-classes-per-file */
import settings from "../settings";
import Button from "./shared/Button";

// class RestartButton extends createjs.Container {
//   static label() {
//     const label = new createjs.Text("Restart", "bold 24px Arial", "#FFFFFF");
//     label.name = "label";
//     label.textAlign = "center";
//     label.textBaseline = "middle";
//     label.x = 150 / 2;
//     label.y = 60 / 2;

//     return label;
//   }

//   static background() {
//     const background = new createjs.Shape();
//     background.name = "background";
//     background.graphics.beginFill("red").drawRoundRect(0, 0, 150, 60, 10);

//     return background;
//   }

//   constructor() {
//     super();

//     this.addChild(RestartButton.background(), RestartButton.label());
//     this.setBounds(0, 0, 150, 60);
//   }
// }

type Props = {
  onRestart: () => void;
};

class GameOver extends createjs.Container {
  constructor({ onRestart }: Props) {
    super();

    const background = new createjs.Shape(
      new createjs.Graphics().beginFill("blue").drawRect(0, 0, settings.width, settings.height),
    );
    // background.x = 0;
    // shape.regX = 10;
    // shape.regY = 50;

    const text = new createjs.Text("You won!", "26px Courier", "yellow");
    const textBounds = text.getBounds();
    text.regX = textBounds.width / 2;
    text.regY = textBounds.height / 2;
    text.x = settings.width / 2;
    text.y = settings.height / 3;

    const restartButton = new Button({ text: "Hey button", onClick: onRestart });
    restartButton.regX = restartButton.getBounds().width / 2;
    restartButton.regY = restartButton.getBounds().height / 2;
    restartButton.x = settings.width / 2;
    restartButton.y = settings.height / 2;

    this.addChild(background, text, restartButton);
  }
}

export default GameOver;
