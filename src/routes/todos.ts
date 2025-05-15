import {get, IncomingMessage, ServerResponse} from "http" //only for getting the object structure
import * as controller from "../controllers/todosController"

export default function todosRouter(req: IncomingMessage, res: ServerResponse){
    const method = req.method
    const url = req.url?.split('/').filter(Boolean) || []

    if(method === 'GET' && url.length===1){
        return controller.getAll(req,res)
    }
    if(method === 'GET' && url.length===2){
        return controller.getOne(req,res,url[1])
    }
    if(method === 'POST' && url.length===1){
        return controller.createOne(req,res)
    }
    if(method === 'PUT' && url.length===2){
        return controller.updateOne(req,res,url[1])
    }
    if(method === 'DELETE' && url.length===2){
        return controller.deleteOne(req,res,url[1])
    }
    if(method === 'DELETE' && url.length===1){
        return controller.deleteAll(req,res)
    }
    res.writeHead(405, {'Content-Type':'application/json'})
    res.end(JSON.stringify({message:'Method Not Allowed'}))
}