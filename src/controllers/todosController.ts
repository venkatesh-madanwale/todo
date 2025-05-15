// This file contains the controller functions for handling requests related to todos.
// It includes functions to get all todos, get a specific todo by ID, create a new todo, update an existing todo, delete a todo by ID, and delete all todos.

import { get, IncomingMessage, ServerResponse } from "http" //only for getting the object structure
import { getDB } from "../db"

//the IncomingMessage and ServerResponse are used to get the request and response objects
// The getDB function is imported from the db module to interact to MongoDB database.


// This function is used to get the database connection
//Gets all the todo
//inputs: none
//outputs: all the todos are fetched
export async function getAll(req: IncomingMessage, res: ServerResponse) {
    try {
        const todos = await getDB().collection('todos').find().toArray()//fetching all the todos
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ todos }))
    }
    catch (error) {
        res.writeHead(500)
        res.end(JSON.stringify({ message: "error in fetching todos" }))//error handling
    }
}


//Gets the specific todo based on id
//inputs: id
//outputs: the todo is fetched
export async function getOne(req: IncomingMessage, res: ServerResponse, id: string) {
    try {
        const todo = await getDB().collection('todos').findOne({ "_id": new (require('mongodb')).ObjectId(id) })//fetching the todo based on id
        // The ObjectId is used to convert the string id to ObjectId type
        if (!todo) {
            res.writeHead(404)
            return res.end(JSON.stringify({ message: "todo not found" }))// error handling
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ todo }))//sending the todo as response
    }
    catch (error) {//error handling
        res.writeHead(500)
        res.end(JSON.stringify({ message: "error in fetching todo" }))
    }
}


// this function is used to create the todo
// inputs: the todo object
//outputs: the todo is created
// Creating the todo
export async function createOne(req: IncomingMessage, res: ServerResponse) {
    let body = ""
    req.on('data', (chunk) => (body += chunk))//getting the data from the request
    // The data is in the form of chunks, so we need to concatenate the chunks to get the complete data
    req.on('end', async () => {
        try {
            const data = JSON.parse(body)//parsing the data
            // The data is in the form of JSON, so we need to parse it to get the object
            const result = await getDB().collection('todos').insertOne(data)//inserting the data into the database
            // The insertOne function is used to insert the data into the database
            res.writeHead(200, { 'Content-Type': 'application/json' })//sending the response
            // The Content-Type is set to application/json to indicate that the response is in JSON format
            res.end(JSON.stringify({ result }))
        }
        catch (error) {
            res.writeHead(400)
            res.end(JSON.stringify({ message: "Invalid data" }))//error handling
        }
    })
}

// this function is used to update the todo
// inputs: id
// outputs: the todo is updated
//Update todo based on id
export async function updateOne(req: IncomingMessage, res: ServerResponse, id: string) {
    let body = ""
    req.on('data', (chunk) => (body += chunk))
    req.on('end', async () => {
        try {
            const data = JSON.parse(body)
            const result = await getDB().collection('todos').updateOne({ "_id": new (require('mongodb')).ObjectId(id) }, { "$set": { "value": data } })//updating the todo based on id
            // The updateOne function is used to update the data in the database
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ result }))
        }
        catch (error) {
            res.writeHead(400)
            res.end(JSON.stringify({ message: "Invalid data" }))
        }
    })
}

//this function is used to delete the todo
//Remove todo based on id
//inputs: id
//outputs: the todo is removed
export async function deleteOne(req: IncomingMessage, res: ServerResponse, id: string) {
    try {
        const result = await getDB().collection('todos').deleteOne({ "_id": new (require('mongodb')).ObjectId(id) })
        if (!result) {
            res.writeHead(404)
            return res.end(JSON.stringify({ message: "todo not found" }))
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ result}))
    }
    catch (error) {
        res.writeHead(500)
        res.end(JSON.stringify({ message: "Error deleting todo" }))
    }
}

//this function is used to delete all the todos
//inputs: none
//outputs: all the todos are removed
//Remove all
export async function deleteAll(req: IncomingMessage, res: ServerResponse) {
    try {
        const todos = await getDB().collection('todos').deleteMany({})
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: "data removed!" }))
    }
    catch (error) {
        res.writeHead(500)
        res.end(JSON.stringify({ message: "error in removing data!" }))
    }
}