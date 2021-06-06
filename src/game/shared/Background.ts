import settings from "../../settings";

class Background extends createjs.Shape {
  constructor() {
    super(
      new createjs.Graphics()
        .beginLinearGradientFill(["#FAC988", "#E75C5E"], [0, 1], 0, settings.width, 0, settings.height)
        .drawRect(0, 0, settings.width, settings.height),
    );

    this.setBounds(0, 0, settings.width, settings.height);
  }
}

export default Background;
