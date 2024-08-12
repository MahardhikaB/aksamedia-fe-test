import { useEffect, useState } from 'react';

const Footer = () => {
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            setIsToggled(true);
            document.documentElement.classList.add('dark');
        }
    }
    , []);

    const handleToggle = () => {
        setIsToggled(!isToggled);
        if (!isToggled) {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        } else {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <footer className="flex dark:bg-white dark:text-[#1c1c22] bg-[#1c1c22] text-white py-4 px-6 justify-between items-center">
            <p className="text-sm">
                Made with ❤️ by <span className="font-semibold">Yorkha</span>
            </p>
            <div 
                className={`relative w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${isToggled ? 'bg-slate-950' : 'bg-gray-300'}`}
                onClick={handleToggle}
            >
                <div
                    className={`w-5 h-5 bg-[#3287db] rounded-full shadow-md transform ${isToggled ? 'translate-x-5' : 'translate-x-0'}`}
                />
            </div>
        </footer>
    );
};

export default Footer;
