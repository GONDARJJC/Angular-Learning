import { Injectable } from '@angular/core';
import { Todo } from '../todo.model';
import { UUID } from 'angular2-uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private api_url = 'api/todos';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  addTodo(desc: string): Observable<Todo> {
    const todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false
    };
    return this.http
      .post<Todo>(this.api_url, todo, { headers: this.headers });
  }

  toggleTodo(todo: Todo): Observable<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    console.log(url);
    console.log(todo);
    const updatedTodo = Object.assign({}, todo, {completed: !todo.completed});
    console.log(updatedTodo);
    return this.http
      .put<Todo>(url, updatedTodo, { headers: this.headers });
  }

  deleteTodoById(id: string): Observable<Todo> {
    const url = `${this.api_url}/${id}`;
    return this.http
      .delete<Todo>(url, {headers: this.headers});
  }
  // GET /todos
  getTodos(): Observable<any> {
    return this.http
      .get<any>('http://127.0.0.1:3500/Js/data.json');
  }
}
