import config from '../../config';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt'
import {
  IGuardianInfo,
  TLocalGuardian,
  IStudentInterface,
  // TStudentMethod, custom instance
  IUserName,
  StudentModel,
} from './student.interface';
import validator from 'validator';

//  user name sub schema
const userNameSchema = new Schema<IUserName>({
  firstName: {
    type: String,
    trim: true,
    maxlength: [10, 'Name can not be more than 10 characters'],
    required: [true, 'First name is required'],
    validate: {
      validator: function (value: string) {
        //  const  res= value.replace(/^\w/, (c) => c.toUpperCase());
        const firstNAmeStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return value === firstNAmeStr;
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [10, 'Name can not be more than 10 characters'],
    required: [true, 'Last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

//  guardian info sub schema
const guardianSchema = new Schema<IGuardianInfo>({
  fatherName: { type: String, required: [true, 'Father name  is required'] },
  fatherOccupation: { type: String },
  motherName: { type: String, required: [true, 'Mother name  is required'] },
  motherOccupation: { type: String },
  guardianContact: {
    type: String,
    required: [true, 'Guardian  contact  is required'],
  },
});

//  local guardian info sub schema
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String },
  contactNumber: { type: String },
  address: { type: String },
});

//  main student schema
const studentSchema = new Schema<IStudentInterface, StudentModel
// TStudentMethod is custom instance
>({
  student_id: { type: String, required: [true, 'Student_id is required'] },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  password:{
    type:String,
    required:true,
    minlength:6,
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female'],
      message: '{VALUE} is not valid',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
  dateOfBirth: { type: String },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  contactNumber: { type: String },
  emergencyContact: { type: String },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  permanentAddress: { type: String, required: true },
  presentAddress: { type: String, required: true },
  profileImage: { type: String },
  isActive: { type: String, enum: ['Active', 'Inactive'], required: true },
  isDeleted:{
    type:Boolean,
    default:false
  }
},
{
  toJSON:{
    virtuals:true
  }
});

// pre save middleware will work on create() and save() function

studentSchema.pre('save', async function(next){
  // password converted hash password
       this.password = await bcrypt.hash( this.password, Number(config.BCRYPT_SALT));
      next()
})

//  query middleware
studentSchema.pre('find',  function(next){
  // console.log(this);
     this.find({ isDeleted:{ $ne : true }} )
   next()
})
studentSchema.pre('aggregate',  function(next){
    // console.log(this);
    //  this.find({ isDeleted:{ $ne : true }} )
    const result = {  $match:{ isDeleted: { $ne: true } } }
    this.pipeline().unshift(result)
    // console.log(this.pipeline());
   next()
})


// creating a static instance 

studentSchema.statics.isExistingStudent = async function (id:string) {
      const isExist = await Student.findOne({student_id : id})
      // console.log(isExist);
      return isExist
};


// creating a custom instance method
// studentSchema.methods.isUserExist= async function(id:string){
//   const exitingUser = await Student.findOne({student_id:id})
//   return exitingUser
// }


// virtual 

studentSchema.virtual('fullName').get(function(){
  return  `${this.name.firstName} ${this.name.lastName} `
})









// create model
const Student = model<IStudentInterface, StudentModel>('Student', studentSchema);
export default Student;


