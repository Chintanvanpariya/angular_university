import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ICourse} from '../models/course.model';
import {CourseService} from '../services/course.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  statusMessage="Fetching Data, please wait....";
  courselist: ICourse[] = [];
  courseForm: any;

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private Router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getCourseData();
    this.instantiateForm();
  }

  getCourseData() {
    this.courseService.getCourseList().subscribe(coursedata => {

      this.courselist = coursedata;
      console.log(this.courselist);
    }, error => {
      this.statusMessage="there was a service error !!!. try reloading again";
      console.log(error);
    });
  }

  viewSchedule(id: number) {
    this.Router.navigate([
      'courses/', id]);
  }


  instantiateForm() {
    this.courseForm = this.fb.group({
      courseCode: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  checkError() {

    if ((this.courseForm.get('courseCode').invalid &&
      (this.courseForm.get('courseCode').touched || this.courseForm.get('courseCode').dirty)) &&
      this.courseForm.value.courseCode!=(""||null)&&
      (
        this.courselist.some(item => item.courseCode == this.courseForm.get('courseCode').value.toUpperCase()
        )
      )
    ) {
      return true;
    }
    return false;
  }

  onSubmit() {

    console.log(this.courseForm.value);

    // stop here if form is invalid
    if (this.courseForm.invalid) {
      return;
    }
    this.courseForm.value.courseCode = this.courseForm.value.courseCode.toUpperCase();
    this.courseService.addCourse(this.courseForm.value).subscribe(response => {
      $('#courseForm').modal('hide');
      this.getCourseData();
    }, error => {
      console.log(error);
    });

  }

  onReset() {
    this.courseForm.reset();
  }
}

