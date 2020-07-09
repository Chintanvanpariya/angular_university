import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IFaculty} from '../models/faculty.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(
    private _http: HttpClient
  ) {
  }

  getFacultyList(): Observable<IFaculty[]> {
    let url = environment.baseUrl+`Faculties`;

    return this._http.get<IFaculty[]>(url).pipe(map(response => {
      return response;
    }));
  }

  addFaculty(body): Observable<IFaculty> {
    let url = environment.baseUrl+`Faculties`;

    return this._http.post<IFaculty>(url, body).pipe(map(response => {
      return response;
    }));
  }

}
