import { Request, Response } from 'express';

import { SiteRepository } from '../repositories/SiteRepository';
import { CreateSiteUseCase } from '../useCases/CreateSiteUseCase';

class CreateSiteController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { anime_id, title, url, streaming } = request.body;

    const siteRepository = new SiteRepository();
    const createSiteUseCase = new CreateSiteUseCase(siteRepository);

    const site = await createSiteUseCase.execute({
      anime_id,
      title,
      url,
      streaming,
    });

    return response.status(201).json(site);
  }
}

export { CreateSiteController };
