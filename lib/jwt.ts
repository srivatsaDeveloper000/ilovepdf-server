import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

interface token_payload {
    user_email: string;
    user_role: string;
};

if (!ACCESS_SECRET || !REFRESH_SECRET) {
    throw new Error("JWT secrets are missing from environment variables");
}

export const generate_access_token = (user: token_payload) => {
    return jwt.sign(
        {
            user_email: user.user_email,
            user_role: user.user_role
        },
        ACCESS_SECRET,
        {
            expiresIn: "1d",
            algorithm: "HS256"
        }
    )
};

export const generate_refresh_token = (user: token_payload) => {
    return jwt.sign(
        {
            user_email: user.user_email
        },
        REFRESH_SECRET,
        {
            expiresIn: "7d",
            algorithm: "HS256"
        }
    )
};