import mongoose from 'mongoose';

import { ISeason, Season } from '../entities/Season';
import { ISeasonRepository } from './interfaces/ISeasonRepository';

class SeasonRepository implements ISeasonRepository {
  async findByTitle(site_id: string, title: string): Promise<ISeason | null> {
    const season = await Season.findOne({ site: site_id, title });
    return season;
  }

  async create(site_id: string, title: string): Promise<ISeason> {
    const season = new Season({
      _id: new mongoose.Types.ObjectId(),
      site: site_id,
      title,
    });

    await season.save();

    return season;
  }

  async findAllBySiteId(site_id: string): Promise<ISeason[]> {
    const seasons = Season.find({ site: site_id }).select([
      '_id',
      'site',
      'title',
      'finalized',
      'created_at',
      'updated_at',
    ]);

    return seasons;
  }
}

export { SeasonRepository };
