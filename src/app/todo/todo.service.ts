import { Injectable } from '@angular/core';
import { Todo } from '../todo.model';
import { UUID } from 'angular2-uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // private api_url = 'api/todos';
  private api_url = 'http://localhost:3000/todos';
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
  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.api_url);
  }

  filterTodos(filter: string): Observable<Todo[]> {
    switch (filter) {
      case 'ACTIVE':
        return this.http
          .get<Todo[]>(`${this.api_url}?completed=false`);
      case 'COMPLETED':
        return this.http
          .get<Todo[]>(`${this.api_url}?completed=true`);
      default:
        return this.getTodos();
    }
  }
}
