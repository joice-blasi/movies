import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import { iMovieRepo, iMovieUpdate, iMovieUpdateRequest } from '../interfaces';
import { movieUpdateSchema } from '../schemas/movies.schemas';

const editMovieService = async (updateData: iMovieUpdate, idParam: number): Promise<iMovieUpdateRequest> => {
    const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);
    const oldMovie = await movieRepository.findOneBy({ id: idParam });
    const movie = movieRepository.create({
        ...oldMovie,
        ...updateData
    });
    await movieRepository.save(movie);
    const updateMovie = movieUpdateSchema.parse(movie);
    return updateMovie;
}

export default editMovieService;