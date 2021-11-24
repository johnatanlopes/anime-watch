import mongoose from 'mongoose';

import { Anime, IAnime } from '../../entities/Anime';
import { IAnimeRepository } from '../interfaces/IAnimeRepository';

class AnimeFakeRepository implements IAnimeRepository {
  private animes: IAnime[] = [];

  async findByTitle(title: string): Promise<IAnime | null> {
    const anime = this.animes.find((anime) => anime.title === title);

    if (!anime) {
      return null;
    }

    return anime;
  }

  async create(title: string): Promise<IAnime> {
    const id = new mongoose.Types.ObjectId();

    const anime = new Anime({ title });

    Object.assign(anime, {
      _id: id,
    });

    this.animes.push(anime);

    return anime;
  }

  async findAll(): Promise<IAnime[]> {
    return this.animes;
  }
}

export { AnimeFakeRepository };
