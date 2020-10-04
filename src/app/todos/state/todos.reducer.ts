import { Action, createReducer, on } from '@ngrx/store';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as TodoActions from './todo.actions';
import { ITodosState } from '@common';

export const initialState: ITodosState = {
  todos: []
};

export function todosReducer(state: ITodosState, action: Action) {
  return createReducer(
    initialState,
    on(TodoActions.addTodo, (existingState, { text }) => ({
      ...existingState,
      todos: [{
        id: Date.now(),
        text,
        completed: false
      },
      ...(existingState.todos || [])
      ],
    })),
    on(TodoActions.removeTodo, (existingState, { id }) => ({
      ...existingState,
      todos: existingState.todos.filter(t => t.id !== id)
    })),
    on(TodoActions.updateTodo, (existingState, { id, text }) => ({
      ...existingState,
      todos: existingState.todos.map(t => ({
        ...t,
        text: t.id === id ? text : t.text
      }))
    })),
    on(TodoActions.selectAllTodos, (existingState) => {
      const allSelected = existingState.todos.every(t => t.completed);
      return {
        ...existingState,
        todos: existingState.todos.map(t => ({
          ...t,
          completed: !allSelected
        }))
      }
    }),
    on(TodoActions.selectTodo, (existingState, { id }) => {
      const updatedTodos = [...existingState.todos];
      const index = updatedTodos.findIndex(t => t.id === id);
      const todo = updatedTodos[index];
      updatedTodos[index] = {
        ...todo,
        completed: !todo.completed
      };
      return {
        ...existingState,
        todos: updatedTodos
      };
    }),
    on(TodoActions.clearCompleted, (existingState) => ({
      ...existingState,
      todos: existingState.todos.filter(todo => !todo.completed),
    })),
  )(state, action);
}

export const todos = (state: ITodosState) => state.todos || [];

export const localStorageSyncReducer = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return localStorageSync({
    keys: ['todos'],
    rehydrate: true
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
