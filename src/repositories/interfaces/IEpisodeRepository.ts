import { IEpisode } from '../../entities/Episode';

interface IEpisodeRepository {
  createInBulk(season_id: string, episodeNumbers: number[]): Promise<void>;
  findEpisodesBySeason(season_id: string): Promise<IEpisode[]>;
}

export { IEpisodeRepository };
