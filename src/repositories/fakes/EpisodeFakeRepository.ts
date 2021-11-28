import mongoose from 'mongoose';

import { Episode, IEpisode } from '../../entities/Episode';
import { IEpisodeRepository } from '../interfaces/IEpisodeRepository';

class EpisodeFakeRepository implements IEpisodeRepository {
  private episodes: IEpisode[] = [];

  async createInBulk(
    season_id: string,
    episodeNumbers: number[],
  ): Promise<void> {
    episodeNumbers.forEach((episodeNumber) => {
      const id = new mongoose.Types.ObjectId();

      const episode = new Episode({ number: episodeNumber });

      Object.assign(episode, {
        _id: id,
        season: season_id,
      });

      this.episodes.push(episode);
    });
  }

  async findEpisodesBySeason(season_id: string): Promise<IEpisode[]> {
    const episodes = this.episodes.filter(
      (episode) => String(episode.season) === season_id,
    );

    return episodes;
  }
}

export { EpisodeFakeRepository };
