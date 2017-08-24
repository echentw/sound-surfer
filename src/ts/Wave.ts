export class Wave {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  private readonly frequency = 0.01;
  private readonly color = 'white';
  private readonly width = 5;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  draw(songPosition: number) {
    const amplitude = this.canvas.height * 0.5;
    const yOffset = this.canvas.height * 0.5;
    const theta = songPosition * 0.002;

    this.context.beginPath();
    this.context.lineWidth = this.width;
    this.context.strokeStyle = this.color;

    this.context.moveTo(0, Math.sin(theta) * amplitude * 0.5 + yOffset);
    for (let x = 0; x < this.canvas.width; ++x) {
      const y = Math.sin(x * this.frequency + theta) * amplitude * 0.5 + yOffset;
      this.context.lineTo(x, y);
    }
    this.context.stroke();
  }
}
