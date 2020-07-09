import {IAddress} from './address.model';

export class IFaculty {

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
