import { createAction, props } from '@ngrx/store';
import { Todo } from './todo.model';

export const loadTodos = createAction('[Todo] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: Todo }>()
);
export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: number }>()
);

export const updateTodo = createAction(
    '[Todos] Update Todo',
    props<{ todo: Todo }>()
  );
  
export const loadTodosFailure = createAction(
    '[Todos] Load Todos Failure',
    props<{ error: any }>()
  );