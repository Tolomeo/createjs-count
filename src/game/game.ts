import NumberedBox from "./NumberedBox";

type GameOptions = {
  width: number;
  height: number;
};

class Game {
  private stage: createjs.Stage;

  private options: GameOptions;

  constructor(stage: createjs.Stage, options: GameOptions) {
    this.stage = stage;
    this.options = options;

    this.initialise();
    console.log(this);
  }

  private initialise() {
    // const graphics = new createjs.Graphics()
    //   .beginFill("#EBE97A")
    //   .drawRect(this.options.width / 2, this.options.height / 2, 380, 100);
    // const shape = new createjs.Shape(graphics);
    // shape.regX = 190;
    // shape.regY = 50;

    // const welcomeText = new createjs.Text("CreateJS Boilerplate", "26px Courier", "#EB4646");
    // welcomeText.regX = welcomeText.getBounds().width / 2;
    // welcomeText.regY = welcomeText.getBounds().height / 2;
    // welcomeText.x = this.options.width / 2;
    // welcomeText.y = this.options.height / 2;
    const numberedBox = new NumberedBox(88);
    numberedBox.x = Math.random() * this.options.width;
    numberedBox.y = Math.random() * this.options.height;

    this.stage.addChild(numberedBox);
  }
}

export default Game;
