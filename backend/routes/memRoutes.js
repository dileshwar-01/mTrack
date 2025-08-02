import express from 'express'
import { addMem, getMems } from '../controllers/memController.js';
import authUser from '../middleware/auth.js';

const memRouter = express.Router();

memRouter.post('/add',authUser,addMem);
memRouter.post('/get',authUser,getMems);

export default memRouter;