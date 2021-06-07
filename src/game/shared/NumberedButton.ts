import Sound, { Sounds } from "../../sound";
import Button from "./Button";

type Props = {
  number: number;
};
class NumberedButton extends createjs.Container {
  public number: number;

  private button: Button;

  constructor({ number }: Props) {
    super();
    this.number = number;
    this.button = new Button({ text: String(number) });
    this.addChild(this.button);
  }

  fadeOutDown(onComplete: () => void) {
    Sound.play(Sounds.fadeOut);
    createjs.Tween.get(this.button).to({ y: 50, alpha: 0 }, 500).call(onComplete);
  }
}

export default NumberedButton;
