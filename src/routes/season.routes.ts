import { Router } from 'express';

import { CreateSeasonController } from '../controllers/CreateSeasonController';
import { ListSeasonsBySiteController } from '../controllers/ListSeasonsBySiteController';

const listSeasonsBySiteController = new ListSeasonsBySiteController();
const createSeasonController = new CreateSeasonController();

const seasonsRouter = Router();

seasonsRouter.get('/:site_id', listSeasonsBySiteController.handler);
seasonsRouter.post('/', createSeasonController.handler);

export { seasonsRouter };
