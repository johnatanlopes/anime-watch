import mongoose, { ObjectId } from 'mongoose';

import { ISeason } from '../../entities/Season';
import { ISeasonRepository } from '../interfaces/ISeasonRepository';

class SeasonFakeRepository implements ISeasonRepository {
  private seasons: ISeason[] = [];

  async findByTitle(site_id: string, title: string): Promise<ISeason | null> {
    const siteObjectId = site_id as unknown as ObjectId;

    const season = this.seasons.find(
      (season) => season.site === siteObjectId && season.title === title,
    );

    if (!season) {
      return null;
    }

    return season;
  }

  async create(site_id: string, title: string): Promise<ISeason> {
    const id = new mongoose.Types.ObjectId();

    const season = {
      _id: id,
      site: site_id,
      title,
    } as unknown as ISeason;

    this.seasons.push(season);

    return season;
  }

  async findAllBySiteId(site_id: string): Promise<ISeason[]> {
    const siteObjectId = site_id as unknown as ObjectId;
    return this.seasons.filter((season) => season.site === siteObjectId);
  }
}

export { SeasonFakeRepository };
