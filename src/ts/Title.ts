import { StaticGameObject } from './GameObject';
import { GameParams } from './Interfaces';

export class Title extends StaticGameObject {
  private readonly color = 'grey';
  private readonly titleText: string;

  private fontSize: number;
  private xCoord: number;
  private yCoord: number;

  constructor(canvas: HTMLCanvasElement, gameParams: GameParams, titleText: string) {
    super(canvas);
    this.resize(canvas.width, canvas.height);
    this.titleText = titleText;
  }

  resize(width: number, height: number) {
    this.fontSize = width / 25;
    this.xCoord = width / 26;
    this.yCoord = height / 10;
  }

  draw() {
    this.context.font = this.fontSize + 'px Arial';
    this.context.fillStyle = this.color;
    this.context.fillText(this.titleText, this.xCoord, this.yCoord);
  }
}
