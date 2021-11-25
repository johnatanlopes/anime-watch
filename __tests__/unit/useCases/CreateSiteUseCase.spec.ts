import mongoose from 'mongoose';

import { AppError } from '../../../src/errors/AppError';
import { SiteFakeRepository } from '../../../src/repositories/fakes/SiteFakeRepository';
import { CreateSiteUseCase } from '../../../src/useCases/CreateSiteUseCase';

let siteFakeRepository: SiteFakeRepository;
let createSiteUseCase: CreateSiteUseCase;

const siteExpect = {
  anime_id: String(new mongoose.Types.ObjectId()),
  title: 'Animes Online',
  url: 'https://animesonline.cc/',
  streaming: true,
};

describe('CreateSiteUseCase', () => {
  beforeEach(() => {
    siteFakeRepository = new SiteFakeRepository();
    createSiteUseCase = new CreateSiteUseCase(siteFakeRepository);
  });

  it('should be able to create a new site', async () => {
    const site = await createSiteUseCase.execute(siteExpect);

    expect(site).toEqual(
      expect.objectContaining({
        title: siteExpect.title,
        streaming: siteExpect.streaming,
        url: siteExpect.url,
      }),
    );
  });

  it('should not be able to create a new site if exists', async () => {
    await createSiteUseCase.execute(siteExpect);

    await expect(createSiteUseCase.execute(siteExpect)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
