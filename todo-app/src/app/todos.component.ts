import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import { Store } from '@ngrx/store';
import * as TodoActions from './todos.actions';
import * as TodoSelectors from './todos.selectors';

@Component({
  selector: 'app-todos',
  template: `
    <h1>Todo List</h1>
    <input type="text" [(ngModel)]="currentTitle" placeholder="Enter something to do.">
    <button (click)="addTodo()">add</button>
    <li *ngFor="let todo of todos | async" [ngClass]="{ 'completed': todo.completed }" (click)="switchCompletion(todo)">
    <span *ngIf="todo.completed">&#10003;</span>
    {{ todo.title }}
    <button (click)="deleteTodo(todo.id)">delete</button>
    </li>
  `,
  styles: [`
    .completed {
      text-decoration: line-through;
    }
  `]
})
export class TodosComponent implements OnInit {
  todos!: Observable<Todo[]>;
  currentTitle!: string;

  constructor(private store: Store) { }

  ngOnInit(): void {
    // initialize todolist with endpoint's items
    this.store.dispatch(TodoActions.loadTodos());
    this.todos = this.store.select(TodoSelectors.selectTodos);
  }

  // Add a new todolist item.
  addTodo(): void {
    // Make a new item with id of date/time to millisecond, current title, and unchecked.
    const todo: Todo = {
      id: Date.now(),
      title: this.currentTitle,
      completed: false
    };
    this.store.dispatch(TodoActions.addTodo({ todo }));
    // blank title after adding
    this.currentTitle = '';
  }

  // Delete todolist item by id
  deleteTodo(id: number): void {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }
  
  // Toggle Complete/UnComplete
  switchCompletion(todo: Todo): void {
    // make a new item that's the same, just inverse completed value
    const updatedTodo: Todo = { ...todo, completed: !todo.completed };
    this.store.dispatch(TodoActions.updateTodo({ todo: updatedTodo }));
  }
}
