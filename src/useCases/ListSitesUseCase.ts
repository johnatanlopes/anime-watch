import { ISite } from '../entities/Site';
import { ISiteRepository } from '../repositories/interfaces/ISiteRepository';

class ListSitesUseCase {
  constructor(private siteRepository: ISiteRepository) {}

  async execute(): Promise<ISite[]> {
    const sites = await this.siteRepository.findAll();
    return sites;
  }
}

export { ListSitesUseCase };
