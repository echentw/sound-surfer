import { DynamicGameObject } from './GameObject';

export class Player extends DynamicGameObject {
  private readonly color = 'green';

  private readonly scaleX: number;
  private readonly scaleRadius: number;

  private x: number;
  private radius: number;

  private yOffset: number;

  constructor(canvas: HTMLCanvasElement, playerScaleX: number) {
    super(canvas)
    this.scaleX = playerScaleX;
    this.scaleRadius = this.scaleX * 0.05;
    this.resize(canvas.width, canvas.height);
  }

  resize(width: number, height: number) {
    this.x = this.scaleX * width;
    this.radius = this.scaleRadius * width;
    this.yOffset = height * 0.5;
  }

  draw(songPosition: number) {
    this.context.beginPath();
    this.context.arc(this.x, this.yOffset, this.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.color;
    this.context.fill();
  }
}
