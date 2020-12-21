import {IAddress} from './address.model';

export interface IStudent {

  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  address: IAddress;
  enrollmentDate: string;
}
