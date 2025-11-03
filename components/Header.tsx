'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';

import { RxAvatar } from "react-icons/rx";

const Header = () => {

    const { data: session } = useSession();
    const user: User = session?.user as User;

    const currentPath = usePathname();

    const links = [
        { label: "Home", href: '/' },
        { label: "Courses", href: '/courses' },
        { label: "Verification", href: '/verification' },
        { label: "Branches", href: '/branches' },
        { label: "Contact", href: '/contact' }
    ]

    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            <div className="sticky z-50 top-0 h-[72px] bg-white flex items-center justify-center w-full shadow-xl">
                <header className='container max-w-7xl flex justify-between items-center px-2'>
                    <div className='flex items-center gap-12'>
                        <Link href="/">
                            <Image
                                src="/Logo.png"
                                width={56}
                                height={56}
                                alt="logo"
                            />
                        </Link>
                        <nav className='max-md:hidden'>
                            <ul className='flex items-center gap-1'>
                                {links.map(link => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={`${link.href === currentPath ? 'text-slate-950' : 'text-slate-600'} px-3 py-2 text-xl font-serif rounded hover:bg-slate-100  hover:text-indigo-700`}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className='flex gap-3'>
                        {
                            session ? (
                                <div className='flex items-center gap-3'>
                                    <Link href={user.isAdmin ? "/admin" : "#"} className='flex justify-center rounded items-center gap-1 px-2 py-2 border border-gray-400'>
                                        <RxAvatar className='text-2xl' />
                                        <span className='font-semibold'>{user.username}</span>
                                    </Link>
                                    <button className='flex justify-center items-center gap-1 px-2 py-2 text-red-500 font-serif rounded border border-red-500  hover:text-white hover:bg-red-500' onClick={() => signOut()}>Sign out</button>
                                </div>
                            ) : (
                                <Link href="/signin" className='flex justify-center items-center gap-1 px-2 py-2 text-indigo-500 font-serif rounded border border-indigo-500  hover:text-white hover:bg-indigo-500'>
                                    <RxAvatar className='text-3xl' /> Sign in
                                </Link>
                            )
                        }
                        <button className='md:hidden border  rounded-lg px-4 py-2 text-xl' onClick={openModal}>&#9776;</button>
                    </div>
                </header>
            </div>

            {isModalOpen && (
                <div className="fixed z-50 inset-0 bg-white flex justify-center items-center">
                    <div className="flex flex-col text-center gap-5">
                        <Image
                            src="/Logo.png"
                            width={56}
                            height={56}
                            alt="logo"
                            className='absolute top-4 left-4 text-red-700 text-6xl'
                        />
                        <button className="absolute top-2 right-4 text-red-700 text-6xl" onClick={closeModal}>
                            &times;
                        </button>
                        <ul className='flex flex-col text-gray-800 text-3xl gap-8 font-serif'>
                            {links.map(link => (
                                <li key={link.href}><Link href={link.href} onClick={closeModal}>{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* <div>
                <Link href="https://www.youtube.com/@RKTECHNICALKLB" target='_blank'>
                    <Image
                        src="/headerimg.png"
                        width={1600}
                        height={240}
                        alt="logo"
                    />
                </Link>
            </div> */}
        </>
    )
}

export default Header