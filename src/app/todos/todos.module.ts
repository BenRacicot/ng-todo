import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';

import { TodosComponent } from './todos.component';
import { TodosFacade } from './state/todos.facade';
import { todosReducer, metaReducers } from './state/todos.reducer';
import { TodosRoutingModule } from './todos.routing.module';

@NgModule({
  imports: [
    SharedModule,
    TodosRoutingModule,
    StoreModule.forFeature('todos', todosReducer, {
      metaReducers
    }),
  ],
  declarations: [TodosComponent],
  providers: [TodosFacade],
})
export class TodosModule { }
