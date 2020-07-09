import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {StudentsComponent} from './students/students.component';
import {FacultiesComponent} from './faculties/faculties.component';
import {CoursesComponent} from './courses/courses.component';
import {CoursescheduleComponent} from './courseschedule/courseschedule.component';
import {EnrollcourseComponent} from './enrollcourse/enrollcourse.component';

import {StudentService} from './services/student.service';
import {FacultyService} from './services/faculty.service';
import {CourseService} from './services/course.service';

import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app.routing';
import {WeekdayPipe} from './courseschedule/weekday.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import { AssigncourseComponent } from './assigncourse/assigncourse.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentsComponent,
    CoursesComponent,
    FacultiesComponent,
    CoursescheduleComponent,
    WeekdayPipe,
    EnrollcourseComponent,
    AssigncourseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    StudentService,
    FacultyService,
    CourseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
