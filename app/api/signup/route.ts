import { NextResponse } from "next/server";
import { User } from "@/models/userModel";
import connectDB from "@/lib/connectDB";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        const { username, email, phone, password } = body;
        if (!username || !email || !phone || !password) {
            return new NextResponse("All fields are mandatory", { status: 400 })
        }
        await connectDB()
        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            return new NextResponse("User already exists", { status: 400 })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            phone,
            password: hashedPassword
        });
        await newUser.save();

        if (newUser) {
            return new NextResponse("User created successfully", { status: 201 })
        }
    } catch (err: unknown) {
        const errorMessage = (err as Error).message;
        // console.log(err)
        return new NextResponse("Error in creating user " + errorMessage, { status: 500 })
    }
}