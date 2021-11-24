import mongoose from 'mongoose';

import { Anime, IAnime } from '../entities/Anime';
import { IAnimeRepository } from './interfaces/IAnimeRepository';

class AnimeRepository implements IAnimeRepository {
  async findByTitle(title: string): Promise<IAnime | null> {
    const anime = await Anime.findOne({ title });
    return anime;
  }

  async create(title: string): Promise<IAnime> {
    const anime = new Anime({
      _id: new mongoose.Types.ObjectId(),
      title,
    });

    await anime.save();

    return anime;
  }

  async findAll(): Promise<IAnime[]> {
    const animes = Anime.find().select([
      '_id',
      'title',
      'created_at',
      'updated_at',
    ]);
    return animes;
  }
}

export { AnimeRepository };
