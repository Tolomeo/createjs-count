// import { createMachine, interpret, invoke, state, transition, Service } from "robot3";
import settings from "../settings";
import { createCountState } from "./state";
import Background from "./shared/Background";
import NumberedButton from "./shared/NumberedButton";

type Props = { done: () => void };

class GameCount extends createjs.Container {
  state: ReturnType<typeof createCountState>;

  buttons: Record<number, NumberedButton>;

  constructor(private props: Props) {
    super();
    this.props = props;
    this.state = createCountState(this.onStateChange);
    this.buttons = this.createNumberedButtons(this.state.context.max);
    this.render();
  }

  private onStateChange = () => {
    const { current } = this.state.machine;
    const { prev } = this.state.context;

    if (this.buttons[prev]) {
      const button = this.buttons[prev];

      button.removeAllEventListeners();

      button.fadeOutDown(() => {
        this.removeChild(button);
        if (current === "done") this.props.done();
      });

      delete this.buttons[prev];
    }
  };

  private createNumberedButtons(amount: number) {
    const buttons: { [n: number]: NumberedButton } = {};
    // eslint-disable-next-line no-plusplus
    for (let number = amount; number > 0; number--) {
      const button = new NumberedButton({ number });
      const buttonBounds = button.getBounds();
      button.x = Math.random() * (settings.width - buttonBounds.width);
      button.y = Math.random() * (settings.height - buttonBounds.height);
      button.on("click", () => this.state.send({ type: "count", number }));

      buttons[number] = button;
    }

    return buttons;
  }

  render() {
    const buttons = Object.values(this.buttons)
      .sort((b1, b2) => b1.number - b2.number)
      .reverse();

    this.addChild(new Background(), ...buttons);
  }
}

export default GameCount;
