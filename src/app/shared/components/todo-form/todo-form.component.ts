import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  @Output() add = new EventEmitter<string>();
  @Output() selectAll = new EventEmitter();
  @Input() allSelected: string;
  @Input() todoExisting: boolean;
  public form = <FormGroup>this.fb.group({
    newTodo: this.fb.control(null)
  });

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {}

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.add.emit(this.form.value.newTodo);
    this.form.patchValue({
      'newTodo': ''
    });
  }

  public toggleAll(): void {
    this.selectAll.emit();
  }
}
