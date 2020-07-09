import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IStudent} from '../models/student.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private _http: HttpClient
  ) {
  }

  getStudentList(): Observable<IStudent[]> {
    let url = environment.baseUrl+`Students`;

    return this._http.get<IStudent[]>(url).pipe(map(response => {
      return response;
    }));
  }

  addStudent(body): Observable<IStudent> {
    let url = environment.baseUrl+`Students`;

    return this._http.post<IStudent>(url, body).pipe(map(response => {
      return response;
    }));
  }



}
