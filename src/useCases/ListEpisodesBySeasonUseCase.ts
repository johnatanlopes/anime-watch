import { IEpisode } from '../entities/Episode';
import { IEpisodeRepository } from '../repositories/interfaces/IEpisodeRepository';

class ListEpisodesBySeasonUseCase {
  constructor(private episodeRepository: IEpisodeRepository) {}

  async execute(season_id: string): Promise<IEpisode[]> {
    const episodes = await this.episodeRepository.findEpisodesBySeason(
      season_id,
    );

    return episodes;
  }
}

export { ListEpisodesBySeasonUseCase };
