// import { createMachine, interpret, invoke, state, transition, Service } from "robot3";
import settings from "../settings";
import Background from "./shared/Background";
import NumberedButton from "./shared/NumberedButton";

type Props = { done: () => void };

class GameCount extends createjs.Container {
  private props: Props;

  private numberedButtons: NumberedButton[];

  constructor(props: Props) {
    super();
    this.props = props;
    this.numberedButtons = this.getNumberedButtons(10);
    this.render();
  }

  private getNumberedButtons(amount: number) {
    const boxes = [];
    // eslint-disable-next-line no-plusplus
    for (let number = amount; number > 0; number--) {
      const button = new NumberedButton({ number, onClick: this.onNumberedButtonClick.bind(this) });
      const buttonBounds = button.getBounds();
      button.x = Math.random() * (settings.width - buttonBounds.width);
      button.y = Math.random() * (settings.height - buttonBounds.height);

      boxes.push(button);
    }

    return boxes;
  }

  private onNumberedButtonClick(numberedBox: NumberedButton) {
    const { numberedButtons } = this;

    if (numberedBox === numberedButtons[numberedButtons.length - 1]) {
      this.removeChild(numberedButtons.pop()!);
    }

    if (!numberedButtons.length) {
      this.props.done();
    }
  }

  render() {
    this.addChild(new Background(), ...this.numberedButtons);
  }
}

export default GameCount;
