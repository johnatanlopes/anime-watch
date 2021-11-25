import { Request, Response } from 'express';

import { SiteRepository } from '../repositories/SiteRepository';
import { ListSitesUseCase } from '../useCases/ListSitesUseCase';

class ListSitesController {
  async handler(request: Request, response: Response): Promise<Response> {
    const siteRepository = new SiteRepository();
    const listSitesUseCase = new ListSitesUseCase(siteRepository);

    const sites = await listSitesUseCase.execute();

    return response.json(sites);
  }
}

export { ListSitesController };
