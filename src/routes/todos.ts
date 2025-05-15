// This file contains the routes for handling requests related to todos.
// It includes functions to get all todos, get a specific todo by ID, create a new todo, update an existing todo, delete a todo by ID, and delete all todos.


import {get, IncomingMessage, ServerResponse} from "http" //only for getting the object structure
import * as controller from "../controllers/todosController"


export default function todosRouter(req: IncomingMessage, res: ServerResponse){
    // This function is used to handle the requests related to todos
    // The IncomingMessage and ServerResponse are used to get the request and response objects
    const method = req.method
    const url = req.url?.split('/').filter(Boolean) || []

    if(method === 'GET' && url.length===1){
        //this is used to get all the todos
        // The url is split into an array and filtered to remove the empty elements
        return controller.getAll(req,res)
    }
    if(method === 'GET' && url.length===2){
        //this is used to get the specific todo
        // The url is split into an array and filtered to remove the empty elements
        return controller.getOne(req,res,url[1])
    }
    if(method === 'POST' && url.length===1){
        //this is used to create the todo
        // The url is split into an array and filtered to remove the empty elements
        return controller.createOne(req,res)
    }
    if(method === 'PUT' && url.length===2){
        //this is used to update the todo
        // The url is split into an array and filtered to remove the empty elements
        return controller.updateOne(req,res,url[1])
    }
    if(method === 'DELETE' && url.length===2){
        //this is used to delete the todo
        // The url is split into an array and filtered to remove the empty elements
        return controller.deleteOne(req,res,url[1])
    }
    if(method === 'DELETE' && url.length===1){
        //this is used to delete all the todos
        // The url is split into an array and filtered to remove the empty elements
        return controller.deleteAll(req,res)
    }
    res.writeHead(405, {'Content-Type':'application/json'})//405 is used to indicate that the method is not allowed
    res.end(JSON.stringify({message:'Method Not Allowed'}))//sending the response
}