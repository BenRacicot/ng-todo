import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TodosFacade } from 'src/app/todos/state/todos.facade';
import { ITodo } from '@common';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  public todos$: Observable<ITodo[]>;
  public activeFragment: string;
  public activeTodos: number = 0;
  public completedTodos: number = 0;
  public allSelected: boolean = false;
  public todoExisting: boolean = true;

  constructor(
    private todosFacade: TodosFacade,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.todos$ = this.todosFacade.filteredTodo$;

    this.todosFacade.allTodos$
      .pipe(
        takeUntil(this._ngUnsubscribe)
      )
      .subscribe((todos: ITodo[]) => {
        this.todoExisting = todos.length > 0;
        this.activeTodos = todos.filter(t => !t.completed).length;
        this.completedTodos = todos.filter(t => t.completed).length;
        this.allSelected = this.activeTodos === 0;
      });

    this.route.fragment
      .pipe(
        takeUntil(this._ngUnsubscribe)
      )
      .subscribe(fragment => {
        this.activeFragment = fragment;
      });
  }

  public onAdd(event: string) {
    this.todosFacade.addTodo(event);
  }

  public selectAll(): void {
    this.todosFacade.selectAllTodos();
  }

  public clearCompleted(): void {
    this.todosFacade.clearCompleted();
  }

  public ngOnDestroy(): void {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
