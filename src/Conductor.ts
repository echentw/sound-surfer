import { SoundPlayer } from './SoundPlayer';

export class Conductor {
  private readonly songName: string;
  private readonly musicPlayer: SoundPlayer;

  constructor(songName: string) {
    this.songName = songName;
    this.musicPlayer = new SoundPlayer('assets/music/mijuku-dreamer.mp3');
  }

  load(): Promise<null> {
    return this.musicPlayer.load()
  }

  start() {
    this.musicPlayer.play()
  }
}
