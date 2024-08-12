'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { CiMenuFries } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';
import EditProfileModal from '@/components/EditProfileModal'; // Import modal edit profile

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const openEditModal = () => {
        setIsEditModalOpen(true);
        setDropdownOpen(false);
        setMenuOpen(false);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveProfile = (updatedProfile) => {
        setUsername(updatedProfile.username);
        localStorage.setItem('username', updatedProfile.username);
    };

    const handleSignOut = () => {
        localStorage.removeItem('username');
        router.push('/login');
    };

    return (
        <header className="py-6 text-[#1c1c22] bg-white dark:bg-[#1c1c22] dark:text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6 md:px-8 lg:px-8">
                <div className="flex flex-row items-center">

                    {/* Logo */}
                    <img src="/AksamediaNoBg.png" className="w-11 mr-3" alt="Logo" />
                    <Link href="/">
                        <h1 className="text-3xl font-semibold my-2 hidden md:block lg:block">
                            Aksa Media<span className='text-[#3287db]'>.</span>
                        </h1>
                    </Link>
                </div>
                
                {/* Mobile Menu Icon */}
                <CiMenuFries
                    className="text-[32px] block md:hidden lg:hidden cursor-pointer"
                    onClick={toggleMenu}
                />

                {/* User Info (Desktop) */}
                <div className="hidden md:flex lg:flex items-center relative">
                    <button 
                        className="flex items-center focus:outline-none"
                        onClick={toggleDropdown}
                    >
                        <h1 className="font-semibold mr-3">{username}</h1>
                        <img src="/Hotaru.png" alt="User Image" className="w-11 h-11 rounded-full" />
                    </button>

                    {/* Dropdown */}
                    <div 
                        className={`absolute right-0 top-full mt-2 w-36 bg-[#1c1c22] dark:bg-white border rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${
                            dropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                        }`}
                    >
                        <ul className="py-2">
                            <li>
                                <button 
                                    onClick={openEditModal}
                                    className="block w-full text-left px-4 py-2 text-white dark:text-[#1c1c22] dark:hover:bg-gray-100"
                                >
                                    Edit Profile
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={handleSignOut}
                                    className="w-full text-left block px-4 py-2 text-white dark:text-[#1c1c22] dark:hover:bg-gray-100"
                                >
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sidebar Menu */}
            <div className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white text-[#1c1c22] dark:bg-[#1c1c22] dark:text-white transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 rounded-l-lg`}>
                <div className="flex justify-between items-center px-6 py-9">
                    <h1 className="text-3xl font-semibold">Aksamedia<span className="text-[#3287db]">.</span></h1>
                    <AiOutlineClose
                        className="text-[24px] cursor-pointer"
                        onClick={toggleMenu}
                    />
                </div>

                {/* User Info (Mobile) */}
                <div className="flex flex-col items-center mt-8 space-y-6 px-6">
                    <img src="/Hotaru.png" alt="User Image" className="w-24 h-24 rounded-full" />
                    <h2 className="text-xl font-semibold">{username}</h2>

                    <button 
                        onClick={openEditModal}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
                    >
                        Edit Profile
                    </button>
                    <button 
                        onClick={handleSignOut}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg w-full hover:bg-red-700"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Background Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={toggleMenu}
                />
            )}

            {/* Edit Profile Modal */}
            <EditProfileModal 
                isOpen={isEditModalOpen} 
                onClose={closeEditModal} 
                onSave={handleSaveProfile} 
                userProfile={{ username }} 
            />
        </header>
    );
};

export default Header;
