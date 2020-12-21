import { Component, OnInit } from '@angular/core';
import {ICourse} from '../models/course.model';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../services/course.service';

@Component({
  selector: 'app-assigncourse',
  templateUrl: './assigncourse.component.html',
  styleUrls: ['./assigncourse.component.css']
})
export class AssigncourseComponent implements OnInit {

  facultyId: number | undefined;
  courselist: ICourse[] = [];
  coursesTaught: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.facultyId = parseInt(param.facultyid);
      this.getFacultyAssignedCourses(param.facultyid);
      this.getCourseData();
    });

  }

  getFacultyAssignedCourses(id: number) {
    this.courseService.getFacultyAssignedCourses(id).subscribe(data => {
      this.coursesTaught = data;
    }, error => {
      console.log(error);
    });
  }


  getCourseData() {
    this.courseService.getCourseList().subscribe(coursedata => {

      this.courselist = coursedata;
      console.log(this.courselist);
    }, error => {
      console.log(error);
    });
  }

  checkIdpresence(id: number): boolean {
    return this.courselist.some(item => (this.coursesTaught.includes(id)));
  }

  assignCourse(new_id: number) {

    let data = {
      'facultyId': this.facultyId,
      'coursesTaught': [...this.coursesTaught]
    };
    console.log(data);
    data.coursesTaught.push(new_id);
    this.courseService.assignNewCourse(data).subscribe(coursedata => {
      this.coursesTaught.push(new_id);
    }, error => {
      console.log(error);
    });


  }
}
