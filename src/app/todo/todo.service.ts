import { Injectable } from '@angular/core';
import { Todo } from '../todo.model';
import { UUID } from 'angular2-uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';  

@Injectable({
	providedIn: 'root'
})
export class TodoService {
	private api_url = 'api/todos';
	private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

	constructor(private http: HttpClient) {}

	addTodo(desc: string):Observable<Todo>{
		let todo = {
			id: UUID.UUID(),
			desc: desc,
			completed: false
		};
		return this.http
			.post<Todo>(this.api_url, todo, {headers: this.headers})
	}
}
