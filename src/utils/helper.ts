import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();    

export const deleteSpace = async(spaceId:string):Promise<any> => {
    return await prisma.space.delete({
        where: {
            id: spaceId 
        }
    }).catch((err:any)=>{
        console.error("Error deleting space:", err);    
        return null
    })
}