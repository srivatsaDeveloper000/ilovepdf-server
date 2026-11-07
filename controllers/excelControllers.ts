import createExcel from "../services/excel services/createExcel.ts";
import { createExcel_type } from '../types/excel types/types';
import { response, type Request, type Response } from "express"

export const createExcel_controller = async (req: Request, res: Response) => {
    const payload: createExcel_type = req.body;
    try {
        const responseData = await createExcel(payload)
        return res.status(200).json(responseData)
    } catch (error: any) {
        return res.status(500).json({
            type: "error",
            message: error.message,
            componentData: null
        })
    }
}
