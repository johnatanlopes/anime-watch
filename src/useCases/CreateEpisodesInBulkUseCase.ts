import { IEpisodeRepository } from '../repositories/interfaces/IEpisodeRepository';

class CreateEpisodesInBulkUseCase {
  constructor(private episodeRepository: IEpisodeRepository) {}

  async execute(season_id: string, episodeNumbers: number[]): Promise<void> {
    const allEpisodes = await this.episodeRepository.findEpisodesBySeason(
      season_id,
    );

    let episodesNumberNotSaved = episodeNumbers;

    if (allEpisodes) {
      const episodesNumberSaved = allEpisodes.map((episode) => episode.number);

      episodesNumberNotSaved = episodeNumbers.filter((number) => {
        return !episodesNumberSaved.includes(number);
      });
    }

    await this.episodeRepository.createInBulk(
      season_id,
      episodesNumberNotSaved,
    );
  }
}

export { CreateEpisodesInBulkUseCase };
