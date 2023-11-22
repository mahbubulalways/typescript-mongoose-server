import { z } from "zod";


// Zod schema for the UserName sub-schema
const ZodUserNameSchema = z.object({
  firstName: z.string()
    .min(1)
    .max(10)
    .regex(/^[A-Za-z]+$/, { message: 'First name should contain only alphabetic characters' })
    .refine(value => value.charAt(0) === value.charAt(0).toUpperCase(), {
      message: 'First name should start with a capital letter'
    }),
  lastName: z.string()
    .min(1)
    .max(10)
    .regex(/^[A-Za-z]+$/, { message: 'Last name should contain only alphabetic characters' }),
});

// Zod schema for the guardian info sub-schema
const ZodGuardianInfoSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string(),
  motherName: z.string().min(1),
  motherOccupation: z.string(),
  guardianContact: z.string().min(1),
});

// Zod schema for the local guardian info sub-schema
const ZodLocalGuardianSchema = z.object({
  name: z.string(),
  contactNumber: z.string(),
  address: z.string(),
});

// Zod schema for the main student schema
const ZodStudentSchema = z.object({
  student_id: z.string().min(1),
  name: ZodUserNameSchema,
  password:z.string().min(6),
  gender:  z.union([z.literal('Male'), z.literal('Female')]),
  email: z.string().email(),
  dateOfBirth: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  contactNumber: z.string(),
  emergencyContact: z.string(),
  guardian: ZodGuardianInfoSchema,
  localGuardian: ZodLocalGuardianSchema,
  permanentAddress: z.string(),
  presentAddress: z.string(),
  profileImage: z.string().optional(),
  isActive: z.enum(['Active', 'Inactive']),
  isDeleted:z.boolean()
});

export default ZodStudentSchema;