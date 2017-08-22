export class SoundPlayer {
  id: string = Math.random().toString(36).slice(2)
  songPlayer: createjs.AbstractSoundInstance

  load(path: string): Promise<null> {
    return new Promise((resolve) => {
      createjs.Sound.registerSound(path, this.id);
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
