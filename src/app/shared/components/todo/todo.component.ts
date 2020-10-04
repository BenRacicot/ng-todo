import { Component, OnInit, Input, forwardRef, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { BaseControlValueAccessor } from '@shared/utilities/BaseControlValueAccessor';
import { TodosFacade } from 'src/app/todos/state/todos.facade';
import { ITodo } from '@common';

@Component({
  selector: 'todo, [todo]',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TodoComponent),
      multi: true
    }
  ]
})
export class TodoComponent extends BaseControlValueAccessor<any> implements OnInit, ControlValueAccessor {
  @Input() todo: ITodo;
  @Input() editing: boolean = false;

  public form = <FormGroup>this.fb.group({
    toggle: this.fb.control(false),
    content: this.fb.control(null)
  });

  constructor(
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private todosFacade: TodosFacade
  ) {
    super();
  }

  public ngOnInit(): void {
    this.form.patchValue({
      content: this.todo.text
    });
  }

  public selectTodo(): void {
    this.todosFacade.selectTodo(this.todo.id);
  }

  public onSubmit(): void {
    this.todosFacade.updateTodo(this.todo.id, this.form.value.content);
    this.editing = false;
  }

  public doubleClick(event: MouseEvent) {
    this.editing = true;
    const click$ = fromEvent(document, 'click');

    click$.pipe(
      takeWhile(val => {
        this.editing = this.elementRef.nativeElement.contains(val.target) ? true : false;
        this.changeDetectorRef.detectChanges();
        return this.editing;
      })
    ).subscribe();
  }

  public destroy(): void {
    this.todosFacade.removeTodo(this.todo.id);
  }
}
