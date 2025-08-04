import express from 'express'
import { addMem, getMems, removeMem, updateMem, updateSkips } from '../controllers/memController.js';
import authUser from '../middleware/auth.js';

const memRouter = express.Router();

memRouter.post('/add',authUser,addMem);
memRouter.post('/get',authUser,getMems);
memRouter.post('/remove',authUser,removeMem);
memRouter.post('/skip',authUser,updateSkips);
memRouter.post('/update',authUser,updateMem);

export default memRouter;