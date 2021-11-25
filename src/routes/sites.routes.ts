import { Router } from 'express';

import { CreateSiteController } from '../controllers/CreateSiteController';
import { ListSitesController } from '../controllers/ListSitesController';

const createSiteController = new CreateSiteController();
const listSitesController = new ListSitesController();

const sitesRouter = Router();

sitesRouter.get('/', listSitesController.handler);
sitesRouter.post('/', createSiteController.handler);

export { sitesRouter };
