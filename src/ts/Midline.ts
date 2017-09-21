import { StaticGameObject } from './GameObject';
import { GameParams } from './Interfaces';

export class Midline extends StaticGameObject {
  private readonly width = 3;
  private readonly color = 'white';

  private canvasWidth: number;

  private scaleY: number;
  private y: number;

  constructor(canvas: HTMLCanvasElement, gameParams: GameParams) {
    super(canvas);
    this.scaleY = gameParams.offsetScaleY;
    this.resize(canvas.width, canvas.height);
  }

  resize(width: number, height: number) {
    this.canvasWidth = width;
    this.y = this.scaleY * height;
  }

  draw() {
    this.context.beginPath();
    this.context.lineWidth = this.width;
    this.context.strokeStyle = this.color;
    this.context.moveTo(0, this.y);
    this.context.lineTo(this.canvasWidth, this.y);
    this.context.stroke();
  }
}
