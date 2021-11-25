import mongoose from 'mongoose';

import { ICreateSiteDTO } from '../dtos/ICreateSiteDTO';
import { Site, ISite } from '../entities/Site';
import { ISiteRepository } from './interfaces/ISiteRepository';

class SiteRepository implements ISiteRepository {
  async findByTitle(title: string): Promise<ISite | null> {
    const site = await Site.findOne({ title });
    return site;
  }

  async create(data: ICreateSiteDTO): Promise<ISite> {
    const { anime_id, title, url, streaming } = data;

    const site = new Site({
      _id: new mongoose.Types.ObjectId(),
      anime_id,
      title,
      url,
      streaming,
    });

    await site.save();

    return site;
  }

  async findAll(): Promise<ISite[]> {
    const sites = Site.find().select([
      '_id',
      'title',
      'url',
      'streaming',
      'created_at',
      'updated_at',
    ]);

    return sites;
  }
}

export { SiteRepository };
