// This file contains the database connnections for the todos

import { MongoClient } from "mongodb";
import dotenv from "dotenv"


//configuring the env
dotenv.config()

const client = new MongoClient(process.env.MONGO_URI!)//creating the client
// The MongoClient is used to connect to the MongoDB server
let db:any;// The db variable is used to store the database connection
// The db variable is used to store the database connection

export async function connectDB() {// This function is used to connect to the MongoDB database
    // The connectDB function is used to connect to the MongoDB database
    await client.connect()// The connect method is used to connect to the MongoDB server
    db = client.db('todos')//connects to the default DB in MongoDB
    console.log("MongoDB connected!")// The MongoDB server is connected
}

export function getDB(){// This function is used to get the database connection
    return db
}