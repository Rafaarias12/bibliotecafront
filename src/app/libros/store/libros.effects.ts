import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LibrosService } from '../../services/libros.service';
import {
  loadLibros,
  loadLibrosSuccess,
  loadLibrosFailure,
} from './libros.actions';

@Injectable()
export class LibrosEffects {
  loadLibros$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLibros),
      mergeMap(() =>
        this.librosService.getLibros().pipe(
          map((libros) => loadLibrosSuccess({ libros })),
          catchError((error) => of(loadLibrosFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private librosService: LibrosService
  ) {}
}
