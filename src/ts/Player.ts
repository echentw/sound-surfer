import { DynamicGameObject } from './GameObject';
import { GameParams } from './Interfaces';
import { WaveController } from './WaveController';

export class Player extends DynamicGameObject {
  private readonly waveController: WaveController;

  private readonly color = 'green';

  // The player's x-coordinate.
  private readonly playerScaleX: number;
  private x: number;

  // The player circle's radius.
  private readonly scaleRadius: number;
  private radius: number;

  // The player's median y-coordinate.
  private readonly offsetScaleY: number;
  private yOffset: number;

  constructor(canvas: HTMLCanvasElement, gameParams: GameParams, waveController: WaveController) {
    super(canvas);
    this.waveController = waveController;
    this.playerScaleX = gameParams.playerScaleX;
    this.scaleRadius = gameParams.playerScaleX * 0.05;
    this.offsetScaleY = gameParams.offsetScaleY;

    this.resize(canvas.width, canvas.height);
  }

  resize(width: number, height: number) {
    this.x = this.playerScaleX * width;
    this.radius = this.scaleRadius * width;
    this.yOffset = this.offsetScaleY * height;
  }

  draw(songPosition: number) {
    const y = this.waveController.getPlayerY(songPosition);

    this.context.beginPath();
    this.context.arc(this.x, y, this.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.color;
    this.context.fill();
  }
}
