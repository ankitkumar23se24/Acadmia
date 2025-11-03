import { Phone, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
    return (
        <section>
            <div className="flex flex-col items-center bg-white px-4 py-16">
                <h1 className="text-3xl font-bold mb-10 text-gray-900">
                    Contact Information
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {/* Phone Support */}
                    <div className="flex flex-col items-start p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-blue-100 p-3 rounded-full mb-4">
                            <Phone className="text-blue-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">Phone Support</h2>
                        <p className="text-sm text-gray-600 mb-2">Mon-Sat, 9am to 6pm</p>
                        <a href="tel:+919918631729" className="text-blue-600 font-medium">
                            +91 9918631729
                        </a>
                    </div>

                    {/* Email Support */}
                    <div className="flex flex-col items-start p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-green-100 p-3 rounded-full mb-4">
                            <Mail className="text-green-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">Email Support</h2>
                        <p className="text-sm text-gray-600 mb-2">24/7 email support</p>
                        <a href="mailto:rktechnical.azm@gmail.com" className="text-black font-medium">
                            rktechnical.azm@gmail.com
                        </a>
                    </div>
                </div>
            </div>
            <div>
                <ContactForm />
            </div>
        </section>
    )
}

export default Contact

export const metadata = {
    title: "RK Technical | Contact us",
    description: "Raunak Technical Institute",
};