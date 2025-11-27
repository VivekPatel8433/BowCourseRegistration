import express from 'express'
import {getAllPrograms} from '../controllers/AdminController.js';
const router=express.Router()

router.get('/',getAllPrograms);

export default router;