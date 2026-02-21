import express from "express"
import {createServer} from "http"
import {config} from "dotenv"
import cookieParser from "cookie-parser"
import connectToDB from "./db/db.js"
import indexRouter from "./routes/index.routes.js"
import { socketConnection } from "./socket/socket.js"
import {Server} from "socket.io"
import cors from "cors"

const app=express()
const server= createServer(app)
config()
await connectToDB()

const io= new Server(httpServer,{
    pingTimeout: 60000,
    cors:{
        origin:process.env.CORS_ORIGIN || "*" ,
        credentials: true
    }
})


app.use("io", io)
socketConnection(io)

app.use(cors({
    origin: '*',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", indexRouter)

const PORT= process.env.PORT || 3000
server.listen(PORT,()=>{
    console.log("Server Started, PORT:", PORT)
})