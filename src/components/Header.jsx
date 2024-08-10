'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from 'react-icons/ai';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="py-8 text-black bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6 md:px-[72px]">
                <div className="flex flex-row items-center">
                    {/* Logo */}
                    <img src="/Aksamedia.png" className="w-11 mr-3" alt="Logo" />
                    <Link href="/">
                        <h1 className="text-xl font-semibold my-2 text-black hidden md:block lg:block">
                            Aksa Media<span>.</span>
                        </h1>
                    </Link>
                </div>
                
                {/* Mobile Menu Icon */}
                <CiMenuFries
                    className="text-[32px] block md:hidden lg:hidden cursor-pointer"
                    onClick={toggleMenu}
                />
            </div>

            {/* Sidebar Menu */}
            <div className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-gray-900 text-white transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
                <div className="flex justify-between items-center p-6">
                    {/* Sidebar Logo */}
                    <h1 className="text-3xl font-semibold">YrkH<span className="text-blue-500">.</span></h1>
                    
                    {/* Close Icon */}
                    <AiOutlineClose
                        className="text-[24px] cursor-pointer"
                        onClick={toggleMenu}
                    />
                </div>
                
                {/* Menu Links */}
                <nav className="flex flex-col mt-8 space-y-6 pl-6">
                    <Link href="/" className="text-lg font-semibold hover:text-blue-500">
                        Home
                    </Link>
                    <Link href="/resume" className="text-lg font-semibold hover:text-blue-500">
                        Resume
                    </Link>
                    <Link href="/work" className="text-lg font-semibold hover:text-blue-500">
                        Work
                    </Link>
                    <Link href="/contact" className="text-lg font-semibold hover:text-blue-500">
                        Contact
                    </Link>
                </nav>
            </div>

            {/* Background Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={toggleMenu}
                />
            )}
        </header>
    );
}

export default Header;
