import { ISeason } from '../../entities/Season';

interface ISeasonRepository {
  create(site_id: string, title: string): Promise<ISeason>;
  findByTitle(site_id: string, title: string): Promise<ISeason | null>;
  findAllBySiteId(site_id: string): Promise<ISeason[]>;
}

export { ISeasonRepository };
