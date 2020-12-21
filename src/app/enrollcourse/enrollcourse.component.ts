import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../services/course.service';
import {ICourse} from '../models/course.model';

@Component({
  selector: 'app-enrollcourse',
  templateUrl: './enrollcourse.component.html',
  styleUrls: ['./enrollcourse.component.css']
})
export class EnrollcourseComponent implements OnInit {

  studentid: number| undefined;;
  courselist: ICourse[] = [];
  enrolledcourseIds: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.studentid = parseInt(param.studentid);
      this.getStudentEnrolledCourses(param.studentid);
      this.getCourseData();
    });

  }

  getStudentEnrolledCourses(id: number) {
    this.courseService.getStudentEnrolledCourse(id).subscribe(data => {
      this.enrolledcourseIds = data;
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
    return this.courselist.some(item => (this.enrolledcourseIds.includes(id)));
  }

  enrollCourse(new_id: number) {

    let data = {
      'studentId': this.studentid,
      'coursesEnrolled': [...this.enrolledcourseIds]
    };
    console.log(data);
    data.coursesEnrolled.push(new_id);
    this.courseService.enrollNewCourse(data).subscribe(coursedata => {
      this.enrolledcourseIds.push(new_id);
    }, error => {
      console.log(error);
    });


  }
}
