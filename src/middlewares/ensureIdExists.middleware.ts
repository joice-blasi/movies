import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import { AppError } from '../errors';
import { iMovieRepo } from '../interfaces';

const ensureIdExistsMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);
    const idParam = parseInt(request.params.id);
    const findMovie = await movieRepository.exist({ where: { id: idParam } });

    if (!findMovie) {
        throw new AppError('Movie not found', 404);
    }

    return next();
}

export default ensureIdExistsMiddleware;