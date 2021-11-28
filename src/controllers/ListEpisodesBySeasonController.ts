import { Request, Response } from 'express';

import { EpisodeRepository } from '../repositories/EpisodeRepository';
import { ListEpisodesBySeasonUseCase } from '../useCases/ListEpisodesBySeasonUseCase';

class ListEpisodesBySeasonController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { season_id } = request.params;

    const episodeRepository = new EpisodeRepository();

    const listEpisodesBySeasonUseCase = new ListEpisodesBySeasonUseCase(
      episodeRepository,
    );

    const sites = await listEpisodesBySeasonUseCase.execute(season_id);

    return response.json(sites);
  }
}

export { ListEpisodesBySeasonController };
