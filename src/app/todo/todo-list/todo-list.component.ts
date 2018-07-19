import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  _todos: Todo[] = [];
  @Input()
  set todos(todos: Todo[]) {
    this._todos = [...todos];
  }
  get todos() {
    return this._todos;
  }
  @Output() RemoveTodo = new EventEmitter<Todo>();
  @Output() ToggleTodo = new EventEmitter<Todo>();
  @Output() ToggleAll = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
  onToggleAllTriggerd() {
    this.ToggleAll.emit(true);
  }
  onRemoveTriggered(todo: Todo) {
    this.RemoveTodo.emit(todo);
  }
  onToggleTriggered(todo: Todo) {
    this.ToggleTodo.emit(todo);
  }

}
