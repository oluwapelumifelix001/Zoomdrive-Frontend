import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import newlogo from "../assets/newlogo.jpg";
import { HiMenu, HiX } from "react-icons/hi";

const PremiumNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Effect for the subtle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Base classes: fixed, high Z-index, smooth transition
    const navBaseClasses =
        "w-full fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out mb-5";

    // Dynamic classes: subtle background change and shadow removal/addition
    const navDynamicClasses = scrolled
        ? "bg-white backdrop-blur-sm shadow-md"
        : "bg-transparent md:bg-white/90"; // Minimalist initial state

    // Navigation items
    const navItems = [
        { to: "/", text: "Home" },
        { to: "/Fleet", text: "Fleet" }, // Changed 'Cars' to 'Fleet' for a premium feel
        { to: "/about", text: "About Us" }, // Added an 'About Us' link
    ];

    return (
        <nav className={`${navBaseClasses} ${navDynamicClasses}`}>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Left Section: Logo and Main Links */}
                    <div className="flex items-center space-x-12">
                        {/* Logo/Brand - Cleaner, potentially smaller look */}
                        <Link to="/" onClick={() => setIsOpen(false)}>
                            <img
                                src={newlogo}
                                alt="CarRent Logo"
                                // Slightly smaller logo for modern/minimalist design
                                className="w-auto h-11 rounded-md transition-transform duration-300 hover:opacity-90"
                            />
                        </Link>

                        {/* Desktop Menu Links - Aligned with Logo */}
                        <div className="hidden lg:flex items-center space-x-6 font-medium text-gray-600">
                            {navItems.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="text-sm uppercase tracking-wider hover:text-blue-600 transition-colors duration-200"
                                >
                                    {item.text}
                                </Link>
                            ))}
                        </div>
                    </div>


                    {/* Right Section: Auth Links and Primary CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Auth Links - Subtle, secondary actions */}
                        <Link
                            to="/Login"
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-3"
                        >
                            Log In
                        </Link>
                        <Link
                            to="/Signup"
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-3 border-r border-gray-200 mr-2"
                        >
                            Sign Up
                        </Link>

                        {/* Primary CTA (Admin) - High Contrast & Rounded */}
                        <Link
                            to="/admin/home"  
                            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg transform hover:shadow-xl"
                        >
                            Admin Dashboard
                        </Link>
                    </div>

                    {/* Mobile Hamburger/Close Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Full width, more padding */}
            <div
                className={`md:hidden absolute w-full bg-white shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                {/* Main links */}
                {navItems.map((item) => (
                    <MobileNavLink key={item.to} to={item.to} text={item.text} onClick={() => setIsOpen(false)} />
                ))}
                {/* Auth links */}
                <MobileNavLink to="/Login" text="Log In" onClick={() => setIsOpen(false)} />
                <MobileNavLink to="/Signup" text="Sign Up" onClick={() => setIsOpen(false)} />

                {/* Primary CTA for mobile */}
                <Link
                    to="/admin/home"
                    className="block px-4 py-3 text-center bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-150 ease-in-out"
                    onClick={() => setIsOpen(false)}
                >
                    Admin Dashboard
                </Link>
            </div>
        </nav>
    );
};

// Helper component for Mobile Nav Links
const MobileNavLink = ({ to, text, onClick }) => (
    <Link
        to={to}
        className="block px-4 py-3 text-gray-700 border-b hover:bg-gray-50 transition duration-150 ease-in-out"
        onClick={onClick}
    >
        {text}
    </Link>
);

export default PremiumNavbar;