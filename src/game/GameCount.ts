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
    if (this.state.machine.current === "done") {
      this.props.done();
    }

    const removed = this.state.context.prev;

    if (this.buttons[removed]) {
      this.removeChild(this.buttons[removed]);
      delete this.buttons[removed];
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
      .sort((button) => button.number)
      .reverse();

    this.addChild(new Background(), ...buttons);
  }
}

export default GameCount;
