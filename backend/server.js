import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config.js/mongodb.js'
import userRouter from './routes/userRoutes.js'
import memRouter from './routes/memRoutes.js'
import router from './routes/authRoutes.js'
import promClient from 'prom-client'

//App config
const app = express()
const port= process.env.PORT || 4000
connectDB()

//middleware
app.use(express.json())
app.use(cors())


// Creating prometheus counters
const httpCounter = new promClient.counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'path', 'status_code'],
})
const requestDurationHistogram = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'path', 'status_code'],
    buckets: [0.1, 0.5, 1, 5, 10], // Buckets for the histogram in seconds
});

// Middleware to track metrics
app.use((req,res,next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000; // Duration in seconds
        httpCounter.labels({ method:req.method, path:req.path, status_code:req.statusCode }).inc()
        requestDurationHistogram.labels({ method:req.method, path:req.path, status_code:req.statusCode }).observe(duration)
    })
})

//api endpoints
app.use('/api/user',userRouter);
app.use('/api/mem',memRouter);
app.use('/api/auth',router);

app.get('/',(req,res)=>{
    res.send("API working")
})


// Creating endpoint to crash site // Simulate a crash by throwing an error
app.get('/crash', (req, res) => {
    console.log('Intentionally crashing the server...');
    process.exit(1);
});


// Exposing metrics to /metrics
app.get('/metrics', async (req,res) => {
  res.setHeader('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
})


app.listen(port,()=>{
    console.log("Server started on PORT: "+port)
})
