import Joi from 'joi';

const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .max(10)
      .required()
      .pattern(/^[A-Za-z]+$/)
      .messages({
        'string.pattern.base': 'First name should contain only alphabetic characters',
        'string.empty': 'First name is required',
        'string.max': 'Name cannot be more than 10 characters',
        'any.required': 'First name is required',
      }),
    lastName: Joi.string()
      .trim()
      .max(10)
      .required()
      .pattern(/^[A-Za-z]+$/)
      .messages({
        'string.pattern.base': 'Last name should contain only alphabetic characters',
        'string.empty': 'Last name is required',
        'string.max': 'Name cannot be more than 10 characters',
        'any.required': 'Last name is required',
      }),
  });
  
  // Joi schema for the guardian info sub-schema
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required().messages({
      'string.empty': 'Father name is required',
      'any.required': 'Father name is required',
    }),
    fatherOccupation: Joi.string(),
    motherName: Joi.string().required().messages({
      'string.empty': 'Mother name is required',
      'any.required': 'Mother name is required',
    }),
    motherOccupation: Joi.string(),
    guardianContact: Joi.string().required().messages({
      'string.empty': 'Guardian contact is required',
      'any.required': 'Guardian contact is required',
    }),
  });
  
  // Joi schema for the local guardian info sub-schema
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string(),
    contactNumber: Joi.string(),
    address: Joi.string(),
  });
  
  // Joi schema for the main student schema
  const studentValidationSchema = Joi.object({
    student_id: Joi.string().required().messages({
      'string.empty': 'Student ID is required',
      'any.required': 'Student ID is required',
    }),
    name: userNameValidationSchema.required().messages({
      'object.base': 'Name object is required',
      'any.required': 'Name is required',
    }),
    gender: Joi.string().valid('Male', 'Female').messages({
      'any.only': 'Gender should be Male or Female',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email is not valid',
      'string.empty': 'Email is required',
      'any.required': 'Email is required',
    }),
    dateOfBirth: Joi.string(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    contactNumber: Joi.string(),
    emergencyContact: Joi.string(),
    guardian: guardianValidationSchema.required().messages({
      'object.base': 'Guardian object is required',
      'any.required': 'Guardian is required',
    }),
    localGuardian: localGuardianValidationSchema.required().messages({
      'object.base': 'Local Guardian object is required',
      'any.required': 'Local Guardian is required',
    }),
    permanentAddress: Joi.string().required().messages({
      'string.empty': 'Permanent address is required',
      'any.required': 'Permanent address is required',
    }),
    presentAddress: Joi.string().required().messages({
      'string.empty': 'Present address is required',
      'any.required': 'Present address is required',
    }),
    profileImage: Joi.string(),
    isActive: Joi.string().valid('Active', 'Inactive').required().messages({
      'any.only': 'isActive should be either Active or Inactive',
      'any.required': 'isActive is required',
    }),
  });

  export default studentValidationSchema