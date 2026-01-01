import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    IoMenu,
    IoClose,
    IoCarOutline,
    IoAddCircleOutline,
    IoPersonCircleOutline,
    IoLogOutOutline,
    IoCameraOutline,
    IoCheckmarkOutline,   // Fixed: was IoCheck
    IoCreateOutline,      // Fixed: was IoPencilOutline
} from "react-icons/io5";
import Footer from "../Components/Footer";

const AdminProfile = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const [adminData, setAdminData] = useState({
        name: "Admin User",
        email: "admin@eliterent.com",
        role: "Super Admin",
        profilePic: "https://via.placeholder.com/200?text=AD",
    });

    const [editForm, setEditForm] = useState({
        name: adminData.name,
        email: adminData.email,
    });

    const [previewPic, setPreviewPic] = useState(adminData.profilePic);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewPic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setAdminData({
            ...adminData,
            name: editForm.name,
            email: editForm.email,
            profilePic: previewPic,
        });
        setIsEditing(false);
        alert("Profile updated successfully! 🎉");
    };

    const handleLogout = () => {
        if (window.confirm("Logout from Admin Portal?")) {
            navigate("/admin/login");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col lg:flex-row text-white overflow-hidden">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/70 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* PURPLE SIDEBAR */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-purple-950 to-purple-900 transform transition-transform duration-500 lg:translate-x-0 lg:static flex flex-col shadow-2xl border-r border-purple-800 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-8 border-b border-purple-800">
                    <div className="flex items-center gap-5">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl flex items-center justify-center text-4xl font-black shadow-2xl ring-4 ring-purple-400/30">
                            AD
                        </div>
                        <div>
                            <h3 className="text-xl font-extrabold">{adminData.name}</h3>
                            <p className="text-purple-200 text-sm mt-1">{adminData.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-green-500 text-xs font-bold rounded-full">
                                {adminData.role}
                            </span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-4">
                    <Link
                        to="/admin/profile"
                        className="flex items-center gap-5 px-5 py-4 bg-purple-600 rounded-2xl font-bold shadow-xl ring-2 ring-purple-400/50"
                    >
                        <IoPersonCircleOutline className="w-7 h-7" />
                        <span className="text-lg">Profile</span>
                    </Link>

                    <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-5 px-5 py-4 rounded-2xl hover:bg-purple-800/50 transition"
                    >
                        <IoCarOutline className="w-7 h-7" />
                        <span className="text-lg">Manage Cars</span>
                    </Link>

                    <Link
                        to="/admin/add-car"
                        className="flex items-center gap-5 px-5 py-4 rounded-2xl hover:bg-purple-800/50 transition"
                    >
                        <IoAddCircleOutline className="w-7 h-7" />
                        <span className="text-lg">Add New Car</span>
                    </Link>
                </nav>

                <div className="p-6 border-t border-purple-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-5 px-5 py-4 bg-red-600/80 rounded-2xl font-bold hover:bg-red-700 transition shadow-xl"
                    >
                        <IoLogOutOutline className="w-7 h-7" /> Logout
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col">
                <header className="bg-gray-800/50 backdrop-blur-md shadow-lg px-6 py-5 flex items-center justify-between sticky top-0 z-10 border-b border-purple-800/30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-purple-300"
                    >
                        <IoMenu className="w-9 h-9" />
                    </button>
                    <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                        Admin Profile
                    </h1>
                    <div></div>
                </header>

                <main className="flex-1 p-6 lg:p-12 overflow-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-700/30 p-8 lg:p-16">
                            {/* Profile Picture */}
                            <div className="text-center mb-12">
                                <div className="relative inline-block">
                                    <img
                                        src={previewPic}
                                        alt="Profile"
                                        className="w-48 h-48 object-cover rounded-full shadow-2xl border-8 border-purple-700/50"
                                    />
                                    {isEditing && (
                                        <label className="absolute bottom-4 right-4 bg-purple-600 p-4 rounded-full cursor-pointer shadow-xl hover:bg-purple-700 transition">
                                            <IoCameraOutline className="w-8 h-8" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                                <h2 className="text-4xl font-extrabold mt-8">{adminData.name}</h2>
                                <p className="text-purple-300 text-xl mt-2">{adminData.email}</p>
                                <span className="inline-block mt-4 px-6 py-2 bg-green-600/70 rounded-full text-lg font-bold">
                                    {adminData.role}
                                </span>
                            </div>

                            {/* Edit Buttons */}
                            <div className="text-right mb-8">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="inline-flex items-center gap-3 bg-purple-600 px-8 py-4 rounded-2xl font-bold hover:bg-purple-700 transition shadow-xl"
                                    >
                                        <IoCreateOutline className="w-6 h-6" />  {/* Fixed icon */}
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="inline-flex gap-4">
                                        <button
                                            onClick={handleSave}
                                            className="inline-flex items-center gap-3 bg-green-600 px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition shadow-xl"
                                        >
                                            <IoCheckmarkOutline className="w-6 h-6" />  {/* Fixed icon */}
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setEditForm({ name: adminData.name, email: adminData.email });
                                                setPreviewPic(adminData.profilePic);
                                            }}
                                            className="px-8 py-4 rounded-2xl font-bold bg-gray-700/70 hover:bg-gray-600/70 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="space-y-10">
                                <div>
                                    <label className="block text-xl font-bold text-purple-300 mb-4">Full Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            className="w-full px-8 py-5 text-xl bg-gray-700/50 border border-purple-600/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition"
                                        />
                                    ) : (
                                        <p className="text-2xl text-white">{adminData.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xl font-bold text-purple-300 mb-4">Email Address</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className="w-full px-8 py-5 text-xl bg-gray-700/50 border border-purple-600/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition"
                                        />
                                    ) : (
                                        <p className="text-2xl text-white">{adminData.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xl font-bold text-purple-300 mb-4">Role</label>
                                    <p className="text-2xl text-green-400 font-bold">{adminData.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div className="lg:hidden w-full">
                <Footer />
            </div>
        </div>

    );
};

export default AdminProfile;