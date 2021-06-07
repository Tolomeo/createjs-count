/* eslint-disable max-classes-per-file */
import Sound, { Sounds } from "../../sound";
import Text from "./Text";

const pythagorean = (sideA: number, sideB: number) => Math.sqrt(sideA ** 2 + sideB ** 2);

type BaseProps = {
  text: string;
  color: string;
  fill: string;
};

class ButtonBase extends createjs.Container {
  text: createjs.Text;

  outline: createjs.Text;

  area: createjs.Shape;

  shape: createjs.Shape;

  constructor({ text, color, fill }: BaseProps) {
    super();
    this.text = new Text({ text: text.toUpperCase(), color });

    const hypotenuse = pythagorean(50, 50);
    const dimensions = {
      width: Math.max(this.text.getMeasuredWidth(), hypotenuse),
      height: Math.max(this.text.getMeasuredHeight(), hypotenuse),
    };
    const center = { x: dimensions.width * 0.5, y: dimensions.height * 0.5 };

    this.area = new createjs.Shape(new createjs.Graphics().drawRect(0, 0, dimensions.width, dimensions.height));

    this.text.textAlign = "center";
    this.text.textBaseline = "middle";
    this.text.x = center.x;
    this.text.y = center.y;

    this.outline = this.text.clone();
    this.outline.color = fill;
    this.outline.outline = 3;

    this.shape = new createjs.Shape(new createjs.Graphics().beginFill(fill).drawRect(0, 0, 50, 50));
    this.shape.regX = 25;
    this.shape.regY = 25;
    this.shape.x = center.x;
    this.shape.y = center.y;
    this.shape.rotation = 45;

    this.setBounds(0, 0, dimensions.width, dimensions.height);
    this.addChild(this.area, this.shape, this.outline, this.text);
  }
}

type Props = {
  text: string;
};

class Button extends createjs.MovieClip {
  static sound() {
    Sound.play(Sounds.click);
  }

  helper: createjs.ButtonHelper;

  constructor({ text }: Props) {
    super(undefined, undefined, undefined, { normal: 0, hover: 1, active: 2 });

    const normal = new ButtonBase({ text, color: "white", fill: "#4C4C4C" });
    const hover = new ButtonBase({ text, color: "white", fill: "#606060" });
    const active = new ButtonBase({ text, color: "white", fill: "#404040" });

    this.timeline.addTween(
      createjs.Tween.get({})
        .to({ state: [{ t: normal }] })
        .to({ state: [{ t: hover }] }, 1)
        .to({ state: [{ t: active }] }, 1)
        .wait(1),
    );

    const bounds = normal.getBounds();
    const hitArea = new createjs.Shape(
      new createjs.Graphics().beginFill("#000").drawRect(bounds.x, bounds.y, bounds.width, bounds.height),
    );
    this.helper = new createjs.ButtonHelper(this, "normal", "hover", "active", false, hitArea);

    this.on("click", Button.sound);
  }
}

export default Button;
