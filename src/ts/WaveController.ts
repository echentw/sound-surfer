import * as Collections from 'typescript-collections';

import { PreWave } from './PreWave';
import { PostWave } from './PostWave';
import { Wave } from './Wave';
import { Conductor } from './Conductor';
import { GameParams } from './GameParams';
import { Note } from './data/Beatmaps';
import { HitType, ScoreKeeper } from './ScoreKeeper';

enum Endpoint {
  Start,
  End
}

class WaveQueue extends Collections.Queue<Wave> {
  peekTime(endpoint: Endpoint) {
    let time: number;
    switch(endpoint) {
      case Endpoint.Start: {
        time = this.peek().start;
        break;
      }
      case Endpoint.End: {
        time = this.peek().end;
        break;
      }
    }
    return time;
  }
}

export class WaveController {
  private canvas: HTMLCanvasElement;

  // `cosmeticWaves` are the wave queues used to keep track of waves to be rendered.
  private readonly numCosmeticWaveQueues = 5

  // `hittableWaves` are the wave queues used to keep track of which waves can be hit.
  private readonly numHittableWaveQueues = 3

  // cosmeticWaves[0]: haven't been rendered yet.
  // cosmeticWaves[1]: currently being rendered, but have not passed the player yet.
  // cosmeticWaves[2]: have passed the player.
  // cosmeticWaves[3]: aren't being used to compute the player's y-position.
  // cosmeticWaves[4]: aren't being rendered, essentially garbage.
  private readonly cosmeticWaves = Array<WaveQueue>(this.numCosmeticWaveQueues);

  // hittableWaves[0]: cannot be hit yet.
  // hittableWaves[1]: can be hit.
  // hittableWaves[1]: cannot be hit anymore, essentially garbage.
  private readonly hittableWaves = Array<WaveQueue>(this.numHittableWaveQueues);


  // The number of milliseconds that the wave stays on the screen before it needs to get hit.
  private readonly preHitTime: number;

  // Time (in milliseconds) that the player has before and after the wave is supposed
  // to be hit, to hit the wave.
  private hitMargin = 100;

  // The number of milliseconds in a beat of the song.
  private crotchet: number;

  private gameParams: GameParams;

  // The wave that the player is currently surfing on.
  private playerWave: Wave;
  private yOffset: number;

  // Keeps the score.
  private scoreKeeper: ScoreKeeper;

  constructor(canvas: HTMLCanvasElement,
              conductor: Conductor,
              gameParams: GameParams,
              scoreKeeper: ScoreKeeper) {
    this.canvas = canvas;
    this.crotchet = conductor.songData.crotchet;
    this.gameParams = gameParams;
    this.cosmeticWaves[0] = this.loadBeatmap(conductor.songData.beatmap);
    for (let i = 1; i < this.numCosmeticWaveQueues; ++i) {
      this.cosmeticWaves[i] = new WaveQueue();
    }
    this.hittableWaves[0] = this.loadBeatmap(conductor.songData.beatmap);
    for (let i = 1; i < this.numHittableWaveQueues; ++i) {
      this.hittableWaves[i] = new WaveQueue();
    }
    this.scoreKeeper = scoreKeeper;
  }

  resize(width: number, height: number) {
    this.yOffset = height * this.gameParams.offsetScaleY;
    this.cosmeticWaves.forEach((waveQueue) => {
      waveQueue.forEach((wave) => wave.resize(width, height));
    });
  }

  draw(songPosition: number) {
    this.update(songPosition);
    this.cosmeticWaves.slice(1, this.numCosmeticWaveQueues - 1).forEach((waveQueue) => {
      waveQueue.forEach((wave) => wave.draw(songPosition));
    });
  }

  private update(songPosition: number) {
    this.updateCosmetics(0, 1, songPosition, Endpoint.Start, -this.gameParams.preHitTime, (wave: Wave) => {});
    this.updateCosmetics(1, 2, songPosition, Endpoint.Start, 0, (wave: Wave) => {
      // The start endpoint of the wave has just passed the player.
      // Time to surf the wave!
      this.playerWave = wave;
    });
    this.updateCosmetics(2, 3, songPosition, Endpoint.End, 0, (wave: Wave) => {
      // If `this.playerWave` has not been assigned to another wave, at this point,
      // then this wave is the last wave.
      if (this.playerWave == wave) {
        this.playerWave = null;
      }
    });
    this.updateCosmetics(3, 4, songPosition, Endpoint.End, 500, (wave: Wave) => {});

    this.updateHittables(0, 1, songPosition, Endpoint.Start, -this.gameParams.preHitTime);
    this.updateHittables(1, 2, songPosition, Endpoint.Start, this.hitMargin);
  }

  private updateCosmetics(queueId1: number,
                          queueId2: number,
                          songPosition: number,
                          endpoint: Endpoint,
                          timeOffset: number,
                          callback: (wave: Wave) => void) {
    const waveQueue1 = this.cosmeticWaves[queueId1];
    const waveQueue2 = this.cosmeticWaves[queueId2];
    while (waveQueue1.size() > 0 &&
           songPosition > waveQueue1.peekTime(endpoint) + timeOffset) {
      const wave = waveQueue1.dequeue();
      callback(wave);
      waveQueue2.enqueue(wave);
    }
  }

  private updateHittables(queueId1: number,
                          queueId2: number,
                          songPosition: number,
                          endpoint: Endpoint,
                          timeOffset: number) {
    const waveQueue1 = this.hittableWaves[queueId1];
    const waveQueue2 = this.hittableWaves[queueId2];
    while (waveQueue1.size() > 0 &&
           songPosition > waveQueue1.peekTime(endpoint) + timeOffset) {
      waveQueue2.enqueue(waveQueue1.dequeue());
    }
  }

  private loadBeatmap(beatmap: Array<Note>) {
    const waves = new WaveQueue();

    const firstBeat = beatmap[0].beat;
    const lastBeat = beatmap[beatmap.length - 1].beat;

    waves.enqueue(new PreWave(this.canvas, this.gameParams, firstBeat, this.crotchet, false));
    for (let i = 0; i < beatmap.length - 1; ++i) {
      const start = beatmap[i].beat;
      const end = beatmap[i + 1].beat;
      const upright = (i % 2 == 0) ? true : false;
      waves.enqueue(new Wave(this.canvas, this.gameParams, start, end, this.crotchet, upright));
    }

    const upright = (beatmap.length % 2 == 1) ? true : false;
    waves.enqueue(new PostWave(this.canvas, this.gameParams, lastBeat, this.crotchet, upright));

    return waves;
  }

  getPlayerY(songPosition: number): number {
    if (this.playerWave) {
      return this.playerWave.getPlayerY(songPosition);
    } else {
      return this.yOffset;
    }
  }

  hit(songPosition: number) {
    if (this.hittableWaves[1].size() > 0 &&
        this.hittableWaves[1].peekTime(Endpoint.Start) < songPosition + this.hitMargin) {
      const wave = this.hittableWaves[1].dequeue();
      this.hittableWaves[2].enqueue(wave);
      this.scoreKeeper.update(HitType.Good);
      console.log('good hit!');
    } else {
      this.scoreKeeper.update(HitType.Bad);
      console.log('bad hit!');
    }
  }
}
