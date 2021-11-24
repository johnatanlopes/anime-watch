import { IAnime } from '../entities/Anime';
import { AppError } from '../errors/AppError';
import { IAnimeRepository } from '../repositories/interfaces/IAnimeRepository';

class CreateAnimeUseCase {
  constructor(private animeRepository: IAnimeRepository) {}

  async execute(title: string): Promise<IAnime> {
    const animeExists = await this.animeRepository.findByTitle(title);

    if (animeExists) {
      throw new AppError('Anime already exists');
    }

    const anime = await this.animeRepository.create(title);

    return anime;
  }
}

export { CreateAnimeUseCase };
