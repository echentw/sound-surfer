import { SoundPlayer } from './SoundPlayer';

export class Conductor {
  private readonly songName: string;
  private readonly musicPlayer: SoundPlayer;

  constructor(songName: string) {
    this.songName = songName;
    this.musicPlayer = new SoundPlayer('assets/music/mijuku-dreamer.mp3');
  }

  load(): Promise<null> {
    return this.musicPlayer.load();
  }

  start() {
    this.musicPlayer.play();
  }

  stop() {
    this.musicPlayer.stop();
  }

  pause() {
    this.musicPlayer.pause();
  }

  unpause() {
    this.musicPlayer.unpause();
  }

  position(): number {
    return this.musicPlayer.position();
  }

  duration(): number {
    return this.musicPlayer.duration();
  }
}
