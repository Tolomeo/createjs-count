/* eslint-disable max-classes-per-file */

const pythagorean = (sideA: number, sideB: number) => Math.sqrt(sideA ** 2 + sideB ** 2);

type BaseProps = {
  text: string;
  color: string;
  fill: string;
};

const size = 50;
const font = "30px 'Open Sans'";
class ButtonBase extends createjs.Container {
  label: createjs.Text;

  labelOutline: createjs.Text;

  area: createjs.Shape;

  shape: createjs.Shape;

  constructor({ text, color, fill }: BaseProps) {
    super();
    this.label = new createjs.Text(text, font, color);

    const hypotenuse = pythagorean(size, size);
    const dimensions = {
      width: Math.max(this.label.getMeasuredWidth(), hypotenuse),
      height: Math.max(this.label.getMeasuredHeight(), hypotenuse),
    };
    const center = { x: dimensions.width * 0.5, y: dimensions.height * 0.5 };

    this.area = new createjs.Shape(new createjs.Graphics().drawRect(0, 0, dimensions.width, dimensions.height));

    this.label.textAlign = "center";
    this.label.textBaseline = "middle";
    this.label.x = center.x;
    this.label.y = center.y;

    this.labelOutline = this.label.clone();
    this.labelOutline.color = fill;
    this.labelOutline.outline = 3;

    this.shape = new createjs.Shape(new createjs.Graphics().beginFill(fill).drawRect(0, 0, size, size));
    this.shape.regX = size * 0.5;
    this.shape.regY = size * 0.5;
    this.shape.x = center.x;
    this.shape.y = center.y;
    this.shape.rotation = 45;

    this.setBounds(0, 0, dimensions.width, dimensions.height);
    this.addChild(this.area, this.shape, this.labelOutline, this.label);
  }
}

type Props = {
  text: string;
};

class Button extends createjs.MovieClip {
  helper: createjs.ButtonHelper;

  constructor(props: Props) {
    super(undefined, undefined, undefined, { normal: 0, hover: 1, active: 2 });

    const normal = new ButtonBase({ ...props, color: "white", fill: "#4C4C4C" });
    const hover = new ButtonBase({ ...props, color: "white", fill: "#606060" });
    const active = new ButtonBase({ ...props, color: "white", fill: "#404040" });

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
  }
}

export default Button;
