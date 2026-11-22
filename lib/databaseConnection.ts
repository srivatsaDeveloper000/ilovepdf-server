import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export let isTrue : boolean = false

const connection_url: string = process.env.MONGODB_URL || "";

export const db_connection = async () => {
    try {
        await mongoose.connect(connection_url);
        isTrue = true
        return {
            type: "Success",
            message: "Mongodb database connected successfully...!!!",
            componentData: null
        }
    } catch (error: any) {
        isTrue = false
        return {
            type: "error",
            message: "Database connection failed...!!!",
            componentData: null
        }
    }
}