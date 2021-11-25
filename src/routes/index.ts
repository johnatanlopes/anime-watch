import { Router } from 'express';

import { animesRouter } from './anime.routes';
import { sitesRouter } from './sites.routes';

const router = Router();

router.use('/animes', animesRouter);
router.use('/sites', sitesRouter);

export { router };
