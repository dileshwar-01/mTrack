import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config.js/mongodb.js'
import userRouter from './routes/userRoutes.js'
import memRouter from './routes/memRoutes.js'
import router from './routes/authRoutes.js'


//App config
const app = express()
const port= process.env.PORT || 4000
connectDB()

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user',userRouter);
app.use('/api/mem',memRouter);
app.use('/api/auth',router);

app.get('/',(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log("Server started on PORT: "+port)
})