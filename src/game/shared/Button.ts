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

type ButtonStatesProps = {
  text: string;
  mode?: string;
  startPosition?: number;
  loop?: boolean;
};

class ButtonStates extends createjs.MovieClip {
  out: ButtonBaseState;

  over: ButtonHoverState;

  down: ButtonActiveState;

  constructor({ text, mode, startPosition, loop }: ButtonStatesProps) {
    super(mode, startPosition, loop, { out: 0, over: 1, down: 2 });

    this.out = new ButtonBaseState({ text });
    this.over = new ButtonHoverState({ text });
    this.down = new ButtonActiveState({ text });

    this.timeline.addTween(
      createjs.Tween.get({})
        .to({ state: [{ t: this.out }] })
        .to({ state: [{ t: this.over }] }, 1)
        .to({ state: [{ t: this.down }] }, 1)
        .wait(1),
    );
  }
}

type Props = {
  text: string;
  onClick: () => unknown;
};

class Button extends createjs.Container {
  button: ButtonStates;

  buttonHelper: createjs.ButtonHelper;

  constructor({ text, onClick }: Props) {
    super();

    this.button = new ButtonStates({ text });
    this.buttonHelper = new createjs.ButtonHelper(this.button);

    this.button.on("click", onClick);

    this.addChild(this.button);
  }
}

export default Button;
