import { ISeason } from '../entities/Season';
import { ISeasonRepository } from '../repositories/interfaces/ISeasonRepository';

class ListSeasonsBySiteUseCase {
  constructor(private seasonRepository: ISeasonRepository) {}

  async execute(site_id: string): Promise<ISeason[]> {
    const seasons = await this.seasonRepository.findAllBySiteId(site_id);
    return seasons;
  }
}

export { ListSeasonsBySiteUseCase };
