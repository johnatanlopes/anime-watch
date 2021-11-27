import { Request, Response } from 'express';

import { SeasonRepository } from '../repositories/SeasonRepository';
import { CreateSeasonUseCase } from '../useCases/CreateSeasonUseCase';

class CreateSeasonController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { site_id, title } = request.body;

    const seasonRepository = new SeasonRepository();
    const createSeasonUseCase = new CreateSeasonUseCase(seasonRepository);

    const season = await createSeasonUseCase.execute(site_id, title);

    return response.status(201).json(season);
  }
}

export { CreateSeasonController };
