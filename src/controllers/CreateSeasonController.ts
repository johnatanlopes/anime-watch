import { Request, Response } from 'express';

import { RabbitProvider } from '../providers/QueueProvider/RabbitProvider';
import { SeasonRepository } from '../repositories/SeasonRepository';
import { CreateSeasonUseCase } from '../useCases/CreateSeasonUseCase';

class CreateSeasonController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { site_id, title } = request.body;

    const seasonRepository = new SeasonRepository();

    const rabbitProvider = new RabbitProvider({
      url: String(process.env.RABBIT_URL),
      exchange: 'animes',
      routingKey: 'SEASON_CREATED',
      queue: 'season_created',
    });

    const createSeasonUseCase = new CreateSeasonUseCase(
      seasonRepository,
      rabbitProvider,
    );

    const season = await createSeasonUseCase.execute(site_id, title);

    return response.status(201).json(season);
  }
}

export { CreateSeasonController };
