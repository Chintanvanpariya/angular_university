import {IAddress} from './address.model';

export interface IFaculty {

  facultyId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  address: IAddress;
  designation: string;
  salary: number;
}
