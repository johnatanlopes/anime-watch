import { AnimeFakeRepository } from '../../../src/repositories/fakes/AnimeFakeRepository';
import { SeasonFakeRepository } from '../../../src/repositories/fakes/SeasonFakeRepository';
import { SiteFakeRepository } from '../../../src/repositories/fakes/SiteFakeRepository';
import { CreateAnimeUseCase } from '../../../src/useCases/CreateAnimeUseCase';
import { CreateSeasonUseCase } from '../../../src/useCases/CreateSeasonUseCase';
import { CreateSiteUseCase } from '../../../src/useCases/CreateSiteUseCase';
import { ListSeasonsBySiteUseCase } from '../../../src/useCases/ListSeasonsBySiteUseCase';

describe('ListSeasonsUseCase', () => {
  it('should be able to list all seasons', async () => {
    const animeFakeRepository = new AnimeFakeRepository();
    const createAnimeUseCase = new CreateAnimeUseCase(animeFakeRepository);
    const siteFakeRepository = new SiteFakeRepository();
    const createSiteUseCase = new CreateSiteUseCase(siteFakeRepository);
    const seasonFakeRepository = new SeasonFakeRepository();
    const createSeasonUseCase = new CreateSeasonUseCase(seasonFakeRepository);
    const listSeasonsBySiteUseCase = new ListSeasonsBySiteUseCase(
      seasonFakeRepository,
    );

    const anime = await createAnimeUseCase.execute('Boku no Hero');

    const site = await createSiteUseCase.execute({
      anime_id: String(anime._id),
      title: 'Animes Online',
      url: 'https://animesonline.cc/',
      streaming: true,
    });

    await createSeasonUseCase.execute(String(site._id), 'Season 1');
    await createSeasonUseCase.execute(String(site._id), 'Season 2');

    const seasons = await listSeasonsBySiteUseCase.execute(String(site._id));

    expect(seasons).toHaveLength(2);

    expect(seasons).toEqual([
      expect.objectContaining({ title: 'Season 1' }),
      expect.objectContaining({ title: 'Season 2' }),
    ]);
  });
});
