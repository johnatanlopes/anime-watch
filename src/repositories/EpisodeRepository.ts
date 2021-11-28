import mongoose from 'mongoose';

import { Episode, IEpisode } from '../entities/Episode';
import { IEpisodeRepository } from './interfaces/IEpisodeRepository';

class EpisodeRepository implements IEpisodeRepository {
  async createInBulk(
    season_id: string,
    episodeNumbers: number[],
  ): Promise<void> {
    const session = await mongoose.startSession();

    session.startTransaction();

    const episodesToInsert = episodeNumbers.map((episodeNumber) => {
      return {
        season_id,
        number: episodeNumber,
      };
    });

    try {
      await Episode.insertMany(episodesToInsert, { session });
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
  }

  async findEpisodesBySeason(season_id: string): Promise<IEpisode[]> {
    const episodes = await Episode.find({ season_id });
    return episodes;
  }
}

export { EpisodeRepository };
