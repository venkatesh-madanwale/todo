import http from "http"
import { connectDB } from "./db"
import dotenv from "dotenv"

dotenv.config()


const server = http.createServer((req, res) => {

})


connectDB().then(() => server.listen(process.env.PORT, () => { 
    console.log(`server running at the port:: ${process.env.PORT}`) 
}))