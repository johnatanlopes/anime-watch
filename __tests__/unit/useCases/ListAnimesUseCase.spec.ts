import { AnimeFakeRepository } from '../../../src/repositories/fakes/AnimeFakeRepository';
import { CreateAnimeUseCase } from '../../../src/useCases/CreateAnimeUseCase';
import { ListAnimesUseCase } from '../../../src/useCases/ListAnimesUseCase';

describe('ListAnimes', () => {
  it('should be able to list all animes', async () => {
    const animeFakeRepository = new AnimeFakeRepository();
    const createAnimeUseCase = new CreateAnimeUseCase(animeFakeRepository);
    const listAnimesUseCase = new ListAnimesUseCase(animeFakeRepository);

    await createAnimeUseCase.execute('Boku no Hero');
    await createAnimeUseCase.execute('One Piece');

    const animes = await listAnimesUseCase.execute();

    expect(animes).toHaveLength(2);

    expect(animes).toEqual([
      expect.objectContaining({ title: 'Boku no Hero' }),
      expect.objectContaining({ title: 'One Piece' }),
    ]);
  });
});
