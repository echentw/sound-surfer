import { StaticGameObject } from './GameObject';

export class Midline extends StaticGameObject {
  private readonly context: CanvasRenderingContext2D;

  private readonly width = 5;
  private readonly color = 'grey';

  private canvasWidth: number;
  private y: number;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.context = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.y = canvas.height * 0.5;
  }

  resize(width: number, height: number) {
    this.canvasWidth = width;
    this.y = height * 0.5;
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
