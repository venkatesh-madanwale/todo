import { MongoClient } from "mongodb";
import dotenv from "dotenv"


//configuring the env
dotenv.config()

const client = new MongoClient(process.env.MONGO_URI!)
let db:any;

export async function connectDB() {
    await client.connect()
    db = client.db()//connects to the default DB in MongoDB
    console.log("MongoDB connected!")
}

export function getDB(){
    return db
}