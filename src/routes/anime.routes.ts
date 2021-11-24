import { Router } from 'express';

import { CreateAnimeController } from '../controllers/CreateAnimeController';
import { ListAnimesController } from '../controllers/ListAnimesController';

const createAnimeController = new CreateAnimeController();
const listAnimesController = new ListAnimesController();

const animesRouter = Router();

animesRouter.get('/', listAnimesController.handler);
animesRouter.post('/', createAnimeController.handler);

export { animesRouter };
