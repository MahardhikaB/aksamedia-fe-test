import { useState, useEffect } from "react";

export default function EditProfileModal({ isOpen, onClose, onSave, userProfile }) {
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState(userProfile?.username || "");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isOpen) {
            setShowModal(true);
        } else {
            setTimeout(() => setShowModal(false), 300);
        }
    }, [isOpen]);

    useEffect(() => {
        if (userProfile) {
            setUsername(userProfile.username);
        }
    }, [userProfile]);

    const handleSave = () => {
        const updatedProfile = { username };
        if (password) {
            updatedProfile.password = password;
        }
        onSave(updatedProfile);
        onClose();
    };

    if (!isOpen && !showModal) return null;

    return (
        <div 
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
            }`}
        >
            <div
                className={`bg-white dark:bg-[#1c1c22] p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 ${
                    isOpen ? "translate-y-0" : "-translate-y-20"
                }`}
            >
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded-lg text-[#1c1c22] focus:outline-none focus:ring-2 focus:ring-[#3287db]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded-lg text-[#1c1c22] focus:outline-none focus:ring-2 focus:ring-[#3287db]"
                        placeholder="Leave blank to keep current password"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 bg-gray-300 text-[#1c1c22] dark:bg-gray-600 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-[#3287db] text-white px-4 py-2 rounded-lg hover:bg-[#03346E]"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
