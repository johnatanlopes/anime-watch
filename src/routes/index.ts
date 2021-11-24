import { Router } from 'express';

import { animesRouter } from './anime.routes';

const router = Router();

router.use('/animes', animesRouter);

export { router };
