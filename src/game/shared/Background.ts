import settings from "../../settings";

class Background extends createjs.Shape {
  constructor() {
    super(
      new createjs.Graphics()
        .beginLinearGradientFill(["#183849", "#69D6A8"], [0, 1], 0, settings.width, 0, settings.height)
        .drawRect(0, 0, settings.width, settings.height),
    );

    this.setBounds(0, 0, settings.width, settings.height);
  }
}

export default Background;
