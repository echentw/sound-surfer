import { DynamicGameObject } from './GameObject';
import { Player } from './Player';
import { GameParams, HitResult } from './Interfaces';

export class Splash extends DynamicGameObject {
  private readonly color = 'green';

  private readonly playerScaleX: number;
  private playerPosition: number;

  private readonly scaleRadius: number;
  private radius: number;

  private readonly offsetScaleY: number;
  private y: number;

  private readonly preHitTime: number;

  // Timestamp (ms) when the last hit was made.
  private lastHit: number;

  private canvasWidth: number;

  constructor(canvas: HTMLCanvasElement, gameParams: GameParams) {
    super(canvas);
    this.playerScaleX = gameParams.playerScaleX;
    this.scaleRadius = gameParams.playerScaleX * 0.05;
    this.offsetScaleY = gameParams.offsetScaleY;
    this.preHitTime = gameParams.preHitTime;
    this.resize(canvas.width, canvas.height);
  }

  resize(width: number, height: number) {
    this.radius = this.scaleRadius * width;
    this.y = this.offsetScaleY * height;
    this.canvasWidth = width;
    this.playerPosition = this.playerScaleX * width;
  }

  hit(result: HitResult, songPosition: number) {
    if (result.success) {
      this.lastHit = result.timestamp;
    }
  }

  draw(songPosition: number) {
    if (this.lastHit) {
      const x = (this.lastHit - songPosition) / this.preHitTime * (this.canvasWidth - this.playerPosition) + this.playerPosition;

      const progress = (songPosition - this.lastHit) / 500.0;
      const factor = Math.max(0, 0.5 + 3.0 * progress);

      this.context.save();

      this.context.globalAlpha = 1.0 - progress;
      this.context.beginPath();
      this.context.arc(x, this.y, this.radius * factor, 0, 2 * Math.PI, false);
      this.context.fillStyle = this.color;
      this.context.fill();

      this.context.restore();

      if (progress > 1.0) {
        this.lastHit = null;
      }
    }
  }
}
