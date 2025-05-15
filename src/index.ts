import http from "http"
import { connectDB } from "./db"
import dotenv from "dotenv"
import todosRouter from "./routes/todos"

dotenv.config()


const server = http.createServer((req, res) => {
    if(req.url?.startsWith('/todos')){
        todosRouter(req,res)
    }
    else{
        res.writeHead(404,{'Content-Type':'application-json'})
        res.end(JSON.stringify({message:'Not Found'}))
    }
})


connectDB().then(() => server.listen(process.env.PORT, () => {
    console.log(`server running at the port:: ${process.env.PORT}`)
}))