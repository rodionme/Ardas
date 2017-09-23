import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Task } from '../models/task';

@Injectable()
export class TaskService {
  private tasksUrl = 'api/tasks';

  constructor(private http: Http) {}

  getTasks(): Observable<Task[]> {
    return this.http
      .get(this.tasksUrl)
      .map(response => response.json().data as Task[])
      .catch(this._handleError);
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http
      .get(url)
      .map(response => response.json().data as Task)
      .catch(this._handleError);
  }

  private _handleError(err: any) {
    console.log('sever error:', err);

    return Observable.throw(err || 'backend server error');
  }
}