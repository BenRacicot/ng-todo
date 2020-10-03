import { Component, Input } from '@angular/core';

import { ITodo } from '@common';

@Component({
  selector: 'todo-list',
  styleUrls: ['./todo-list.component.scss',],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent{
  @Input()
  public todos: ITodo[];
}
