import { ICreateSiteDTO } from '../../dtos/ICreateSiteDTO';
import { ISite } from '../../entities/Site';

interface ISiteRepository {
  create({ anime_id, title, url, streaming }: ICreateSiteDTO): Promise<ISite>;
  findByTitle(title: string): Promise<ISite | null>;
  findAll(): Promise<ISite[]>;
}

export { ISiteRepository };
