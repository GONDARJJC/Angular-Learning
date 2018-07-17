import { Injectable } from '@angular/core';
import { Todo } from '../todo.model';
import { UUID } from 'angular2-uuid';
// import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { toPromise } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class TodoService {
	private api_url = 'api/todos';
	private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

	// todos: Todo[] = [];

	constructor(private http: HttpClient) {}

	addTodo(desc: string): Promise<Todo> {
		let todo = {
			id: UUID.UUID(),
			desc: desc,
			completed: false
		};
		return this.http
			.post('http://127.0.0.1:3500/Js/data.json', JSON.stringify(todo), { headers: this.headers })
			.toPromise()
			.then((res) => res.json().data as Todo)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occured', error);
		return Promise.reject(error.message || error);
	}
}
