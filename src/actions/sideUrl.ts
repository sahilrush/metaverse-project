import {Request, Response} from 'express'; 
import { PrismaClient } from '@prisma/client';  

const prisma = new PrismaClient();
export const userMetadata = async(req:Request, res:Response):Promise<any> =>  {
                const {avatarId} = req.body;
        const username = (req as any).user.username;




        if(!avatarId || typeof avatarId !=="string" ){
        return res.status(400).json({error:"invalid avatarId"}) 
        }

        try{

            const user = await prisma.user.update({
                where: {
                    username:username
                },
                data:{avatarId}
            })
            return res.status(200).json({message:"avatarId updated "})
        
        }catch (error) {
            console.error("Error updating avatar:", error);
            return res.status(500).json({ error: "Internal server error" });
        
}}



export const getAllAvatar = async(req:Request, res:Response):Promise<any> => {
    try{
        const avatars = await prisma.avatar.findMany();

        return res.status(200).json({
            avatars: avatars.map(avatar => ({
                id:avatar.id,
                imageUrl: avatar.imageUrl,
                name: avatar.name
            }))
        });

    }catch(error){
        console.error("error fetching avatars:", error);
        return res.status(500).json({error: "Internal server error"});  
    }
}