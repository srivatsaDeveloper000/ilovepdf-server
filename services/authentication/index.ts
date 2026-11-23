
import { db_connection } from "../../lib/databaseConnection.ts";
import { generate_access_token, generate_refresh_token } from "../../lib/jwt.ts";
import { login_model } from "../../models/user.model.ts";
import { user_login_types } from "../../types/userTypes.ts";

export const user_login_service = async (payload: user_login_types) => {
    try {
        const { email, password } = payload;
        await db_connection()
        const existingUsers = await login_model.findOne({ email })

        if (!existingUsers) {
            return {
                type: "error",
                statusCode: 401,
                message: "No users found...!!!",
                componentData: null
            }
        }
        if (existingUsers.password !== password) {
            return {
                type: "error",
                statusCode: 401,
                message: "Password mismatch...!!!",
                componentData: null
            }
        };

        // for access token
        const accessToken = generate_access_token({
            user_email: existingUsers.email,
            user_role: existingUsers?.user_role
        });

        //  for refresh token
        const refreshToken = generate_refresh_token({
            user_email: existingUsers.email,
            user_role: existingUsers?.user_role
        })

        return {
            refreshToken,
            accessToken,
            response: {
                type: "success",
                StatusCode: 200,
                message: "Login successfull...!!!",
                componentData: {
                    data: existingUsers
                }
            }
        }
    } catch (error: any) {
        return {
            type: "error",
            message: error.message,
            componentData: null
        }
    }
}