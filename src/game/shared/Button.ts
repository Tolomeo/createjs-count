/* eslint-disable max-classes-per-file */

type BaseProps = {
  text: string;
  color: string;
  fill: string;
  width?: number;
  height?: number;
  font?: string;
  padding?: number;
  radius?: number;
};

class ButtonBase extends createjs.Container {
  constructor({ text, color, fill, width, height, font = "30px Lato", padding = 16, radius = 0 }: BaseProps) {
    super();
    const label = new createjs.Text(text, font, color);
    const labelBounds = label.getBounds();
    label.textAlign = "center";
    label.textBaseline = "middle";

    const buttonWidth = width || padding * 2 + labelBounds.width;
    const buttonHeight = height || padding * 2 + labelBounds.height;

    label.x = buttonWidth / 2;
    label.y = buttonHeight / 2;

    const button = new createjs.Shape(
      new createjs.Graphics().beginFill(fill).drawRoundRect(0, 0, buttonWidth, buttonHeight, radius),
    );

    this.addChild(button, label);
    this.setBounds(0, 0, buttonWidth, buttonHeight);
  }
}

type Props = Omit<BaseProps, "color" | "fill">;

class Button extends createjs.MovieClip {
  helper: createjs.ButtonHelper;

  constructor(props: Props) {
    super(undefined, undefined, undefined, { normal: 0, hover: 1, active: 2 });

    const normal = new ButtonBase({ ...props, color: "black", fill: "yellow" });
    const hover = new ButtonBase({ ...props, color: "black", fill: "red" });
    const active = new ButtonBase({ ...props, color: "black", fill: "green" });

    this.timeline.addTween(
      createjs.Tween.get({})
        .to({ state: [{ t: normal }] })
        .to({ state: [{ t: hover }] }, 1)
        .to({ state: [{ t: active }] }, 1)
        .wait(1),
    );

    this.helper = new createjs.ButtonHelper(this, "normal", "hover", "active", false, normal);

    this.on("rollover", () => {
      createjs.Tween.get(this, { override: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 300, createjs.Ease.circOut);
    });

    this.on("rollout", () => {
      createjs.Tween.get(this, { override: true }).to({ scaleX: 1, scaleY: 1 }, 300, createjs.Ease.circOut);
    });
  }
}

export default Button;
