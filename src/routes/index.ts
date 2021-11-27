import { Router } from 'express';

import { animesRouter } from './anime.routes';
import { seasonsRouter } from './season.routes';
import { sitesRouter } from './sites.routes';

const router = Router();

router.use('/animes', animesRouter);
router.use('/sites', sitesRouter);
router.use('/seasons', seasonsRouter);

export { router };
