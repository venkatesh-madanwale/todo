import {get, IncomingMessage, ServerResponse} from "http" //only for getting the object structure

export default function todosRouter(req: IncomingMessage, res: ServerResponse){
    const method = req.method
    const url = req.url?.split('/').filter(Boolean) || []


    if(method == 'GET' && url.length==1){
        return 
    }
}