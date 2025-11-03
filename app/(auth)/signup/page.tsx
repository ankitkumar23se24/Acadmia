"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form"

interface CustomFormData {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState(" ");

  const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm<CustomFormData>();
  const onSubmit: SubmitHandler<CustomFormData> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("/api/signup", data);
      reset();
      if (res.status === 201) {
        router.push("/signin");
      }
    } catch (error: unknown) {
      setError((error as Error).message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
              className={`w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className={`w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone", { required: true })}
              className={`w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className={`w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", { required: true })}
              className={`w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}>
            {isSubmitting ? "Creating account ..." : "Sign up"}
          </button>
          {error && <div className="text-red-600 text-sm text-center font-semibold">{error}</div>}
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};