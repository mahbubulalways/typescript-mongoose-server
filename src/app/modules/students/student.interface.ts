import { Model } from 'mongoose';

export interface IGuardianInfo {
  fatherName: string;
  fatherOccupation: string;
  motherOccupation: string;
  motherName: string;
  guardianContact: string;
}
export interface IUserName {
  firstName: string;
  lastName: string;
}

export type TLocalGuardian = {
  name: string;
  contactNumber: string;
  address: string;
};

export interface IStudentInterface {
  student_id: string;
  name: IUserName;
  password:string,
  gender: 'Male' | 'Female';
  email: string;
  profileImage?: string;
  dateOfBirth: string;
  contactNumber: string;
  emergencyContact: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardianInfo;
  localGuardian: TLocalGuardian;
  isActive: 'Active' | 'Inactive';
  isDeleted:boolean,
 
}
 
// for static  method 

 export interface StudentModel extends Model<IStudentInterface> {
    isExistingStudent(id:string):Promise<IStudentInterface> | null
  }



// for creating custom instance 
// export type TStudentMethod = {
//   isUserExist(id: string): Promise<IStudentInterface | null>;
// };

// export type StudentModel = Model<
//   IStudentInterface,
//   Record<string, never>,
//   TStudentMethod
// >;
