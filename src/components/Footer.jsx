import { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';

const Footer = () => {
    const [theme, setTheme] = useState('system'); // Default to system theme
    const [isSystem, setIsSystem] = useState(true);

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme') || 'system';
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (currentTheme === 'dark') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else if (currentTheme === 'light') {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        } else {
            setIsSystem(true);
            if (prefersDarkScheme) {
                setTheme('dark');
                document.documentElement.classList.add('dark');
            } else {
                setTheme('light');
                document.documentElement.classList.remove('dark');
            }
        }
    }, []);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        setIsSystem(newTheme === 'system');
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (newTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDarkScheme) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    };

    return (
        <footer className="flex dark:bg-white dark:text-[#1c1c22] bg-[#1c1c22] text-white py-4 px-6 justify-between items-center">
            <p className="text-sm">
                Made with ❤️ by <span className="font-semibold">Yorkha</span>
            </p>
            <div className="flex space-x-4">
                <button
                    onClick={() => handleThemeChange('light')}
                    className={`px-4 py-2 rounded-md ${theme === 'light' ? 'bg-slate-700 text-white' : 'bg-gray-300 text-[#1c1c22]'}`}
                >
                    <FaSun />
                </button>
                <button
                    onClick={() => handleThemeChange('dark')}
                    className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-300 text-[#1c1c22]'}`}
                >
                    <FaMoon />
                </button>
                <button
                    onClick={() => handleThemeChange('system')}
                    className={`px-4 py-2 rounded-md ${isSystem ? 'bg-slate-700 text-white' : 'bg-gray-300 text-[#1c1c22]'}`}
                >
                    <FaDesktop />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
