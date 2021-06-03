/* eslint-disable max-classes-per-file */
import { numberedBox } from "../settings";

class NumberedBoxGraphics extends createjs.MovieClip {
  static text(number: string) {
    const text = new createjs.Text(number, numberedBox.font, numberedBox.color);
    text.textAlign = "center";
    text.textBaseline = "middle";
    text.x = numberedBox.width * 0.5;
    text.y = numberedBox.height * 0.5;

    return text;
  }

  static shape() {
    const shape = new createjs.Shape(
      new createjs.Graphics()
        .beginStroke(numberedBox.stroke)
        .beginFill(numberedBox.fill)
        .drawRect(0, 0, numberedBox.width, numberedBox.height),
    );

    return shape;
  }

  constructor(number: string) {
    super();

    this.timeline.addTween(createjs.Tween.get(NumberedBoxGraphics.text(number)).wait(1));
    this.timeline.addTween(createjs.Tween.get(NumberedBoxGraphics.shape()).wait(1));
  }
}

type Props = {
  number: number;
  onClick: (numberedBox: NumberedBox) => void;
};
class NumberedBox extends createjs.Container {
  public number: number;

  constructor({ number, onClick }: Props) {
    super();
    this.number = number;

    this.addChild(new NumberedBoxGraphics(String(number)));

    this.setBounds(0, 0, numberedBox.width, numberedBox.height);

    this.on("click", () => onClick(this));
  }
}

export default NumberedBox;
