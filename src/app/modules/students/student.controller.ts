import {  Request, Response } from "express";
import { studentService } from "./student.service";
// import studentValidationSchema from "./student.validation";  //joi validation

import ZodStudentSchema from "./student.zod.validation";  // zod validation
 // create students controller section
 const createStudentController= async(req:Request, res:Response)=>{
    try {
        const body = req.body

        //  create a schema validation using joi
        // const { error, value } = studentValidationSchema.validate(body);
        //    if(error){
        //     return res.status(400).json({ success:false, message:'User is not inserted successfully', error:error.details})
        //    }


        // zod validation 
      
       const zodParseData= ZodStudentSchema.parse(body)
      //  console.log(zodParseData);

        // service is called here 
        const result = await studentService.createStudentService(zodParseData)
        if(!result){
           return res.status(400).json({ success:false, message:'Student is not inserted successfully',  })
        }
       return res.status(200).json({ success:true, message:'Student is inserted successfully', data:result })
    } 
    catch (error:any) {
        console.log(error.message);
         return res.status(400).json({ success:false, message:error.message || 'User is not inserted successfully', error:error})
    }
}


//  get students controller section

const getStudentsController = async(req:Request, res:Response)=>{
  try {
    const result = await studentService.getStudentService();
    if(!result.length){
        return res.status(400).json({ success:false, message:'Students is not found successfully',  })
     }
    return res.status(200).json({ success:true, message:'Students is found successfully', data:result })
 
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success:false, message:'students is not found successfully' })
  }
  
}


const getSingleStudentsController = async(req:Request, res:Response)=>{
       try {
        const id = req.params.id
        console.log(id);
        const result = await studentService.getSingleStudentService(id)
        
        if(!result.length){
            return res.status(400).json({ success:false, message:'Student is not found successfully',  })
         }
        return res.status(200).json({ success:true, message:'Student is found successfully', data:result })
       } catch (error) {
        return res.status(400).json({ success:false, message:'student is not found successfully' })
       }
}


// delete single student by student_id

const deleteSingleStudentsController = async(req:Request, res:Response)=>{
       try {
        const id = req.params.id
        console.log(id);
        const result = await studentService.deleteSingleStudentService(id)
        console.log(result);
        if(!result){
            return res.status(400).json({ success:false, message:'Student is not found successfully',  })
         }
        return res.status(200).json({ success:true, message:'Student is found successfully', data:result })
       } catch (error) {
        return res.status(400).json({ success:false, message:'student is not found successfully' })
       }
}












export const studentController ={
    createStudentController,
    getStudentsController,
    getSingleStudentsController,
    deleteSingleStudentsController
}