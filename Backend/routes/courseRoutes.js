import express from 'express'
import {getAllCourses,addCourse,updateCourse,patchCourse,deleteCourse } from '../controllers/AdminController.js';
import {adminAuth,authenticateToken} from '../middleware/auth.js';
const router=express.Router()

router.get('/all',getAllCourses);
router.post('/add',adminAuth,addCourse);
router.put('/:id',adminAuth,updateCourse);
router.patch('/:id',adminAuth,patchCourse);
router.delete('/:id',adminAuth,deleteCourse);

export default router;