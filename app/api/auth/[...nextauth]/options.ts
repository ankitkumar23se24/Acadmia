import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/connectDB";
import { User } from "@/models/userModel";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email Id", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectDB();
                const email = credentials?.email?.toString();
                const password = credentials?.password?.toString();
                if (!email || !password) {
                    throw new Error("Email and password are required");
                }
                try {
                    const user = await User.findOne({ email }).select("+password");
                    ;
                    if (!user) {
                        throw new Error("No user found with this email or username");
                    }
                    if (await bcrypt.compare(password, user.password)) {
                        return user;
                    } else {
                        throw new Error("Incorrect password");
                    }
                } catch (err: unknown) {
                    throw new Error((err as Error).message);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.username = user.username;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id?.toString();
                session.user.username = (token as { username: string }).username;
                session.user.isAdmin = (token as { isAdmin: boolean }).isAdmin;
            }
            return session;
        }
    },
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};