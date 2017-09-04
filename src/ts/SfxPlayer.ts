import { SoundPlayer } from './SoundPlayer';

// We need this class because sound effects require a lot more calls to play(),
// and they overlap sometimes.
export class SfxPlayer {
  private readonly numPlayers = 6;
  private readonly players = Array<SoundPlayer>();

  private currentId = 0;

  constructor(sfxName: string) {
    for (let i = 0; i < this.numPlayers; ++i) {
      this.players.push(new SoundPlayer(`/assets/sfx/${sfxName}.mp3`));
    }
  }

  load() {
    return Promise.all(this.players.map((player) => player.load()));
  }

  play() {
    this.players[this.currentId].play();
    this.currentId = (this.currentId + 1) % this.numPlayers;
  }
}
