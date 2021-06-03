import settings from "../settings";
import GameOverScreen from "./GameOver";
import NumberedBox from "./NumberedBox";

class Game {
  private stage: createjs.Stage;

  private numberedBoxes: NumberedBox[];

  constructor(stage: createjs.Stage) {
    this.stage = stage;
    this.numberedBoxes = [];

    this.start();
  }

  private getNumberedBoxes(amount: number) {
    const boxes = [];
    // eslint-disable-next-line no-plusplus
    for (let number = amount; number > 0; number--) {
      const box = new NumberedBox({ number, onClick: this.onNumberedBoxClick.bind(this) });
      const boxBounds = box.getBounds();
      box.x = Math.random() * (settings.width - boxBounds.width);
      box.y = Math.random() * (settings.height - boxBounds.height);

      boxes.push(box);
    }

    return boxes;
  }

  private onNumberedBoxClick(numberedBox: NumberedBox) {
    const { numberedBoxes } = this;

    if (numberedBox === numberedBoxes[numberedBoxes.length - 1]) {
      this.stage.removeChild(numberedBoxes.pop()!);
    }

    if (!numberedBoxes.length) {
      this.renderGameOver();
    }
  }

  start() {
    this.numberedBoxes = this.getNumberedBoxes(1);
    this.renderNumberedBoxes();
  }

  restart() {
    this.stage.removeAllChildren();
    this.start();
  }

  renderNumberedBoxes() {
    this.stage.addChild(...this.numberedBoxes);
  }

  renderGameOver() {
    this.stage.addChild(new GameOverScreen({ onRestart: this.restart.bind(this) }));
  }
}

export default Game;
