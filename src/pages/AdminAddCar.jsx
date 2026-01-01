import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    IoMenu,
    IoClose,
    IoCarOutline,
    IoAddCircleOutline,
    IoPersonCircleOutline,
    IoLogOutOutline,
} from "react-icons/io5";
import Footer from "../Components/Footer";

const AddCar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "Sports",
        pricePerDay: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Car successfully added to the Elite Fleet! 🚗✨");
        // Later: Connect to backend API
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

            {/* PURPLE SIDEBAR - Perfect match with Dashboard */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-purple-950 to-purple-900 transform transition-transform duration-500 lg:translate-x-0 lg:static flex flex-col shadow-2xl border-r border-purple-800 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Profile */}
                <div className="p-8 border-b border-purple-800">
                    <div className="flex items-center gap-5">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl flex items-center justify-center text-4xl font-black shadow-2xl ring-4 ring-purple-400/30">
                            AD
                        </div>
                        <div>
                            <h3 className="text-xl font-extrabold">Admin User</h3>
                            <p className="text-purple-200 text-sm mt-1">admin@eliterent.com</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-green-500 text-xs font-bold rounded-full">
                                Super Admin
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-6 space-y-4">
                    <Link
                        to="/admin/profile"
                        className="flex items-center gap-5 px-5 py-4 rounded-2xl hover:bg-purple-800/50 transition"
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
                        className="flex items-center gap-5 px-5 py-4 bg-purple-600 rounded-2xl font-bold shadow-xl ring-2 ring-purple-400/50"
                    >
                        <IoAddCircleOutline className="w-7 h-7" />
                        <span className="text-lg">Add New Car</span>
                    </Link>
                </nav>

                {/* Logout */}
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
                {/* Header */}
                <header className="bg-gray-800/50 backdrop-blur-md shadow-lg px-6 py-5 flex items-center justify-between sticky top-0 z-10 border-b border-purple-800/30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-purple-300"
                    >
                        <IoMenu className="w-9 h-9" />
                    </button>
                    <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                        Add New Car
                    </h1>
                    <div></div>
                </header>

                {/* Form */}
                <main className="flex-1 p-6 lg:p-12 overflow-auto">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-700/30 overflow-hidden">
                            {/* Hero Section */}
                            <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 p-10 lg:p-16 text-center">
                                <h2 className="text-4xl lg:text-6xl font-extrabold mb-4">
                                    Expand the Elite Luxury Fleet
                                </h2>
                                <p className="text-purple-200 text-xl max-w-3xl mx-auto">
                                    List your premium vehicle and make it available to elite clients worldwide.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 lg:p-16 space-y-10">
                                {/* Title */}
                                <div>
                                    <label className="block text-2xl font-bold text-purple-300 mb-4">
                                        Car Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. Lamborghini Aventador SVJ"
                                        className="w-full px-8 py-5 text-xl bg-gray-700/50 border border-purple-600/50 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition"
                                    />
                                </div>

                                {/* Category & Price */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div>
                                        <label className="block text-2xl font-bold text-purple-300 mb-4">
                                            Category
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-8 py-5 text-xl bg-gray-700/50 border border-purple-600/50 rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition"
                                        >
                                            <option>Sports</option>
                                            <option>Supercar</option>
                                            <option>Luxury</option>
                                            <option>SUV</option>
                                            <option>Electric</option>
                                            <option>Classic</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-2xl font-bold text-purple-300 mb-4">
                                            Price Per Day ($)
                                        </label>
                                        <input
                                            type="number"
                                            name="pricePerDay"
                                            value={formData.pricePerDay}
                                            onChange={handleChange}
                                            required
                                            min="100"
                                            placeholder="2500"
                                            className="w-full px-8 py-5 text-xl bg-gray-700/50 border border-purple-600/50 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-2xl font-bold text-purple-300 mb-4">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="8"
                                        placeholder="Year, mileage, features, interior, performance specs..."
                                        className="w-full px-8 py-6 text-lg bg-gray-700/50 border border-purple-600/50 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50 resize-none transition"
                                    ></textarea>
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-2xl font-bold text-purple-300 mb-4">
                                        Upload Images (Multiple)
                                    </label>
                                    <div className="border-3 border-dashed border-purple-500/50 rounded-3xl p-12 text-center hover:border-purple-400 transition">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="w-full text-lg file:mr-6 file:py-5 file:px-10 file:rounded-2xl file:border-0 file:bg-gradient-to-r file:from-purple-600 file:to-purple-700 file:text-white file:font-bold file:text-lg hover:file:from-purple-700 hover:file:to-purple-800 cursor-pointer"
                                        />
                                        <p className="mt-4 text-purple-300">High-quality images only • Max 10 photos</p>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-8 pt-10">
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-16 py-6 rounded-2xl font-black text-2xl shadow-2xl hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-300"
                                    >
                                        Add to Elite Fleet
                                    </button>
                                    <Link
                                        to="/admin/dashboard"
                                        className="bg-gray-700/50 text-white px-16 py-6 rounded-2xl font-bold text-2xl hover:bg-gray-600/50 transition text-center backdrop-blur-sm border border-purple-600/30"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
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

export default AddCar;