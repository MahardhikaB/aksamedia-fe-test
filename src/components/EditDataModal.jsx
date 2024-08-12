'use client';

import { useState, useEffect } from "react";

export default function EditDataModal({ isOpen, onClose, onSave, karyawanData }) {
    const [showModal, setShowModal] = useState(false);
    const [namaDepan, setNamaDepan] = useState("");
    const [namaBelakang, setNamaBelakang] = useState("");

    useEffect(() => {
        if (isOpen) {
            setShowModal(true);
        } else {
            setTimeout(() => setShowModal(false), 300);
        }
    }, [isOpen]);

    useEffect(() => {
        if (karyawanData) {
            setNamaDepan(karyawanData.namaDepan);
            setNamaBelakang(karyawanData.namaBelakang);
        }
    }, [karyawanData]);

    const handleSave = () => {
        onSave(karyawanData.id, namaDepan, namaBelakang);
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
                <h2 className="text-xl font-semibold mb-4 text-[#1c1c22] dark:text-white">Edit Karyawan</h2>
                <div className="mb-4 font-semibold">
                    <label className="mb-2 block text-[#1c1c22] dark:text-white">Nama Depan</label>
                    <input 
                        type="text" 
                        value={namaDepan}
                        onChange={(e) => setNamaDepan(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg text-[#1c1c22] ring-1 ring-[#03346E] focus:outline-none focus:ring-2 focus:ring-[#3287db]"
                    />
                </div>
                <div className="mb-4 font-semibold">
                    <label className="block text-[#1c1c22] dark:text-white">Nama Belakang</label>
                    <input 
                        type="text" 
                        value={namaBelakang}
                        onChange={(e) => setNamaBelakang(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg text-[#1c1c22] ring-1 ring-[#03346E] focus:outline-none focus:ring-2 focus:ring-[#3287db]"
                    />
                </div>
                <div className="flex justify-end font-semibold">
                    <button 
                        onClick={onClose}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-700"
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
