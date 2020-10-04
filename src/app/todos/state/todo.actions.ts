import { createAction, props } from '@ngrx/store';

export const addTodo = createAction(
  '[Todos] Add Todo',
  props<{ text: string }>(),
);

export const removeTodo = createAction(
  '[Todos] Remove Todo',
  props<{ id: number }>(),
);

export const updateTodo = createAction(
  '[Todos] Update Todo',
  props<{ id: number, text: string }>(),
);

export const selectAllTodos = createAction(
  '[Todos] Select All Todos'
);

export const selectTodo = createAction(
  '[Todos] Select Todo',
  props<{ id: number }>(),
);

export const toggleCompleted = createAction(
  '[Todos] Toggle Completed',
  props<{ id: number }>(),
);

export const toggleAllCompleted = createAction(
  '[Todos] Toggle All Completed',
);

export const clearCompleted = createAction(
  '[Todos] Clear Completed',
);
