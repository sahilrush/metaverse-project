import {Request, Response} from 'express';  
import { v4 as uuidv4 } from 'uuid';
import { deleteSpace } from '../utils/helper';

interface spaceRequest {
    name :string;
    dimension:string;
    mapId:string;
}

interface spaceResponse {
    spaceId:string;
}




export const space = async(req:Request, res:Response):Promise<any> => {
    const {name, dimension, mapId} = req.body as unknown as spaceRequest;   

    try{
        if(!name || !dimension || !mapId){
            return res.status(401).json({error:"Invalid space data"})
        }

        const spaceId = uuidv4();    
    

            const response : spaceResponse = {spaceId}
            return res.status(200).json(response);

    }catch(err){
        console.error("Error creating space:", err);
        return res.status(500).json({error: "Internal server error"});
    }
}


export const spaceDelete = async(req:Request, res:Response):Promise<any> =>{
    const {spaceId} = req.params;    


    try{
        const spaceDel = await deleteSpace(spaceId)

        if(!spaceDel){
            return res.status(404).json({error:"Space not found"})  
        }
        res.status(200).json({message:"Space deleted successfully"})    

        }catch(err){
        console.error("Error deleting space:", err);
        return res.status(500).json({error: "Internal server error"});
        
    }
}