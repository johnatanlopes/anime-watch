import mongoose from 'mongoose';

import { EpisodeFakeRepository } from '../../../src/repositories/fakes/EpisodeFakeRepository';
import { CreateEpisodesInBulkUseCase } from '../../../src/useCases/CreateEpisodesInBulkUseCase';
import { ListEpisodesBySeasonUseCase } from '../../../src/useCases/ListEpisodesBySeasonUseCase';

let episodeFakeRepository: EpisodeFakeRepository;
let createEpisodesInBulkUseCase: CreateEpisodesInBulkUseCase;
let listEpisodesBySeasonUseCase: ListEpisodesBySeasonUseCase;

describe('CreateEpisodesInBulkUseCase', () => {
  beforeEach(() => {
    episodeFakeRepository = new EpisodeFakeRepository();

    createEpisodesInBulkUseCase = new CreateEpisodesInBulkUseCase(
      episodeFakeRepository,
    );

    listEpisodesBySeasonUseCase = new ListEpisodesBySeasonUseCase(
      episodeFakeRepository,
    );
  });

  it('should be able to create episodes in bulk', async () => {
    const season_id = new mongoose.Types.ObjectId();

    await createEpisodesInBulkUseCase.execute(String(season_id), [1, 2, 3]);

    const episodes = await listEpisodesBySeasonUseCase.execute(
      String(season_id),
    );

    expect(episodes).toHaveLength(3);

    expect(episodes).toEqual([
      expect.objectContaining({
        number: 1,
        season: season_id,
      }),
      expect.objectContaining({
        number: 2,
        season: season_id,
      }),
      expect.objectContaining({
        number: 3,
        season: season_id,
      }),
    ]);
  });

  it('should be able to create episodes with exists episodes in bulk', async () => {
    const season_id = new mongoose.Types.ObjectId();

    await createEpisodesInBulkUseCase.execute(String(season_id), [1, 2]);

    await createEpisodesInBulkUseCase.execute(String(season_id), [1, 2, 3, 4]);

    const episodes = await listEpisodesBySeasonUseCase.execute(
      String(season_id),
    );

    expect(episodes).toHaveLength(4);

    expect(episodes).toEqual([
      expect.objectContaining({
        number: 1,
        season: season_id,
      }),
      expect.objectContaining({
        number: 2,
        season: season_id,
      }),
      expect.objectContaining({
        number: 3,
        season: season_id,
      }),
      expect.objectContaining({
        number: 4,
        season: season_id,
      }),
    ]);
  });
});
