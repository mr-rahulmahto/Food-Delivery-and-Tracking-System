import 'dotenv/config'
import express from 'express'
import cors from "cors"
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRouter.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRouter.js'
import orderRouter from './routes/orderRouter.js'

const allowedOrigins = new Set([
    'https://food-del-ciz1.onrender.com',
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL
].filter(Boolean).map((origin) => origin.replace(/\/$/, '')))

const corsOptions = {
    origin(origin, callback) {
        // Allow server-to-server requests and the known browser clients.
        if (!origin || allowedOrigins.has(origin) || /^https?:\/\/localhost(?::\d+)?$/.test(origin)) {
            return callback(null, true)
        }
        return callback(new Error(`Origin not allowed by CORS: ${origin}`))
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
}

//app config
const app = express()
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000

// CORS must run before parsers and routes so errors and preflight requests
// receive the appropriate headers as well.
app.use(cors(corsOptions))
app.options(/.*/, cors(corsOptions))
app.use(express.json())

//Db Connection
connectDB();

//API EndPoints
app.use('/api/food', foodRouter)
app.use("/image", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

//server start
app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
