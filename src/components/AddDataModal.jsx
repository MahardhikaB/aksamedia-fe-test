import React, { useState, useEffect } from "react";

export default function AddDataModal({ isOpen, onClose, onAddData }) {
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

    const resetForm = () => {
        setNamaDepan("");
        setNamaBelakang("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (namaDepan && namaBelakang) {
            onAddData(namaDepan, namaBelakang);
            resetForm();
            onClose();
        }
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
                <h2 className="text-2xl font-semibold mb-4 text-[#1c1c22] dark:text-white">Tambah Data</h2>
                <form onSubmit={handleSubmit}>
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
                        <label className="mb-2 block text-[#1c1c22] dark:text-white">Nama Belakang</label>
                        <input
                            type="text"
                            value={namaBelakang}
                            onChange={(e) => setNamaBelakang(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg text-[#1c1c22] ring-1 ring-[#03346E] focus:outline-none focus:ring-2 focus:ring-[#3287db]"
                        />
                    </div>
                    <div className="flex justify-end font-semibold">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-700"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#3287db] text-white px-4 py-2 rounded-lg hover:bg-[#03346E]"
                        >
                            Tambah
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
