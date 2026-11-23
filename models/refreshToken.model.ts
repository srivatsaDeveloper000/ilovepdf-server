import mongoose, { Schema, Document } from "mongoose";

interface refreshTokenTypes extends Document {
    user_email: String;
    tokenHash: String;
    expiresAt: String;
    revokedAt: Date | null;
};

const refreshTokenSchema = new Schema<refreshTokenTypes>({
    user_email: {
        type: String,
        required: true,
        index: true
    },

    tokenHash: {
        type: String,
        required: true,
        unique: true
    },

    expiresAt: {
        type: Date,
        required: true
    },

    revokedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Automatically remove expired documents
refreshTokenSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

export const RefreshTokenModel =
    mongoose.models.RefreshToken ||
    mongoose.model<refreshTokenTypes>("RefreshToken", refreshTokenSchema);