import { DynamicGameObject } from './GameObject';
import { GameParams } from './GameParams';

export class Wave extends DynamicGameObject {
  protected readonly color = 'white';
  protected readonly lineWidth = 3;

  protected canvasWidth: number;
  protected yOffset: number;

  // The timestamps (ms) that the wave's left and right endpoints should
  // reach the player circle.
  public start: number;
  public end: number;

  // The duration (ms) between the start and end of the wave.
  private duration: number;

  // The x-coordinate of the player circle's center.
  protected playerPosition: number;

  // `playerPosition` = `playerScaleX` * (width of the canvas)
  private playerScaleX: number;

  // The amount of time (ms) between when the wave enters the screen
  // and when it's supposed supposed to be hit.
  protected preHitTime: number;

  protected amplitude: number;
  private sign: number;

  constructor(canvas: HTMLCanvasElement, gameParams: GameParams,
              start: number, end: number,
              crotchet: number,
              upright: boolean) {
    super(canvas);

    this.start = start * crotchet;
    this.end = end * crotchet;
    this.duration = this.end - this.start;

    this.playerScaleX = gameParams.playerScaleX;
    this.preHitTime = gameParams.preHitTime;

    this.sign = upright ? 1 : -1;

    this.resize(canvas.width, canvas.height);
  }

  resize(width: number, height: number) {
    this.playerPosition = this.playerScaleX * width;
    this.yOffset = height * 0.5;
    this.canvasWidth = width;
    this.amplitude = 0.2 * this.sign * (this.end - this.start) / this.preHitTime * (width - this.playerPosition);
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
