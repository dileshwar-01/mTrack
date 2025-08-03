import express from 'express'
import { addMem, getMems, removeMem } from '../controllers/memController.js';
import authUser from '../middleware/auth.js';

const memRouter = express.Router();

memRouter.post('/add',authUser,addMem);
memRouter.post('/get',authUser,getMems);
memRouter.post('/remove',authUser,removeMem);

export default memRouter;