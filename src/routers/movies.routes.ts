import { Router } from 'express';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import { movieCreateSchema, movieUpdateSchema } from '../schemas/movies.schemas';
import {
    createMovieController,
    readMoviesController,
    editMovieController,
    deleteMovieController
} from '../controllers/movies.controller';
import ensureIdExistsMiddleware from '../middlewares/ensureIdExists.middleware';
import ensureNameDontExistsMiddleware from '../middlewares/ensureNameDontExists.middleware';

const moviesRoutes: Router = Router();

moviesRoutes.post('',
    ensureDataIsValidMiddleware(movieCreateSchema),
    ensureNameDontExistsMiddleware,
    createMovieController);

moviesRoutes.get('', readMoviesController);

moviesRoutes.patch('/:id',
    ensureDataIsValidMiddleware(movieUpdateSchema),
    ensureIdExistsMiddleware,
    ensureNameDontExistsMiddleware,
    editMovieController);

moviesRoutes.delete('/:id',
    ensureIdExistsMiddleware,
    deleteMovieController);


export default moviesRoutes;