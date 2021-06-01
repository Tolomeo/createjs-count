/* eslint-disable max-classes-per-file */

class Box extends createjs.MovieClip {
  text: createjs.Text;

  shape: createjs.Shape;

  constructor(text: string) {
    super();

    this.text = new createjs.Text(text, "30px 'Arial'", "white");
    this.text.textAlign = "center";
    this.text.lineHeight = 50;
    this.text.lineWidth = 50;
    this.text.setTransform(25, 15);
    this.timeline.addTween(createjs.Tween.get(this.text).wait(1));

    this.shape = new createjs.Shape();
    this.shape.graphics.beginStroke("white").drawRect(0, 0, 50, 50);
    this.timeline.addTween(createjs.Tween.get(this.shape).wait(1));
  }
}

class NumberedBox extends createjs.Container {
  number: number;

  constructor(number: number) {
    super();
    this.number = number;
    this.addChild(new Box(String(number)));
  }
}

export default NumberedBox;
