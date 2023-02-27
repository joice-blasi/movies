import { DeepPartial, Repository } from 'typeorm';
import { z } from 'zod';
import { Movie } from '../entities';
import {
    movieCreateSchema,
    movieCreateReturnSchema,
    returnMultipleMoviesSchema,
    movieUpdateSchema,
    sortSchema
} from '../schemas/movies.schemas';

type iMovieCreate = z.infer<typeof movieCreateSchema>;
type iMovieUpdate = DeepPartial<Movie>;
type iMovieRepo = Repository<Movie>;

type iMovieCreateReturn = z.infer<typeof movieCreateReturnSchema>;
type iMoviesMultipleReturn = z.infer<typeof returnMultipleMoviesSchema>;
type iMovieUpdateRequest = z.infer<typeof movieUpdateSchema>;
interface iPagination {
    prevPage: string | null,
    nextPage: string | null,
    count: number,
    data: iMovieCreateReturn[]
}
type iSort = z.infer<typeof sortSchema>;

export {
    iMovieCreate,
    iMovieUpdate,
    iMovieRepo,
    iMovieCreateReturn,
    iMoviesMultipleReturn,
    iMovieUpdateRequest,
    iPagination,
    iSort
};