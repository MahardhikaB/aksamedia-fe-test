'use client';

import { useState, useEffect } from "react";

export default function DeleteModal({ isOpen, onClose, onDelete, karyawanData }) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowModal(true);
        } else {
            setTimeout(() => setShowModal(false), 300);
        }
    }, [isOpen]);

    if (!isOpen && !showModal) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
            }`}
        >
            <div
                className={`bg-white dark:bg-[#1c1c22] font-semibold p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 ${
                    isOpen ? "translate-y-0" : "-translate-y-20"
                }`}
            >
                <h2 className="text-xl mb-4 text-[#1c1c22] dark:text-white">Delete Data</h2>
                <p className="text-[#1c1c22] dark:text-white">Are you sure you want to delete {karyawanData?.namaDepan} {karyawanData?.namaBelakang}?</p>
                <div className="flex justify-end mt-4">
                <button 
                        onClick={onClose}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            onDelete(karyawanData?.id);
                            onClose();
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
