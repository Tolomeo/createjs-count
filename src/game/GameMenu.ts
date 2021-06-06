/* eslint-disable max-classes-per-file */
import settings from "../settings";
import Background from "./shared/Background";
import Button from "./shared/Button";

type Props = {
  start: () => void;
};

class GameMenu extends createjs.Container {
  constructor(private props: Props) {
    super();

    const text = new createjs.Text("Menu", "26px Courier", "yellow");
    const textBounds = text.getBounds();
    text.regX = textBounds.width * 0.5;
    text.regY = textBounds.height * 0.5;
    text.x = settings.width * 0.5;
    text.y = settings.height * 0.33;

    const start = new Button({ text: "Start" });
    const startBounds = start.getBounds();
    start.regX = startBounds.width * 0.5;
    start.regY = startBounds.height * 0.5;
    start.x = settings.width * 0.5;
    start.y = settings.height * 0.5;
    start.on("click", this.props.start);

    this.addChild(new Background(), text, start);
  }
}

export default GameMenu;
