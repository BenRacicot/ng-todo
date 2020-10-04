import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as todosState from './todos.reducer';
import { selectFragment } from 'src/app/state/router/router.selector';
import { ITodosState } from '@common';

export const todosSelector = createFeatureSelector<ITodosState>('todos');

export const allTodos = createSelector(
  todosSelector,
  todosState.todos,
);

export const filteredTodos = createSelector(
  allTodos,
  selectFragment,
  (todos, fragment) => {
    if (fragment === 'active') {
      return todos.filter(t => !t.completed);
    } else if (fragment === 'completed') {
      return todos.filter(t => t.completed);
    }
    return todos;
  }
);
