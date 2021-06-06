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
    this.state = interpret(gameMachine, this.onStateChange);
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
      case "count":
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
