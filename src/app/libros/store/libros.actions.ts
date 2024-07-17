import { createAction, props } from '@ngrx/store';
import { LibrosModel } from '../../models/libros.model';

export const loadLibros = createAction('[Libros] Load Libros');
export const loadLibrosSuccess = createAction('[Libros] Load Libros Success', props<{ libros: LibrosModel[] }>());
export const loadLibrosFailure = createAction('[Libros] Load Libros Failure', props<{ error: any }>());

export const filterLibros = createAction('[Libros] Filter Libros', props<{ searchTerm: string }>());