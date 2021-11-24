import { AppError } from '../../../src/errors/AppError';
import { AnimeFakeRepository } from '../../../src/repositories/fakes/AnimeFakeRepository';
import { CreateAnimeUseCase } from '../../../src/useCases/CreateAnimeUseCase';

let animeFakeRepository: AnimeFakeRepository;
let createAnimeUseCase: CreateAnimeUseCase;

describe('CreateAnimeUseCase', () => {
  beforeEach(() => {
    animeFakeRepository = new AnimeFakeRepository();
    createAnimeUseCase = new CreateAnimeUseCase(animeFakeRepository);
  });

  it('should be able to create a new anime', async () => {
    const title = 'Boku no Hero';
    const anime = await createAnimeUseCase.execute(title);

    expect(anime).toHaveProperty('_id');
    expect(anime.title).toBe(title);
  });

  it('should not be able to create a new anime if exists', async () => {
    const title = 'Boku no Hero';

    await createAnimeUseCase.execute(title);

    await expect(createAnimeUseCase.execute(title)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
