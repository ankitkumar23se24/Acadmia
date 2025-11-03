"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface CustomFormData {
    get: (field: string) => string;
}

export default function Page() {

    const router = useRouter();

    const [error, setError] = useState(" ");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loginHandler = async (formData: CustomFormData) => {
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            return setError("Please enter email and password")
        }

        setIsSubmitting(true)
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        if (res?.error) {
            setError(res.error)
            setIsSubmitting(false)
        }

        if (res?.url) {
            router.replace('/')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Login to Your Account
                </h2>
                <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    loginHandler(new FormData(e.currentTarget) as unknown as CustomFormData);
                }}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            // required
                            className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            // required
                            className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isSubmitting ? "Logging in ..." : "Login"}
                    </button>
                    {error && <div className="text-red-600 text-sm text-center font-semibold">{error}</div>}
                </form>
                <p className="text-sm text-center text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>

    )
}