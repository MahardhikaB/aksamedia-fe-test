'use client';

import { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'Yorkha' && password === 'yorkha1234') {
            localStorage.setItem('username', username);
            window.location.href = '/content';
        } else {
            setErrorMessage('Invalid username or password.');
        }
    };

    return (
        <div className="flex md:flex-row h-screen bg-[#1c1c22] dark:bg-white">

            {/* Image Part */}
            <div className="hidden md:flex md:w-1/2 lg:w-1/2 justify-center items-center">
                <img src="/code.png" alt="Login Image" className="w-3/4" />
            </div>

            {/* Form Login */}
            <div className="bg-white dark:bg-[#1c1c22] w-full md:w-1/2 lg:w-1/2 flex justify-center items-center lg:rounded-l-lg">
                <div className="w-full max-w-md p-8">
                    <h1 className="text-4xl font-semibold text-center mb-6 text-[#1c1c22] dark:text-white">
                        Login<span className="text-[#3287db]">.</span>
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 font-semibold">
                            <label className="block mb-2 text-[#1c1c22] dark:text-white">
                                Email
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-3 py-2 border ring-1 ring-[#03346E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3287db] text-[#1c1c22] "
                            />
                        </div>
                        <div className="mb-6 font-semibold">
                            <label className="block mb-2 text-[#1c1c22] dark:text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border ring-1 ring-[#03346E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3287db] text-[#1c1c22]"
                            />
                        </div>
                        {errorMessage && (
                            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                        )}
                        <button
                            type="submit"
                            className="py-2 px-4 w-full font-semibold rounded-lg bg-[#3287db] text-white hover:bg-[#03346E] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
