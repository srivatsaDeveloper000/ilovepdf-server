import {response, type Request , type Response} from "express";
import user_login from "../services/authentication/loginService.ts";
import { user_login_types } from '../types/userTypes';

export const loginController = async (req : Request , res : Response) => {
    const payload : user_login_types = req.body;
    try {
        const responseData = user_login(payload);
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