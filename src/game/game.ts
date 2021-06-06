import { createScreenState } from "./state";
import GameCount from "./GameCount";
import GameMenu from "./GameMenu";
import GameOver from "./GameOver";

class Game {
  private state: ReturnType<typeof createScreenState>;

  private screen: keyof ReturnType<typeof createScreenState>["machine"]["states"];

  constructor(private stage: createjs.Stage) {
    this.state = createScreenState(this.onStateChange);
    this.screen = this.state.machine.current;

    this.render();
  }

  private onStateChange = () => {
    if (this.screen === this.state.machine.current) return;

    this.screen = this.state.machine.current;
    this.render();
  };

  private start = () => this.state.send("start");

  private done = () => this.state.send("done");

  private restart = () => this.state.send("restart");

  private quit = () => this.state.send("quit");

  render() {
    this.stage.removeAllChildren();

    switch (this.screen) {
      case "menu":
        this.stage.addChild(new GameMenu({ start: this.start }));
        break;
      case "game":
        this.stage.addChild(new GameCount({ done: this.done }));
        break;
      case "over":
        this.stage.addChild(new GameOver({ restart: this.restart, quit: this.quit }));
        break;
      default:
    }
  }
}

export default Game;
