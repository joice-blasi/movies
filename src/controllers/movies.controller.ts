import { Request, Response } from 'express';
import { iMovieCreate, iMovieCreateReturn, iMoviesMultipleReturn, iMovieUpdate } from '../interfaces';
import { sortSchema } from '../schemas/movies.schemas';
import createMovieService from '../services/createMovie.service';
import deleteMovieService from '../services/deleteMovie.service';
import editMovieService from '../services/editMovie.service';
import readMoviesService from '../services/readMovies.service';

const createMovieController = async (request: Request, response: Response): Promise<Response<iMovieCreateReturn>> => {
    const requestData: iMovieCreate = request.body
    const movieData = await createMovieService(requestData);
    return response.status(201).json(movieData);
};

const readMoviesController = async (request: Request, response: Response): Promise<Response<iMoviesMultipleReturn>> => {
    const { perPage, page, sort, order } = request.query;
    const newSort = sortSchema.parse(sort);
    const movies = await readMoviesService(perPage, page, newSort, order);
    return response.json(movies);
};

const editMovieController = async (request: Request, response: Response) => {
    const requestData: iMovieUpdate = request.body;
    const idParam: number = parseInt(request.params.id);
    const movie = await editMovieService(requestData, idParam);
    return response.json(movie);
};

const deleteMovieController = async (request: Request, response: Response): Promise<Response> => {
    const idParam = parseInt(request.params.id);
    await deleteMovieService(idParam);
    return response.status(204).send();
};

export {
    createMovieController,
    readMoviesController,
    editMovieController,
    deleteMovieController
}