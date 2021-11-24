import { IAnime } from '../entities/Anime';
import { IAnimeRepository } from '../repositories/interfaces/IAnimeRepository';

class ListAnimesUseCase {
  constructor(private animeRepository: IAnimeRepository) {}

  async execute(): Promise<IAnime[]> {
    const animes = await this.animeRepository.findAll();
    return animes;
  }
}

export { ListAnimesUseCase };
