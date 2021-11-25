import { ICreateSiteDTO } from '../../../src/dtos/ICreateSiteDTO';
import { SiteFakeRepository } from '../../../src/repositories/fakes/SiteFakeRepository';
import { CreateSiteUseCase } from '../../../src/useCases/CreateSiteUseCase';
import { ListSitesUseCase } from '../../../src/useCases/ListSitesUseCase';

describe('ListSitesUseCase', () => {
  it('should be able to list all sites', async () => {
    const siteFakeRepository = new SiteFakeRepository();
    const createSiteUseCase = new CreateSiteUseCase(siteFakeRepository);
    const listSitesUseCase = new ListSitesUseCase(siteFakeRepository);

    const siteExpect1 = {
      title: 'Animes Online',
      url: 'https://animesonline.cc/',
      streaming: true,
    } as ICreateSiteDTO;

    const siteExpect2 = {
      title: 'Crunchyroll',
      url: 'https://www.crunchyroll.com//',
      streaming: true,
    } as ICreateSiteDTO;

    await createSiteUseCase.execute(siteExpect1);
    await createSiteUseCase.execute(siteExpect2);

    const sites = await listSitesUseCase.execute();

    expect(sites).toHaveLength(2);

    expect(sites).toEqual([
      expect.objectContaining(siteExpect1),
      expect.objectContaining(siteExpect2),
    ]);
  });
});
