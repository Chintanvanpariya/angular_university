import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {StudentsComponent} from './students/students.component';
import {FacultiesComponent} from './faculties/faculties.component';
import {CoursesComponent} from './courses/courses.component';
import {CoursescheduleComponent} from './courseschedule/courseschedule.component';
import {EnrollcourseComponent} from './enrollcourse/enrollcourse.component';
import {AssigncourseComponent} from './assigncourse/assigncourse.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'faculties', component: FacultiesComponent},
  {
    path: 'courses',
    children: [
      {path: '', component: CoursesComponent},
      {path: ':courseid', component: CoursescheduleComponent}
    ]
  },
  {path: 'studentcourses/:studentid', component: EnrollcourseComponent},
  {path: 'facultycourses/:facultyid', component: AssigncourseComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
