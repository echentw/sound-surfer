export abstract class DynamicGameObject {
  abstract resize(width: number, height: number): void;
  abstract draw(songPosition: number): void;
}

export abstract class StaticGameObject {
  abstract resize(width: number, height: number): void;
  abstract draw(): void;
}
