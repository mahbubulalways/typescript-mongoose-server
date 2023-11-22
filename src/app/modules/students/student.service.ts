import { IStudentInterface } from './student.interface';
import Student from './student.model';

const createStudentService = async (studentData: IStudentInterface) => {
  const exist = await Student.isExistingStudent(studentData.student_id);
  if (exist) {
    throw new Error('User this id already exist');
  }
  const result = await Student.create(studentData);

  //  {  const newStudent = new Student(studentData)  // create an instance
  //     const exist = await newStudent.isUserExist(studentData.student_id)
  //     if(exist){
  //     throw new Error('Student this id already exist!!!')
  //     }
  //     const result = await newStudent.save()   // build in instance  method
  //  }

  return result;
};

const getStudentService = async () => {
  const result = await Student.find( {})
  
  return result;
};

const getSingleStudentService = async (id: string) => {
  // const result = await Student.findOne({ student_id: id });
  const result = await Student.aggregate([
    {$match:{student_id:id }}
  ])
  return result;
};

// delete student service

const deleteSingleStudentService = async (id: string) => {
  console.log(id);
  const result = await Student.updateOne(
    { student_id: id },
    { isDeleted: true },
  );
  return result;
};

export const studentService = {
  createStudentService,
  getStudentService,
  getSingleStudentService,
  deleteSingleStudentService,
};
