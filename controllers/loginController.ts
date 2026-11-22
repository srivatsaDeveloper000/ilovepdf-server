import type {Request ,  Response} from "express";
import { user_login_types } from '../types/userTypes';
import { user_login_service } from "../services/authentication";

export const loginController = async (req : Request , res : Response) => {
    const payload : user_login_types = req.body;
    try {
        const responseData = await user_login_service(payload);
        return res.status(200).json(responseData)
    }catch(error : any){
        return {
            type :"error",
            status : 500 ,
            message : error.message ,
            componentData : null
        }
    }
}

export default loginController