import {Component, OnInit} from '@angular/core';
import {IFaculty} from '../models/faculty.model';
import {FacultyService} from '../services/faculty.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import data from '../services/data.json';
declare var $:any;

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.css']
})
export class FacultiesComponent implements OnInit {

  statusMessage="Fetching Data, please wait....";
  facultylist: IFaculty[] = [];
  facultyForm: FormGroup;
  states = data;
  today = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().substring(0, 10);

  constructor(
    private facultyService: FacultyService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getFacultyData();
    this.instantiateForm();
  }

  getFacultyData() {
    this.facultyService.getFacultyList().subscribe(facultydata => {

      this.facultylist = facultydata;
      console.log(this.facultylist);
    }, error => {
      this.statusMessage="there was a service error !!!. try reloading again";
      console.log(error);
    });
  }

  instantiateForm() {
    this.facultyForm = this.fb.group({

      firstName: ['chin', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['van', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      gender: ['Male', Validators.required],
      phone: ['1234567890', [Validators.required, Validators.pattern('[0-9 ]{10}')]],
      dob: ['',Validators.required],
      designation: ['',Validators.required],
      salary: ['',Validators.required],
      address: this.fb.group({
        streetAddress_1: ['', Validators.required],
        streetAddress_2: [''],
        city: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        state: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        zip: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
      }),

    });
  }

  checkError(value: string, form?: string) {
    if (form === 'address') {
      return (this.facultyForm.controls.address.get(value).invalid &&
        (this.facultyForm.controls.address.get(value).touched || this.facultyForm.controls.address.get(value).dirty));
    } else {
      return (this.facultyForm.get(value).invalid &&
        (this.facultyForm.get(value).touched || this.facultyForm.get(value).dirty));
    }
  }

  emailerror=false;
  onSubmit() {

    console.log(this.facultyForm.value);
    // stop here if form is invalid
    if (this.facultyForm.invalid) {
      return;
    }

    this.facultyForm.value.salary=parseInt(this.facultyForm.value.salary);
    this.facultyService.addFaculty(this.facultyForm.value).subscribe(response => {
      $("#facultyform").modal("hide");
      this.facultyForm.reset();
      this.getFacultyData();
      this.emailerror=false;

    }, error => {
      console.log(error);
      if (error.error == 'Faculty already exists with the same email') {
        this.emailerror = true;
      } else {
      }
    });

  }

  onReset() {
    $("#facultyform").modal("hide");
    this.facultyForm.reset();
    this.emailerror=false;
  }

}
