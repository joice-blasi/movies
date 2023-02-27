import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import { iMovieRepo, iPagination, iSort } from '../interfaces';
import { returnMultipleMoviesSchema } from '../schemas/movies.schemas';

const readMoviesService = async (perPage: any, page: any, sort: iSort, orderParam: any): Promise<iPagination> => {
    const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

    if (perPage > 5 || perPage < 0 || !perPage) perPage = 5;
    if (page < 0 || !page) page = 1;
    if (!orderParam) orderParam = 'asc';

    const take = Number(perPage) || 5;
    const skip = Number(page) || 1;

    const params = {
        take,
        skip: take * (skip - 1),
        order: {}
    }

    if (sort != 'id') {
        params.order = {
            [sort]: orderParam
        }
    } else {
        params.order = {
            id: 'asc'
        }
    }

    const [findMovies, totalMovies] = await movieRepository.findAndCount(params);
    const movies = returnMultipleMoviesSchema.parse(findMovies);
    const count: number = totalMovies;

    const baseUrl: string = 'http://localhost:3000/movies';
    let prevPage: string | null = `${baseUrl}?page=${skip - 1}&perPage=${take}`;
    if (skip - 1 <= 0) prevPage = null;

    let nextPage: string | null = `${baseUrl}?page=${Number(skip) + 1}&perPage=${take}`;
    if (movies.length < take) nextPage = null;

    const pagination: iPagination = {
        prevPage,
        nextPage,
        count,
        data: movies
    };

    return pagination;
}

export default readMoviesService;