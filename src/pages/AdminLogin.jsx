import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { IoCheckmarkCircle, IoEyeOutline, IoEyeOffOutline, IoLockClosedOutline, IoLogoGoogle } from "react-icons/io5";
import Footer from "../Components/Footer";
const Toast = ({ message, isVisible, onClose }) => {
    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-2xl transition-transform duration-500 ease-in-out flex items-center space-x-3 z-50";
    const visibilityClass = isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0";

    // Indigo theme for Admin
    return (
        <div className={`${baseClasses} ${visibilityClass} bg-white border-l-4 border-indigo-600 text-gray-800`}>
            <IoCheckmarkCircle className="text-indigo-600 w-6 h-6 flex-shrink-0" />
            <p className="font-medium">{message}</p>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 ml-4 focus:outline-none"
                aria-label="Close notification"
            >
                &times;
            </button>
        </div>
    );
};


// ===================================
// ADMIN LOGIN PAGE COMPONENT (Ultra-Compact and Themed)
// ===================================
const UltimateAdminLoginPage = () => {
    // Retaining professional image for admin side
    const ADMIN_IMAGE_URL = "https://images.unsplash.com/photo-1624006600306-cb489b3dcbfa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHB1cnBsZSUyMGV4b3RpYyUyMGNhcnN8ZW58MHx8MHx8fDA%3D";

    // Updated API Endpoint for Admin Login
    const API_ENDPOINT = 'http://localhost:5000/users/admin/login';
    const navigate = useNavigate();

    // Standard Login State
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({});
        setApiError(null);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Valid Email is required.";
        if (!formData.password) tempErrors.password = "Password is required.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) { return; }

        setIsLoading(true);
        setApiError(null);

        try {
            const response = await axios.post(API_ENDPOINT, formData);

            const { token } = response.data;
            if (token) {
                localStorage.setItem('adminAuthToken', token); // Store admin token separately
                console.log("Admin Token saved:", token);
            }

            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate('/admin/dashboard'); // Navigate to admin dashboard
            }, 3000);

        } catch (error) {
           
            const errorMessage = error.response?.data?.message ;
            setApiError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Social Login is restricted for Admin
    const handleGoogleLogin = () => {
        setApiError("Social login is disabled for administrative accounts.");
    };


    return (
        // Global Container: Dark background
        <>
                <div className="h-screen flex flex-row-reverse bg-gray-900 overflow-hidden">

            {/* 1. VISUAL SECTION (Right) - Indigo/Purple Theme and Admin Wording */}
            <div className="hidden lg:flex w-7/12 relative flex-1 h-full bg-black">

                {/* Background Image with subtle animation */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-3000 ease-in-out hover:scale-[1.05] filter brightness-75"
                    style={{
                        backgroundImage: `url(${ADMIN_IMAGE_URL})`,
                        backgroundPosition: '50% 50%',
                    }}
                ></div>

                {/* Darker Gradient Overlay and INDIGO Flare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-indigo-900/10"></div>

                {/* Text Content - Stylized, Right Aligned */}
                <div className="relative z-10 p-16 flex flex-col justify-end text-white text-right">
                    <p className="text-xl font-light uppercase tracking-[0.4em] mb-3 text-indigo-300 animate-fade-in-down delay-200">
                        Car Listing Portal
                    </p>
                    <h2 className="text-7xl font-extrabold mb-4 leading-tight tracking-tighter drop-shadow-lg animate-fade-in-down">
                        Access <span className="text-indigo-400">Content</span> Tools
                    </h2>
                    <p className="text-2xl font-light mt-4 max-w-lg ml-auto opacity-90 animate-fade-in-down delay-300">
                        Log in to manage and upload your available car fleet.
                    </p>
                </div>
            </div>


            {/* 2. FORM SECTION (Left) - Ultra-Compact adjustments */}
            {/* Reduced py-8 for ultra-tight outer margin, keeping it centered */}
            <div className="w-full lg:w-5/12 flex items-center justify-center relative bg-gray-50/90 backdrop-blur-sm py-8 px-6 sm:px-12 xl:px-16 flex-1 h-full overflow-hidden">

                {/* Reduced inner padding (p-6) */}
                <div className="w-full max-w-lg bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-100 box-border animate-slide-up-form">

                    {/* Header reduced margins and size */}
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-0.5 tracking-tight">
                        Admin <span className="text-indigo-600">Login</span>
                    </h1>
                    <p className="text-gray-500 mb-4 text-sm">
                        Enter your credentials to access the management tools.
                    </p>

                    {/* API Error Box */}
                    {apiError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl mb-4 text-sm font-medium transition-opacity duration-500">
                            **Error:** {apiError}
                        </div>
                    )}

                    {/* --- SOCIAL LOGIN (Disabled) --- */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center bg-gray-100 text-gray-500 font-semibold py-2.5 px-4 rounded-xl border border-gray-300 cursor-not-allowed shadow-sm mb-4"
                        disabled
                    >
                        <IoLockClosedOutline className="w-5 h-5 mr-3 text-gray-400" />
                        Social Login Disabled
                    </button>

                    {/* Divider */}
                    <div className="relative flex items-center mb-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase font-semibold">
                            Sign In
                        </span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>


                    {/* Form reduced space-y (space-y-3) */}
                    <form onSubmit={handleSubmit} className="space-y-3">

                        {/* Email Address Field - Tight padding */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-800 mb-0.5">Admin Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-xl bg-gray-50/70 focus:ring-indigo-500 focus:border-indigo-500 transition box-border duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`}
                                placeholder="work@email.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>


                        {/* Password Field with Toggle - Tight padding */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-800 mb-0.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-xl bg-gray-50/70 focus:ring-indigo-500 focus:border-indigo-500 transition box-border duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-indigo-600 focus:outline-none transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <IoEyeOffOutline className="w-4 h-4" />
                                    ) : (
                                        <IoEyeOutline className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

                            {/* Forgot Password Link - Reduced margin */}
                            <div className="text-right mt-1">
                                <Link to="/admin/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>


                        {/* SUBMIT BUTTON - INDIGO CTA */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center bg-indigo-600 text-white font-extrabold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-xl shadow-indigo-500/30 disabled:bg-indigo-400 mt-4 box-border transform hover:scale-[1.01] active:scale-[0.99]"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                "Login to Admin Portal"
                            )}
                        </button>
                    </form>
                    <p className="text-center text-gray-500 mt-4 text-sm">
                        Need access? <Link to="/admin/signup" className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors">Request Registration</Link>
                    </p>

                </div>
            </div>

            
            <Toast
                message={`Login successful! Redirecting to admin dashboard...`}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />

        </div>
           <div className="lg:hidden w-full">
                <Footer />
            </div></>

        
    );
};

export default UltimateAdminLoginPage;