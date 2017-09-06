import * as $ from 'jquery';
import * as _ from 'lodash';

import { SoundPlayer } from './SoundPlayer';
import { SongData, beatmaps } from './data/SongData';

export class Conductor {
  public songData: SongData;
  private musicPlayer: SoundPlayer;

  constructor(songName: string) {
    this.songData = _.find(beatmaps, {'name': songName});
    this.musicPlayer = new SoundPlayer(`assets/music/${this.songData.tag}.mp3`);
  }

  load(): Promise<string> {
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
