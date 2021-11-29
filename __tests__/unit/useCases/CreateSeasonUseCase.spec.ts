import mongoose from 'mongoose';

import { AppError } from '../../../src/errors/AppError';
import { RabbitFakeProvider } from '../../../src/providers/QueueProvider/RabbitFakeProvider';
import { SeasonFakeRepository } from '../../../src/repositories/fakes/SeasonFakeRepository';
import { CreateSeasonUseCase } from '../../../src/useCases/CreateSeasonUseCase';

let seasonFakeRepository: SeasonFakeRepository;
let createSeasonUseCase: CreateSeasonUseCase;
let rabbitFakeProvider: RabbitFakeProvider;

const site_id = String(new mongoose.Types.ObjectId());
const title = 'Season 1';

describe('CreateSeasonUseCase', () => {
  beforeEach(() => {
    seasonFakeRepository = new SeasonFakeRepository();

    rabbitFakeProvider = new RabbitFakeProvider();

    createSeasonUseCase = new CreateSeasonUseCase(
      seasonFakeRepository,
      rabbitFakeProvider,
    );
  });

  it('should be able to create a new season', async () => {
    const season = await createSeasonUseCase.execute(site_id, title);

    expect(season).toHaveProperty('_id');
    expect(season.title).toBe(title);
  });

  it('should not be able to create a new season if exists', async () => {
    await createSeasonUseCase.execute(site_id, title);

    await expect(
      createSeasonUseCase.execute(site_id, title),
    ).rejects.toBeInstanceOf(AppError);
  });
});
