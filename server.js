import express from 'express'
import "dotenv/config"
import cors from 'cors'
import http from 'http'
import { connectDB } from './lib/db.js'
import userRouter from './routes/userRoute.js'
import testRouter from './routes/testRoute.js'

const app = express()
const server = http.createServer(app)

app.use(express.json({limit: "4mb"}))
app.use(cors())

app.post("/api/auth/testout", (req, res) => {
  res.send('sever is running')
})

app.use("/api/auth", userRouter)
app.use("/api/test", testRouter)

await connectDB()

const PORT = process.env.PORT || 5173
server.listen(PORT, () => {
    console.log('sever is running' + PORT);
})
// app.listen(PORT, () => {
//     console.log('sever is running' + PORT);
// })
