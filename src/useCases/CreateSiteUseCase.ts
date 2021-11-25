import { ICreateSiteDTO } from '../dtos/ICreateSiteDTO';
import { ISite } from '../entities/Site';
import { AppError } from '../errors/AppError';
import { ISiteRepository } from '../repositories/interfaces/ISiteRepository';

class CreateSiteUseCase {
  constructor(private siteRepository: ISiteRepository) {}

  async execute(data: ICreateSiteDTO): Promise<ISite> {
    const { anime_id, title, url, streaming } = data;

    const siteExists = await this.siteRepository.findByTitle(title);

    if (siteExists) {
      throw new AppError('Site already exists');
    }

    const site = await this.siteRepository.create({
      anime_id,
      title,
      url,
      streaming,
    });

    return site;
  }
}

export { CreateSiteUseCase };
