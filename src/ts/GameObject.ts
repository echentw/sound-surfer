abstract class GameObject {
  protected readonly context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d');
  }

  abstract resize(width: number, height: number): void;
}

export abstract class DynamicGameObject extends GameObject {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }
  abstract draw(songPosition: number): void;
}

export abstract class StaticGameObject extends GameObject {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }
  abstract draw(): void;
}
