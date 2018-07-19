import { Component, OnInit, Inject } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from './todo.service';
import { tap } from 'rxjs/operators';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc = '';
  constructor(
    private service: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  @Inject('todoService')
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const filter = params['filter'];
      this.filterTodos(filter);
    });
  }

  filterTodos(filter: string): void {
    this.service.filterTodos(filter)
      .subscribe(todos => {
        this.todos = [...todos]
      });
  }

  onTextChanges(value) {
    this.desc = value;
  }

  toggleAll() {
    this.todos.forEach(todo => this.toggleTodo(todo));
  }

  clearCompleted() {
    const todos = this.todos.filter(todo => todo.completed === true);
    todos.forEach(todo => this.removeTodo(todo));
  }

  addTodo() {
    this.service
      .addTodo(this.desc)
      .subscribe(todo => {
        this.todos = [...this.todos, todo];
        this.desc = '';
      });
  }

  toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
      .toggleTodo(todo)
      .pipe(
        tap(d => console.log(d))
      )
      .subscribe(t => {
        this.getTodos();
      });
  }
  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
      .deleteTodoById(todo.id)
      .subscribe((asd) => {
        this.todos = [
          ...this.todos.slice(0, i),
          ...this.todos.slice(i + 1)
        ];
      });
  }
  getTodos(): void {
    this.service
      .getTodos()
      .pipe(
        tap(d => console.log(d, 11))
      )
      .subscribe(todos => {
        this.todos = [...todos];
      });
  }
}
