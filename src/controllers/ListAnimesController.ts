import { Request, Response } from 'express';

import { AnimeRepository } from '../repositories/AnimeRepository';
import { ListAnimesUseCase } from '../useCases/ListAnimesUseCase';

class ListAnimesController {
  async handler(request: Request, response: Response): Promise<Response> {
    const animeRepository = new AnimeRepository();
    const listAnimesUseCase = new ListAnimesUseCase(animeRepository);

    const animes = await listAnimesUseCase.execute();

    return response.json(animes);
  }
}

export { ListAnimesController };
