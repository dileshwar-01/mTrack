import express from 'express'
import { addMem } from '../controllers/memController.js';
import authUser from '../middleware/auth.js';

const memRouter = express.Router();

memRouter.post('/add',authUser,addMem);

export default memRouter;