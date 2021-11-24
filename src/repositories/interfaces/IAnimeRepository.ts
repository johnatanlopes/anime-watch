import { IAnime } from '../entities/Anime';

interface IAnimeRepository {
  create(title: string): Promise<IAnime>;
  findByTitle(title: string): Promise<IAnime | null>;
  findAll(): Promise<IAnime[]>;
}

export { IAnimeRepository };
