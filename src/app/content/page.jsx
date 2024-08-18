'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddDataModal from "@/components/AddDataModal";
import EditDataModal from "@/components/EditDataModal";
import DeleteModal from "@/components/DeleteModal";
import { usePathname, useSearchParams } from "next/navigation";

export default function Content() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const dataPerPage = 7;
    const [data, setData] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedKaryawan, setSelectedKaryawan] = useState(null);

    useEffect(() => {
        // Set currentPage dan searchKeyword from URL
        const pageParam = parseInt(searchParams.get('page')) || 1;
        const searchParam = searchParams.get('search') || "";
        setCurrentPage(pageParam);
        setSearchKeyword(searchParam);

        // Check user login
        const username = localStorage.getItem('username');
        if (!username) {
            window.location.href = '/login';
        }

        // Get Data localStorage
        const storedData = JSON.parse(localStorage.getItem('karyawanData'));
        if (storedData) {
            setData(storedData);
        } else {
            const initialData = [
                { id: 1, namaDepan: "Ashley", namaBelakang: "Graham" },
                { id: 2, namaDepan: "Kaela", namaBelakang: "Kovalskia" },
                { id: 3, namaDepan: "Emiliano", namaBelakang: "Martinez" },
                { id: 4, namaDepan: "Lionel", namaBelakang: "Messi" },
                { id: 5, namaDepan: "Ramona", namaBelakang: "Flowers" },
                { id: 6, namaDepan: "Hoshimachi", namaBelakang: "Suisei" },
                { id: 7, namaDepan: "Ouro", namaBelakang: "Kronii" },
                { id: 8, namaDepan: "Meg", namaBelakang: "Griffin" },
                { id: 9, namaDepan: "Victoria", namaBelakang: "Newman" },
                { id: 10, namaDepan: "Ellen", namaBelakang: "Joe" },
            ];
            setData(initialData);
            localStorage.setItem('karyawanData', JSON.stringify(initialData));
        }
    }, [pathname, searchParams]);

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;

    const currentData = data
        .filter((karyawan) => 
            karyawan.namaDepan.toLowerCase().includes(searchKeyword.toLowerCase()) || 
            karyawan.namaBelakang.toLowerCase().includes(searchKeyword.toLowerCase())
        )
        .slice(indexOfFirstData, indexOfLastData);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.history.pushState({}, '', `?page=${pageNumber}&search=${searchKeyword}`);
    };

    const handleSearchChange = (e) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);
        window.history.pushState({}, '', `?search=${keyword}&page=1`);
        setCurrentPage(1);
    };

    // Add space in table if data < 7
    const emptyRows = dataPerPage - currentData.length;

    // Add Modal
    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    // Edit Modal
    const openEditModal = (karyawan) => {
        setSelectedKaryawan(karyawan);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => setIsEditModalOpen(false);

    // Delete Modal
    const openDeleteModal = (karyawan) => {
        setSelectedKaryawan(karyawan);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleAddData = (namaDepan, namaBelakang) => {
        const newId = data.length > 0 ? Math.max(...data.map(k => k.id)) + 1 : 1;
        const newData = [...data, { id: newId, namaDepan, namaBelakang }];
        setData(newData);
        localStorage.setItem('karyawanData', JSON.stringify(newData));
    };

    const handleEditData = (id, namaDepan, namaBelakang) => {
        const updatedData = data.map(karyawan =>
            karyawan.id === id ? { ...karyawan, namaDepan, namaBelakang } : karyawan
        );
        setData(updatedData);
        localStorage.setItem('karyawanData', JSON.stringify(updatedData));
    };

    const handleDelete = (id) => {
        const updatedData = data.filter(karyawan => karyawan.id !== id);
        setData(updatedData);
        localStorage.setItem('karyawanData', JSON.stringify(updatedData));
    };

    return (
        <div className="flex flex-col">
            <div>
                <Header />
            </div>
            <div className="bg-slate-200 dark:bg-slate-950 w-full h-[79vh] p-6">
                <div className="bg-white text-[#1c1c22] dark:bg-[#1c1c22] dark:text-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold">Karyawan</h1>
                        <button 
                            onClick={openAddModal}
                            className="bg-[#3287db] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#03346E]"
                        >
                            + Tambah Data
                        </button>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="flex items-center mb-4 justify-start">
                        <label className="text-[#1c1c22] dark:text-white mr-2 font-semibold">Search:</label>
                        <input 
                            type="text" 
                            value={searchKeyword}
                            onChange={handleSearchChange}
                            className="px-4 py-2 w-52 h-8 font-semibold text-[#1c1c22] border ring-1 ring-[#03346E] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3287db]"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white text-[#1c1c22] dark:bg-[#1c1c22] dark:text-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">ID</th>
                                    <th className="px-4 py-2 text-left">NAMA DEPAN</th>
                                    <th className="px-4 py-2 text-left">NAMA BELAKANG</th>
                                    <th className="px-4 py-2 text-left">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((karyawan) => (
                                    <tr key={karyawan.id} className="border-t">
                                        <td className="px-4 py-2">{karyawan.id}</td>
                                        <td className="px-4 py-2">{karyawan.namaDepan}</td>
                                        <td className="px-4 py-2">{karyawan.namaBelakang}</td>
                                        <td className="px-4 py-2 flex items-center ml-2">
                                            <button 
                                                className="text-yellow-500 hover:text-yellow-600 mr-2"
                                                onClick={() => openEditModal(karyawan)}
                                            >
                                                <FaEdit size={20} />
                                            </button>
                                            <button 
                                                className="text-red-500 hover:text-red-600"
                                                onClick={() => openDeleteModal(karyawan)}
                                            >
                                                <FaTrash size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {/* Add space if data < 7*/}
                                {Array.from({ length: emptyRows }).map((_, index) => (
                                    <tr key={index + currentData.length} className="border-t">
                                        <td className="px-4 py-2">&nbsp;</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 mx-1`}
                        >
                            &lt;
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={indexOfLastData >= data.length}
                            className={`px-3 py-1 mx-1`}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Modals */}
            <AddDataModal 
                isOpen={isAddModalOpen} 
                onClose={closeAddModal} 
                onAddData={handleAddData} 
            />
            <EditDataModal 
                isOpen={isEditModalOpen} 
                onClose={closeEditModal} 
                onSave={handleEditData}
                karyawanData={selectedKaryawan} 
            />
            <DeleteModal
                isOpen={isDeleteModalOpen} 
                onClose={closeDeleteModal} 
                onDelete={handleDelete}
                karyawanData={selectedKaryawan} 
            />
            <div>
                <Footer />
            </div>
        </div>
    );
}
