import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import { AppError } from '../errors';
import { iMovieRepo } from '../interfaces';

const ensureNameDontExistsMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);
    const nameMovie = request.body.name;
    if (nameMovie) {
        const findEmail = await movieRepository.exist({ where: { name: nameMovie } });

        if (findEmail) {
            throw new AppError('Movie already exists.', 409);
        }
    }
    return next();
}

export default ensureNameDontExistsMiddleware;