import { SoundPlayer } from './SoundPlayer';

// We need this class because sound effects require a lot more calls to play(),
// and they overlap sometimes.
export class SfxPlayer {
  private readonly numPlayers = 6;
  private readonly players: Array<SoundPlayer>;

  private currentId = 0;

  // TODO: need to sleep, fix this jankness tomorrow
  constructor(sfxName: string) {
    this.players = [
      new SoundPlayer(`/assets/sfx/${sfxName}.mp3`),
      new SoundPlayer(`/assets/sfx/${sfxName}.mp3`),
      new SoundPlayer(`/assets/sfx/${sfxName}.mp3`),
      new SoundPlayer(`/assets/sfx/${sfxName}.mp3`),
      new SoundPlayer(`/assets/sfx/${sfxName}.mp3`),
      new SoundPlayer(`/assets/sfx/${sfxName}.mp3`)
    ];
  }

  load() {
    return Promise.all([
      this.players[0].load(),
      this.players[1].load(),
      this.players[2].load(),
      this.players[3].load(),
      this.players[4].load(),
      this.players[5].load()
    ]);
  }

  play() {
    console.log(this.currentId);
    this.players[this.currentId].play();
    this.currentId = (this.currentId + 1) % this.numPlayers;
  }
}
