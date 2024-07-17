import { Action, createReducer, on } from '@ngrx/store';
import { loadLibrosSuccess, loadLibrosFailure, filterLibros } from './libros.actions';
import { LibrosState, initialState } from './libros.state';

const _librosReducer = createReducer(
  initialState,
  on(loadLibrosSuccess, (state, { libros }) => ({
    ...state,
    libros,
    filteredLibros: libros,
    error: null
  })),
  on(loadLibrosFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(filterLibros, (state, { searchTerm }) => ({
    ...state,
    filteredLibros: state.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }))
);

export function librosReducer(state: LibrosState | undefined, action: Action) {
  return _librosReducer(state, action);
}