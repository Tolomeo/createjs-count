/* eslint-disable max-classes-per-file */

type ButtonBaseProps = {
  text: string;
  color: string;
  fill: string;
  padding?: number;
  radius?: number;
};

class ButtonBase extends createjs.Container {
  constructor({ text, color, fill, padding = 16, radius = 0 }: ButtonBaseProps) {
    super();
    const label = new createjs.Text(text, "26px Courier", color);
    const labelBounds = label.getBounds();
    label.textAlign = "center";
    label.textBaseline = "middle";

    const buttonWidth = padding * 2 + labelBounds.width;
    const buttonHeight = padding * 2 + labelBounds.height;

    label.x = buttonWidth / 2;
    label.y = buttonHeight / 2;

    const button = new createjs.Shape(
      new createjs.Graphics().beginFill(fill).drawRoundRect(0, 0, buttonWidth, buttonHeight, radius),
    );

    this.addChild(button, label);
    this.setBounds(0, 0, buttonWidth, buttonHeight);
  }
}

type ButtonStateProps = {
  text: string;
};

class ButtonHoverState extends ButtonBase {
  constructor({ text }: ButtonStateProps) {
    super({ text, color: "black", fill: "yellow" });
  }
}

class ButtonActiveState extends ButtonBase {
  constructor({ text }: ButtonStateProps) {
    super({ text, color: "black", fill: "red" });
  }
}

class ButtonBaseState extends ButtonBase {
  constructor({ text }: ButtonStateProps) {
    super({ text, color: "black", fill: "green" });
  }
}

type Props = {
  text: string;
  onClick: () => unknown;
};

class Button extends createjs.MovieClip {
  helper: createjs.ButtonHelper;

  constructor({ text, onClick }: Props) {
    super(undefined, undefined, undefined, { base: 0, hover: 1, active: 2 });

    this.timeline.addTween(
      createjs.Tween.get({})
        .to({ state: [{ t: new ButtonBaseState({ text }) }] })
        .to({ state: [{ t: new ButtonHoverState({ text }) }] }, 1)
        .to({ state: [{ t: new ButtonActiveState({ text }) }] }, 1)
        .wait(1),
    );

    this.helper = new createjs.ButtonHelper(this, "base", "hover", "active");

    this.on("click", onClick);
  }
}

export default Button;
