import 'dotenv/config'
import express from 'express'
import cors from "cors"
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRouter.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRouter.js'
import orderRouter from './routes/orderRouter.js'

const corsOptions = {
    origin: true, // Dynamically allows the requesting origin (localhost on any port, Render, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
}

//app config
const app = express()
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000

// middleware
app.use(express.json())
app.use(cors(corsOptions))
app.options(/.*/, cors(corsOptions))

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
