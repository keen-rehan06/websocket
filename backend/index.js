import express from "express"
import http, { Server } from "http"

const app = express()
const server = http.createServer(app);

const io = new Server(server)

io.on("connection",(socket)=>{
    console.log(`User Connected ${socket.id}`)
})

app.get("/",(req,res)=>{
    res.send("Hello App is Running")
})

server.listen(3000,() => {
    console.log(`App is running on port 3000`)
})