import { LibrosModel } from '../../models/libros.model';

export interface LibrosState {
    libros: LibrosModel[];
    filteredLibros: LibrosModel[];
    error: any;
  }
  
  export const initialState: LibrosState = {
    libros: [],
    filteredLibros: [],
    error: null
  };