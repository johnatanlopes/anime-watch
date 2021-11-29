import { ISeason } from '../entities/Season';
import { AppError } from '../errors/AppError';
import { IQueueProvider } from '../providers/QueueProvider/IQueueProvider';
import { ISeasonRepository } from '../repositories/interfaces/ISeasonRepository';

class CreateSeasonUseCase {
  constructor(
    private seasonRepository: ISeasonRepository,
    private queueProvider: IQueueProvider,
  ) {}

  async execute(site_id: string, title: string): Promise<ISeason> {
    const seasonExists = await this.seasonRepository.findByTitle(
      site_id,
      title,
    );

    if (seasonExists) {
      throw new AppError('Season already exists');
    }

    const season = await this.seasonRepository.create(site_id, title);

    await this.queueProvider.publish({
      site_id,
      title,
    });

    return season;
  }
}

export { CreateSeasonUseCase };
