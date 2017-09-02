export abstract class DynamicGameObject {
  abstract resize(width: number, height: number): void;
  abstract draw(songPosition: number): void;
}

abstract class StaticGameObject {
  abstract resize(width: number, height: number): void;
  abstract draw(): void;
}
