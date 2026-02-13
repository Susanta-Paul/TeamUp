import express from "express"
import {createServer} from "http"
import {config} from "dotenv"
import cookieParser from "cookie-parser"
import connectToDB from "./db/db.js"
import indexRouter from "./routes/index.routes.js"

const app=express()
const server= createServer(app)
config()
await connectToDB()


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", indexRouter)

const PORT= process.env.PORT || 3000
server.listen(PORT,()=>{
    console.log("Server Started, PORT:", PORT)
})