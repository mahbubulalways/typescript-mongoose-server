import express from 'express'
import { studentController } from './student.controller'

const router = express.Router()

router.route('/create-student')
.post(studentController.createStudentController)
router.route('/get-students')
.get(studentController.getStudentsController)
router.route('/get-student/:id')
.get(studentController.getSingleStudentsController)
router.route('/delete-student/:id')
.patch(studentController.deleteSingleStudentsController)

export const studentRoute = router