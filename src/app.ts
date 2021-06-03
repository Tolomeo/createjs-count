import settings from "./settings";
import Game from "./game";
import "./styles.css";

class App {
  static getDOMStage() {
    const canvas = document.querySelector(settings.stage);

    if (!canvas) {
      throw new Error(`Stage not found, no element is matching "${settings.stage}" selection`);
    }

    return canvas as HTMLCanvasElement;
  }

  static getStageScale() {
    return Math.min(window.innerWidth / settings.width, window.innerHeight / settings.height);
  }

  static getDevicePixelRatio() {
    return window.devicePixelRatio;
  }

  public canvas: HTMLCanvasElement;

  private stage: createjs.Stage;

  private game?: Game;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.stage = new createjs.Stage(this.canvas);
  }

  get isInitialised() {
    return Boolean(this.game);
  }

  public initialise() {
    createjs.Touch.enable(this.stage);

    createjs.Ticker.framerate = settings.framerate;

    createjs.Ticker.on("tick", () => {
      this.stage.update();
    });

    this.resize();

    this.stage.enableMouseOver();

    this.game = new Game(this.stage);

    window.addEventListener("resize", this.resize.bind(this));

    return this;
  }

  public resize() {
    const stageScale = App.getStageScale();
    const devicePxRatio = App.getDevicePixelRatio();
    // the canvas dimensions are calculated for it to extend up to meet viewport edges maintaining its ratio
    const scaledWidth = settings.width * stageScale;
    const scaledHeight = settings.height * stageScale;
    // the canvas css dimensions are set to meet the viewport dimensions
    this.canvas.style.width = `${scaledWidth}px`;
    this.canvas.style.height = `${scaledHeight}px`;
    // the canvas intrinsic dimensions are scaled instead to match the device pixels amount present in the viewport dimensions
    this.canvas.width = scaledWidth * devicePxRatio;
    this.canvas.height = scaledHeight * devicePxRatio;
    // the stage is scaled to match the scaling of canvas intrinsic dimensions
    this.stage.scaleX = stageScale * devicePxRatio;
    this.stage.scaleY = stageScale * devicePxRatio;

    return this;
  }
}

export default App;
