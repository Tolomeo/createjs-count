type Props = {
  text: string;
  color: string;
};

class Text extends createjs.Text {
  constructor({ text, color }: Props) {
    super(text, "30px 'Open Sans'", color);
  }
}

export default Text;
