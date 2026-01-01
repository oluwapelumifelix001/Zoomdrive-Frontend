import React, { useState } from "react";
import { Link } from "react-router-dom";
import newlogo from "../assets/newlogo.jpg";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" >
                    <img
                        src={newlogo}
                        alt="CarRent Logo"
                        className="w-39 h-16 rounded-md  hover:scale-105 transition-transform duration-300"
                    />

                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-Big text-gray-700">
                    <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                    <Link to="/cars" className="hover:text-blue-600 transition">Cars</Link>
                    <Link to="/Signup" className="hover:text-blue-600 transition">SignUp</Link>
                    <Link to="/Login" className="hover:text-blue-600 transition">Login</Link>
                    <Link
                        to="/admin"
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow"
                    >
                        Admin
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="focus:outline-none text-gray-700"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <Link
                        to="/"
                        className="block px-6 py-3 border-b hover:bg-gray-100 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/cars"
                        className="block px-6 py-3 border-b hover:bg-gray-100 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Cars
                    </Link>
                    <Link
                        to="/login"
                        className="block px-6 py-3 border-b hover:bg-gray-100 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Login
                    </Link>
                    <Link
                        to="/admin"
                        className="block px-6 py-3 hover:bg-blue-600 hover:text-white transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Admin
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
