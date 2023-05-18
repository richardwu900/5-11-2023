import { createReducer, on } from '@ngrx/store';
import { Todo } from './todo.model';
import * as TodoActions from './todos.actions';

export interface TodosState {
  todos: Todo[];
}

export const initialState: TodosState = {
  todos: []
};

export const todosReducer = createReducer(
  initialState,
  // update todos with received todos
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({ ...state, todos })),
  // Add a new todo to todos
  on(TodoActions.addTodo, (state, { todo }) => ({ ...state, todos: [...state.todos, todo] })),
  // Delete the item with given id from todos
  on(TodoActions.deleteTodo, (state, { id }) => ({ ...state, todos: state.todos.filter(todo => todo.id !== id) })),
  // Iterate over list, checks for item id that matches the specified todo.id, updates it if found.
  on(TodoActions.updateTodo, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(item => item.id === todo.id ? todo : item)
  }))
);

