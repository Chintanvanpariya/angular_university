import {Component, OnInit} from '@angular/core';
import {StudentService} from '../services/student.service';
import {IStudent} from '../models/student.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import data from './../services/data.json';

declare var $: any;

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  statusMessage="Fetching Data, please wait....";
  studentlist: IStudent[] = [];
  studentForm: any|FormGroup;
  states = data;
  today = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().substring(0, 10);

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,) {
  }


  ngOnInit(): void {
    this.getStudentData();
    this.instantiateForm();
  }

  getStudentData() {
    this.studentService.getStudentList().subscribe(studentdata => {
      this.studentlist = studentdata;
      console.log(this.studentlist);
    }, error => {
      console.log(error);
      this.statusMessage="there was a service error !!!. try reloading again";
    });

  }

  instantiateForm() {
    this.studentForm = this.fb.group({

      firstName: ['chin', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['van', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      gender: ['Male', Validators.required],
      phone: ['1234567890', [Validators.required, Validators.pattern('[0-9 ]{10}')]],
      dob: ['', Validators.required],
      address: this.fb.group({
        streetAddress_1: ['', Validators.required],
        streetAddress_2: [''],
        city: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        state: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        zip: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
      }),
      enrollmentDate: ['', Validators.required],
    });
  }

  checkError(value: string, form?: string) {
    if (form === 'address') {
      return (this.studentForm.controls.address.get(value).invalid &&
        (this.studentForm.controls.address.get(value).touched || this.studentForm.controls.address.get(value).dirty));
    } else {
      return (this.studentForm.get(value).invalid &&
        (this.studentForm.get(value).touched || this.studentForm.get(value).dirty));
    }
  }

  emailerror = false;

  onSubmit() {

    console.log(this.studentForm.value);
    // stop here if form is invalid
    if (this.studentForm.invalid) {
      return;
    }

    this.studentService.addStudent(this.studentForm.value).subscribe(response => {
      $('#studentform').modal('hide');
      this.studentForm.reset();
      this.getStudentData();
      this.emailerror = false;
    }, error => {
      console.log(error);
      if (error.error == 'Student already exists with the same email') {
        this.emailerror = true;
      }
    });

  }

  onReset() {
    $('#studentform').modal('hide');
    this.studentForm.reset();
    this.emailerror = false;
  }

}
