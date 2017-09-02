import { DynamicGameObject } from './GameObject';

export class Wave extends DynamicGameObject {
  private readonly context: CanvasRenderingContext2D;
  private canvasWidth: number;

  private readonly color = 'white';
  private readonly lineWidth = 7;

  public readonly w: number;

  public amplitude: number;
  public yOffset: number;
  public frequency: number;

  constructor(canvas: HTMLCanvasElement, crotchet: number) {
    super();
    this.context = canvas.getContext('2d');
    this.w = Math.PI / crotchet;
    this.resize(canvas.width, canvas.height);
  }

  resize(width: number, height: number) {
    this.amplitude = height * 0.25 * 0.5;
    this.yOffset = height * 0.5;
    this.frequency = 2 * Math.PI / width;
    this.canvasWidth = width;
  }

  draw(songPosition: number) {
    const theta = this.w * songPosition;

    this.context.beginPath();
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.color;
    this.context.moveTo(0, this.amplitude * Math.sin(theta) + this.yOffset);
    for (let x = 0; x < this.canvasWidth; ++x) {
      const y = this.amplitude * Math.sin(this.frequency * x + theta) + this.yOffset;
      this.context.lineTo(x, y);
    }
    this.context.stroke();
  }
}
