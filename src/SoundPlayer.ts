type AbstractSoundInstance = createjs.AbstractSoundInstance;

const Sound = createjs.Sound;

export class SoundPlayer {
  private readonly id: string = Math.random().toString(36).slice(2);
  private readonly path: string;
  private songPlayer: AbstractSoundInstance;

  constructor(path: string) {
    this.path = path;
  }

  load(): Promise<null> {
    return new Promise((resolve) => {
      Sound.registerSound(this.path, this.id);
      Sound.on('fileload', (eventObj: any) => {
        if (eventObj['id'] == this.id) {
          this.songPlayer = Sound.createInstance(this.id);
          resolve();
        }
      });
    });
  }

  play() {
    this.songPlayer.play();
  }

  stop() {
    this.songPlayer.stop();
  }

  pause() {
    this.songPlayer.paused = true;
  }

  unpause() {
    this.songPlayer.paused = false;
  }
}
