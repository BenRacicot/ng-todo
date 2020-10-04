import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as TodoActions from './todo.actions';
import * as todoSelectors from './todo.selectors';
import { ITodo, ITodosState } from '@common';

@Injectable()
export class TodosFacade {
  allTodos$: Observable<ITodo[]>;
  filteredTodo$: Observable<ITodo[]>;

  constructor(private store: Store<ITodosState>) {
    this.allTodos$ = this.store.select(todoSelectors.allTodos);
    this.filteredTodo$ = this.store.select(todoSelectors.filteredTodos);
  }

  addTodo(text: string): void {
    this.store.dispatch(TodoActions.addTodo({ text }));
  }

  removeTodo(id: number): void {
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }

  toggleComplete(id: number): void {
    this.store.dispatch(TodoActions.toggleCompleted({ id }));
  }

  toggleAllCompleted(): void {
    this.store.dispatch(TodoActions.toggleAllCompleted());
  }

  updateTodo(id: number, text: string): void {
    this.store.dispatch(TodoActions.updateTodo({ id, text }));
  }

  selectAllTodos(): void {
    this.store.dispatch(TodoActions.selectAllTodos());
  }

  selectTodo(id: number): void {
    this.store.dispatch(TodoActions.selectTodo({ id }));
  }

  clearCompleted(): void {
    this.store.dispatch(TodoActions.clearCompleted());
  }
}
