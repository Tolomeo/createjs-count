import { createMachine, interpret, state, transition, Service } from "robot3";
// import settings from "../settings";
import GameCount from "./GameCount";
import GameMenu from "./GameMenu";
import GameOver from "./GameOver";

const gameMachine = createMachine("menu", {
  menu: state(transition("start", "count")),
  count: state(transition("done", "over")),
  over: state(transition("restart", "count"), transition("quit", "menu")),
});

class Game {
  private stage: createjs.Stage;

  private state: Service<typeof gameMachine>;

  private screen: keyof typeof gameMachine["states"];

  constructor(stage: createjs.Stage) {
    this.stage = stage;
    this.state = interpret(gameMachine, this.onStateChange.bind(this));
    this.screen = this.state.machine.current;

    this.render();
  }

  private onStateChange() {
    if (this.screen === this.state.machine.current) return;

    this.screen = this.state.machine.current;
    this.render();
  }

  render() {
    this.stage.removeAllChildren();

    switch (this.screen) {
      case "menu":
        this.stage.addChild(new GameMenu({ start: () => this.state.send("start") }));
        break;
      case "count":
        this.stage.addChild(new GameCount({ done: () => this.state.send("done") }));
        break;
      case "over":
        this.stage.addChild(
          new GameOver({ restart: () => this.state.send("restart"), quit: () => this.state.send("quit") }),
        );
        break;
      default:
    }
  }
}

export default Game;
