import { Request, Response } from 'express';

import { SeasonRepository } from '../repositories/SeasonRepository';
import { ListSeasonsBySiteUseCase } from '../useCases/ListSeasonsBySiteUseCase';

class ListSeasonsBySiteController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { site_id } = request.params;

    const seasonRepository = new SeasonRepository();

    const listSeasonsByAnimeUseCase = new ListSeasonsBySiteUseCase(
      seasonRepository,
    );

    const seasons = await listSeasonsByAnimeUseCase.execute(site_id);

    return response.json(seasons);
  }
}

export { ListSeasonsBySiteController };
