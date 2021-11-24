import { Request, Response } from 'express';

import { AnimeRepository } from '../repositories/AnimeRepository';
import { CreateAnimeUseCase } from '../useCases/CreateAnimeUseCase';

class CreateAnimeController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    const animeRepository = new AnimeRepository();
    const createAnimeUseCase = new CreateAnimeUseCase(animeRepository);

    const anime = await createAnimeUseCase.execute(title);

    return response.status(201).json(anime);
  }
}

export { CreateAnimeController };
