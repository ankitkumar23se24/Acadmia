import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"]
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email Address alredy taken"]
    },
    phone: {
        type: String,
        required: [true, "Please add the user Phone"],
    },
    password: {
        type: String,
        required: [true, "Please add the user Password"],
        select: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const User = mongoose.models?.User || mongoose.model("User", userSchema);