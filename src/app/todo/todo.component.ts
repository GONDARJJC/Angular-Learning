import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from './todo.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc = '';

  constructor(private service: TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  addTodo() {
    this.service
      .addTodo(this.desc)
      .subscribe(todo => {
        console.log(todo);
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
        console.log(t, 111);
        this.getTodos();
        // this.todos = [
        //   ...this.todos.slice(0, i),
        //   // t,
        //   ...this.todos.slice(i + 1)
        //   ];
      });
  }
  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
      .deleteTodoById(todo.id)
      .subscribe((asd) => {
        console.log(asd);
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
