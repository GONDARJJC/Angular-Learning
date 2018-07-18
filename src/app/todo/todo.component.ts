import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from './todo.service';

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
  }

  addTodo() {
    this.service.addTodo(this.desc).subscribe(todo => {
      console.log(todo);
      // this.todos = todo;
      this.todos = [...this.todos, todo];
      this.desc = '';
    })
  }
}
