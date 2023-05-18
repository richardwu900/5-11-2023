import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodosService } from './todos.service';
import * as TodoActions from './todos.actions';

import { loadTodosFailure } from './todos.actions';

@Injectable()
export class TodosEffects {

  constructor(
        private actions: Actions,
        private todosService: TodosService
      ) {}

  loadTodos = createEffect(() =>
    this.actions.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todosService.getTodos().pipe(
          //dispatch loadTodosSuccess action with successful map, adding valid todolist items
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) => of(TodoActions.loadTodosFailure({ error })))
        )
      )
    )
  );

}
