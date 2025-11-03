'use client'
import React from 'react'
import Link from 'next/link';

import { RiFacebookCircleFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
    return (
        <>
            <footer className="flex lg:flex-row flex-col py-10 text-center text-white justify-around" style={{backgroundColor: "rgb(32 35 41"}}>
                <div className="flex flex-col gap-5 my-6 lg:items-start">
                    <h1 className="text-4xl font-bold">RK Technical Institute</h1>
                    <p className="text-2xl">हुनर है तो कदर है</p>
                    <div className='flex gap-3 my-6 justify-center'>
                        <Link href={"https://www.facebook.com/RK-Technical-104709658272861"} target='_blank'><RiFacebookCircleFill className="text-5xl" /></Link>
                        <Link href={"https://www.instagram.com/rk_technical123?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="} target='_blank'><AiFillInstagram className="text-5xl" /></Link>
                        <Link href="#"><AiFillLinkedin className="text-5xl" /></Link>
                    </div>
                    <p className="font-semibold text-lg text-[#ABAFB5]"><span className="text-indigo-300">RK Technical</span> &copy;2024. All Rights Reserved.</p>
                </div>

                <div className="flex flex-col gap-3 text-lg lg:items-start text-[#ABAFB5]">
                    <h2 className="text-2xl font-bold my-6 text-[#ECEDEE]">Features</h2>
                    <Link href="/courses">Courses</Link>
                    <Link href="/verification">Verification</Link>
                    <Link href="/branches">Branches</Link>
                    <Link href="/contact">Raise Query</Link>
                </div>

                <div className="flex flex-col gap-3 text-lg lg:items-start text-[#ABAFB5]">
                    <h2 className="text-2xl font-bold my-6 text-[#ECEDEE]">Reach Out us</h2>
                    <p>Email: <Link href={'mailto:rktechnical.azm@gmail.com'}> rktechnical.azm@gmail.com </Link> </p>
                    <p>Contact No: <Link href="tel:+919918631729"> 9918631729 </Link></p>
                    <p>Contact No: <Link href="tel:+917238079091"> 7238079091 </Link></p>
                </div>
            </footer>
        </>
    )
}

export default Footer