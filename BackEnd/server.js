import 'dotenv/config'
import express from 'express'
import cors from "cors"
import mongoose from "mongoose"
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRouter.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRouter.js'
import orderRouter from './routes/orderRouter.js'

const allowedOrigins = new Set([
    'https://food-del-ciz1.onrender.com',
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
    ...(process.env.CORS_ORIGINS || '').split(',')
].filter(Boolean).map((origin) => origin.trim().replace(/\/$/, '')))

const corsOptions = {
    origin(origin, callback) {
        // Allow server-to-server requests and the known browser clients.
        if (!origin || allowedOrigins.has(origin) || /^https?:\/\/localhost(?::\d+)?$/.test(origin) || /^https:\/\/[a-z0-9-]+\.onrender\.com$/i.test(origin)) {
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

// CORS runs before parsers and routes so API errors and preflight requests
// from the deployed storefront and admin app receive the right headers.
app.use(cors(corsOptions))
app.options(/.*/, cors(corsOptions))
app.use(express.json())

//Db Connection
void connectDB()

app.get('/health', (_req, res) => {
    const connected = mongoose.connection.readyState === 1
    res.status(connected ? 200 : 503).json({ status: connected ? 'ok' : 'database_unavailable' })
})

app.use('/api', (_req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ success: false, message: 'Database unavailable. Check the backend MONGODB_URI and MongoDB Atlas network access settings.' })
    }
    next()
})

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

app.use((err, _req, res, _next) => {
    console.error('Request error:', err.message)
    const status = err.status || err.statusCode || 500
    res.status(status).json({ success: false, message: status >= 500 ? 'Request failed' : err.message })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
