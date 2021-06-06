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
}

export default NumberedButton;
