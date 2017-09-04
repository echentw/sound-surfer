import { DynamicGameObject } from './GameObject';

export class Wave extends DynamicGameObject {
  private readonly color = 'white';
  private readonly lineWidth = 3;

  private canvasWidth: number;
  private yOffset: number;

  // The timestamps (ms) that the wave's left and right endpoints should
  // reach the player circle.
  public start: number;
  public end: number;

  // The duration (ms) between the start and end of the wave.
  private duration: number;

  // The x-coordinate of the player circle's center.
  private playerPosition: number;

  // `playerPosition` = `playerScaleX` * (width of the canvas)
  private playerScaleX: number;

  private preHitTime: number;

  private amplitude: number;

  private sign: number;

  constructor(canvas: HTMLCanvasElement,
              crotchet: number,
              start: number,
              end: number,
              upright: boolean,
              playerScaleX: number,
              preHitTime: number) {
    super(canvas);

    this.start = start * crotchet;
    this.end = end * crotchet;
    this.duration = this.end - this.start;

    this.playerScaleX = playerScaleX;
    this.preHitTime = preHitTime;

    this.sign = upright ? 1 : -1;

    this.resize(canvas.width, canvas.height);
  }

  resize(width: number, height: number) {
    this.playerPosition = this.playerScaleX * width;
    this.yOffset = height * 0.5;
    this.canvasWidth = width;
    this.amplitude = 0.15 * this.sign * (this.end - this.start) / this.preHitTime * (width - this.playerPosition);
  }

  // y = sin(k * (x - c))
  draw(songPosition: number) {
    const x0 = (this.start - songPosition) / this.preHitTime * (this.canvasWidth - this.playerPosition) + this.playerPosition;
    const x1 = (this.end - songPosition) / this.preHitTime * (this.canvasWidth - this.playerPosition) + this.playerPosition;
    const k = Math.PI / (x1 - x0);

    this.context.beginPath();
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.color;
    this.context.moveTo(x0, this.yOffset);

    for (let x = x0; x < x1; ++x) {
      const y = this.amplitude * Math.sin(k * (x - x0)) + this.yOffset;
      this.context.lineTo(x, y);
    }
    this.context.stroke();
  }

  // Used to get the player's y-position.
  // Should only be called when this wave is passing through `playerPosition`.
  getPlayerY(songPosition: number): number {
    const x0 = (this.start - songPosition) / this.preHitTime * (this.canvasWidth - this.playerPosition) + this.playerPosition;
    const x1 = (this.end - songPosition) / this.preHitTime * (this.canvasWidth - this.playerPosition) + this.playerPosition;
    const k = Math.PI / (x1 - x0);

    return this.amplitude * Math.sin(k * (this.playerPosition - x0)) + this.yOffset;
  }
}
