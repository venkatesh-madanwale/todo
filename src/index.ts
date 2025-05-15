// This file contains the routes for the todos
import http from "http"
import { connectDB } from "./db"
import dotenv from "dotenv"
import todosRouter from "./routes/todos"

// The connectDB function is imported from the db module to connect to MongoDB database.
dotenv.config()


const server = http.createServer((req, res) => {// creating the server
    if(req.url?.startsWith('/todos')){// checking if the url starts with /todos
        todosRouter(req,res)
    }
    else{
        res.writeHead(404,{'Content-Type':'application/json'})// setting the response header
        // 404 is used to indicate that the resource is not found
        res.end(JSON.stringify({message:'Not Found'}))
    }
})


connectDB().then(() => server.listen(process.env.PORT, () => {
    console.log(`server running at the port:: ${process.env.PORT}`)// starting the server
}))