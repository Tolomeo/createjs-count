/* eslint-disable max-classes-per-file */

type BaseProps = {
  text: string;
  color: string;
  fill: string;
  stroke: string;
  width?: number;
  height?: number;
  font?: string;
  padding?: number;
  radius?: number;
};

class ButtonBase extends createjs.Container {
  label: createjs.Text;

  shape: createjs.Shape;

  constructor({
    text,
    color,
    fill,
    stroke,
    width,
    height,
    font = "30px 'Open Sans'",
    padding = 16,
    radius = 0,
  }: BaseProps) {
    super();
    this.label = new createjs.Text(text, font, color);
    this.label.textAlign = "center";
    this.label.textBaseline = "middle";

    const labelBounds = this.label.getBounds();
    const buttonWidth = width || padding * 2 + labelBounds.width;
    const buttonHeight = height || padding * 2 + labelBounds.height;

    this.label.x = buttonWidth * 0.5;
    this.label.y = buttonHeight * 0.5;

    this.shape = new createjs.Shape(
      new createjs.Graphics()
        .beginFill(fill)
        .beginStroke(stroke)
        .drawRoundRect(0, 0, buttonWidth, buttonHeight, radius),
    );

    this.addChild(this.shape, this.label);
    this.setBounds(0, 0, buttonWidth, buttonHeight);
  }
}

type Props = Omit<BaseProps, "font" | "color" | "fill" | "stroke">;

class Button extends createjs.MovieClip {
  helper: createjs.ButtonHelper;

  constructor(props: Props) {
    super(undefined, undefined, undefined, { normal: 0, hover: 1, active: 2 });

    const normal = new ButtonBase({ ...props, color: "white", fill: "#0F1D26", stroke: "transparent" });
    const hover = new ButtonBase({ ...props, color: "white", fill: "#0F1D26", stroke: "transparent" });
    const active = new ButtonBase({ ...props, color: "white", fill: "#0F1D26", stroke: "transparent" });
    const hitArea = new createjs.Shape(
      new createjs.Graphics()
        .beginFill("#000")
        .drawRoundRect(0, 0, normal.getBounds().width, normal.getBounds().height, 0),
    );

    this.timeline.addTween(
      createjs.Tween.get({})
        .to({ state: [{ t: normal }] })
        .to({ state: [{ t: hover }] }, 1)
        .to({ state: [{ t: active }] }, 1)
        .wait(1),
    );

    this.helper = new createjs.ButtonHelper(this, "normal", "hover", "active", false, hitArea);

    // this.on("rollover", () => {
    //   createjs.Tween.get(this, { override: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 300, createjs.Ease.circOut);
    // });

    // this.on("rollout", () => {
    //   createjs.Tween.get(this, { override: true }).to({ scaleX: 1, scaleY: 1 }, 300, createjs.Ease.circOut);
    // });
  }
}

export default Button;
