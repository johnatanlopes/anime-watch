import { Router } from 'express';

import { ListEpisodesBySeasonController } from '../controllers/ListEpisodesBySeasonController';

const listEpisodesBySeasonController = new ListEpisodesBySeasonController();

const episodesRouter = Router();

episodesRouter.get('/', listEpisodesBySeasonController.handler);

export { episodesRouter };
