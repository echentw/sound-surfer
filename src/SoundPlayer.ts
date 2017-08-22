export class SoundPlayer {
  private readonly id: string = Math.random().toString(36).slice(2);
  private readonly path: string;
  private songPlayer: createjs.AbstractSoundInstance;

  constructor(path: string) {
    this.path = path;
  }

  load(): Promise<null> {
    return new Promise((resolve) => {
      createjs.Sound.registerSound(this.path, this.id);
      createjs.Sound.on('fileload', (eventObj: any) => {
        if (eventObj['id'] == this.id) {
          this.songPlayer = createjs.Sound.createInstance(this.id);
          resolve();
        }
      });
    });
  }

  play() {
    this.songPlayer.play();
  }

  pause() {
    this.songPlayer.paused = true;
  }

  unpause() {
    this.songPlayer.paused = false;
  }

  stop() {
    this.songPlayer.stop();
  }
}
