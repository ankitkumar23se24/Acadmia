import React from 'react'
import Link from 'next/link';

import { FaPhoneAlt } from "react-icons/fa";

const CallButton = () => {
    return (
        <Link href="tel:+919918631729" className="inline-flex items-center gap-3 text-xl px-4 py-2 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <FaPhoneAlt /> Call Us for Admission
        </Link>
    )
}

export default CallButton