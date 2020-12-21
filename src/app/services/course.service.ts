import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ICourse, ICourseSchedule} from '../models/course.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private _http: HttpClient
  ) {
  }

  //all the courses data
  getCourseList(): Observable<ICourse[]> {
    let url = environment.baseUrl+'Courses';

    return this._http.get<ICourse[]>(url).pipe(map(response => {
      return response;
    }));
  }

  //add new course
  addCourse(body:any): Observable<ICourse> {
    let url = environment.baseUrl+`Courses`;

    return this._http.post<ICourse>(url, body);
  }

//---------------------------------------------------------------------------------------------------------------------------------

  //get schedule of particular course
  getCourseSchedule(id: number): Observable<ICourseSchedule[]> {
    let url = environment.baseUrl+`Courses/${id}/schedule`;

    return this._http.get<ICourseSchedule[]>(url);
  }

  // add new schedule to a course
  addSchedule(body:any): Observable<ICourseSchedule> {
    let url = environment.baseUrl+`Courses/${body.courseId}/schedule`;

    return this._http.post<ICourseSchedule>(url, body);
  }

//---------------------------------------------------------------------------------------------------------------------------------

  // get single student's enrolled courses
  getStudentEnrolledCourse(id:number): Observable<[]> {
    let url = environment.baseUrl+`Students/${id}/Courses`;
    return this._http.get<[]>(url);
  }

  // enroll student to a new course
  enrollNewCourse(obj:any): Observable<any> {
    let url = environment.baseUrl+`Students/${obj.studentId}/Courses`;
    return this._http.put<any>(url,obj);
  }

//---------------------------------------------------------------------------------------------------------------------------------

  // get single student's enrolled courses
  getFacultyAssignedCourses(id:number): Observable<[]> {
    let url = environment.baseUrl+`Faculties/${id}/Courses`;
    return this._http.get<[]>(url);
  }

  //assign a faculty a new course
  assignNewCourse(obj:any): Observable<any> {
    let url = environment.baseUrl+`Faculties/${obj.facultyId}/Courses`;
    return this._http.put<any>(url,obj);
  }


}
