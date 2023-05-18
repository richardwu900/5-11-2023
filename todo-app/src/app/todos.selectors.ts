import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todos.reducer';

// select the TodosState feature state
export const selectTodosState = createFeatureSelector<TodosState>('todos');

// pick out the todos list from the state
export const selectTodos = createSelector(
  selectTodosState,
  state => state.todos
);
