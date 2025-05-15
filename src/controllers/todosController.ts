import { get, IncomingMessage, ServerResponse } from "http" //only for getting the object structure
import { getDB } from "../db"

//Gets all the todo
export async function getAll(req: IncomingMessage, res: ServerResponse) {
    try {
        const todos = await getDB().collection('todos').find().toArray()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ todos }))
    }
    catch (error) {
        res.writeHead(500)
        res.end(JSON.stringify({ message: "error in fetching todos" }))
    }
}


//Gets the specific todo based on id
export async function getOne(req: IncomingMessage, res: ServerResponse, id: string) {
    try {
        const todo = await getDB().collection('todos').findOne({ "_id": new (require('mongodb')).ObjectId(id) })
        if (!todo) {
            res.writeHead(404)
            return res.end(JSON.stringify({ message: "todo not found" }))
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ todo }))
    }
    catch (error) {
        res.writeHead(500)
        res.end(JSON.stringify({ message: "error in fetching todo" }))
    }
}



// Creating the todo
export async function createOne(req: IncomingMessage, res: ServerResponse) {
    let body = ""
    req.on('data', (chunk) => (body += chunk))
    req.on('end', async () => {
        try {
            const data = JSON.parse(body)
            const result = await getDB().collection('todos').insertOne(data)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ result }))
        }
        catch (error) {
            res.writeHead(400)
            res.end(JSON.stringify({ message: "Invalid data" }))
        }
    })
}


//Update todo based on id
export async function updateOne(req: IncomingMessage, res: ServerResponse, id: string) {
    let body = ""
    req.on('data', (chunk) => (body += chunk))
    req.on('end', async () => {
        try {
            const data = JSON.parse(body)
            const result = await getDB().collection('todos').updateOne({ "_id": new (require('mongodb')).ObjectId(id) }, { "$set": { "value": data } })
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ result }))
        }
        catch (error) {
            res.writeHead(400)
            res.end(JSON.stringify({ message: "Invalid data" }))
        }
    })
}


//Remove todo based on id
export async function removeOne(req: IncomingMessage, res: ServerResponse, id: string) {
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


//Remove all
export async function removeAll(req: IncomingMessage, res: ServerResponse) {
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