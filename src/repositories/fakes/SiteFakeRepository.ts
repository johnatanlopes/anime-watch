import mongoose from 'mongoose';

import { ICreateSiteDTO } from '../../dtos/ICreateSiteDTO';
import { ISite } from '../../entities/Site';
import { ISiteRepository } from '../interfaces/ISiteRepository';

class SiteFakeRepository implements ISiteRepository {
  private sites: ISite[] = [];

  async findByTitle(title: string): Promise<ISite | null> {
    const site = this.sites.find((site) => site.title === title);

    if (!site) {
      return null;
    }

    return site;
  }

  async create(data: ICreateSiteDTO): Promise<ISite> {
    const { anime_id, title, url, streaming } = data;

    const id = new mongoose.Types.ObjectId();

    const site = {
      _id: id,
      anime: anime_id,
      title,
      url,
      streaming,
    } as unknown as ISite;

    this.sites.push(site);

    return site;
  }

  async findAll(): Promise<ISite[]> {
    return this.sites;
  }
}

export { SiteFakeRepository };
