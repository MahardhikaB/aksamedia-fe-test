'use client';

export default function Login() {
    return (
        <div className="flex md:flex-row h-screen bg-slate-400">
        {/* Bagian Gambar */}
        <div className="hidden md:flex bg-slate-400 md:w-1/2 lg:w-1/2 justify-center items-center">
            <img src="/path-to-your-image.jpg" alt="Login Image" className="w-3/4" />
        </div>
        
        {/* Bagian Form Login */}
        <div className="bg-white w-full md:w-1/2 lg:w-1/2 flex justify-center items-center text-black lg:rounded-l-lg">
            <div className="w-full max-w-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form>  
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    </div>
    );
}
