import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {CourseService} from '../services/course.service';
import {ICourseSchedule} from '../models/course.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IFaculty} from '../models/faculty.model';
import {FacultyService} from '../services/faculty.service';

declare var $: any;

@Component({
  selector: 'app-courseschedule',
  templateUrl: './courseschedule.component.html',
  styleUrls: ['./courseschedule.component.css']
})
export class CoursescheduleComponent implements OnInit {

  courseId:number| undefined;;
  courseSchedule: any = [];
  facultylist: IFaculty[] = [];
  scheduleForm:any;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private facultyService: FacultyService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.courseId=parseInt(routeParams.courseid);
      this.getCourseSchedule(routeParams.courseid);
    });
    this.instantiateForm();
    this.getFacultyData();
  }

  getCourseSchedule(id: any) {
    this.courseService.getCourseSchedule(id).subscribe(data => {
      // for (let item of data) {
      //   var timeArr1 = (item.startTime).split(':');
      //   var date = new Date().setHours(Number(timeArr1[0]), Number(timeArr1[1]), Number(timeArr1[2]));
      //   item['startTime'] = date;
      //
      //   var timeArr2 = (item.endTime).split(':');
      //   date = new Date().setHours(Number(timeArr2[0]), Number(timeArr2[1]), Number(timeArr2[2]));
      //   item['endTime'] = date;
      // }
      this.courseSchedule = data;

      console.log(this.courseSchedule);
    }, error => {
      console.log(error);
    });
  }

  getFacultyData() {
    this.facultyService.getFacultyList().subscribe(facultydata => {
      this.facultylist = facultydata;
      console.log(this.facultylist);
    }, error => {
      console.log(error);
    });
  }

  instantiateForm() {
    this.scheduleForm = this.fb.group({
      courseId:this.courseId,
      dayOfWeek: ['', Validators.required],
      startTime: ['', [Validators.required]],
      endTime: ['', Validators.required],
      facultyId: ['', Validators.required]
    });
  }


  checkError(value:any) {
    return (this.scheduleForm.get(value).invalid &&
      (this.scheduleForm.get(value).touched || this.scheduleForm.get(value).dirty));
  }

  onSubmit() {

    console.log(this.scheduleForm.value);

    // stop here if form is invalid
    if (this.scheduleForm.invalid) {
      return;
    }
    this.scheduleForm.value.dayOfWeek=parseInt(this.scheduleForm.value.dayOfWeek);
    this.scheduleForm.value.facultyId=parseInt(this.scheduleForm.value.facultyId);

    this.courseService.addSchedule(this.scheduleForm.value).subscribe(response => {
      $('#scheduleform').modal('hide');
      this.getCourseSchedule(this.courseId);
    }, error => {
      console.log(error);
    });

  }

  onReset() {
    this.scheduleForm.reset();
  }
}
