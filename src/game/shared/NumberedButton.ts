import Button from "./Button";

type Props = {
  number: number;
  onClick: (numberedBox: NumberedButton) => void;
};
class NumberedButton extends createjs.Container {
  public number: number;

  private button: Button;

  constructor({ number, onClick }: Props) {
    super();
    this.number = number;
    this.button = new Button({ text: String(number), width: 50, height: 50, radius: 25 });
    this.addChild(this.button);
    this.on("click", () => onClick(this));
    this.setBounds(0, 0, 50, 50);
  }
}

export default NumberedButton;
