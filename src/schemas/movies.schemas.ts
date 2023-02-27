import { z } from 'zod';

const movieCreateSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().nullable().optional(),
    duration: z.number().positive(),
    price: z.number().int()
});

const movieCreateReturnSchema = movieCreateSchema.extend({
    id: z.number()
});

const returnMultipleMoviesSchema = movieCreateReturnSchema.array();

const movieUpdateSchema = movieCreateReturnSchema.partial();

const sortSchema = z.enum(['id', 'duration', 'price']).default('id');

export {
    movieCreateSchema,
    movieCreateReturnSchema,
    returnMultipleMoviesSchema,
    movieUpdateSchema,
    sortSchema
};