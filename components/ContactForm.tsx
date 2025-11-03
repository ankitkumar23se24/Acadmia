"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { User, Mail, Phone } from "lucide-react";

type FormValues = {
    name: string;
    phone: string;
    email: string;
    message: string;
};

const ContactForm = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await res.json();
            if (result.success) {
                alert('Message sent!');
                reset();
            } else {
                alert('Failed to send message');
                console.error(result.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred');
        }
    }

    return (
        <div className="flex flex-col py-16 items-center bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl hover:shadow-2xl transition-shadow duration-300">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Your Name</label>
                            <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                                <User className="w-4 h-4 text-gray-500 mr-2" />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("name", { required: "Name is required" })}
                                    className="bg-transparent outline-none w-full text-sm"
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                                <Phone className="w-4 h-4 text-gray-500 mr-2" />
                                <input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        minLength: { value: 10, message: "Invalid phone number" }
                                    })}
                                    className="bg-transparent outline-none w-full text-sm"
                                />
                            </div>
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                            <Mail className="w-4 h-4 text-gray-500 mr-2" />
                            <input
                                type="email"
                                placeholder="john.doe@example.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email"
                                    }
                                })}
                                className="bg-transparent outline-none w-full text-sm"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Message</label>
                        <textarea
                            rows={4}
                            placeholder="How can we help you?"
                            {...register("message", { required: "Message is required" })}
                            className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none text-sm"
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition"
                    >
                        {isSubmitting ? 'Sending...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;