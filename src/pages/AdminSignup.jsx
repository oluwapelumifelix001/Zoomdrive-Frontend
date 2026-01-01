import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Footer from "../Components/Footer";
import { IoCheckmarkCircle, IoEyeOutline, IoEyeOffOutline, IoLogoGoogle, IoLockClosedOutline } from "react-icons/io5";

// ===================================
// TOAST COMPONENT (Consistent)
// ===================================
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
// CAR UPLOADER ADMIN SIGNUP PAGE (Ultra-Compact and Re-worded)
// ===================================
const UltimateAdminSignupPage = () => {
    // Retaining image for distinct look
    const ADMIN_IMAGE_URL = "https://images.unsplash.com/photo-1624006600306-cb489b3dcbfa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHB1cnBsZSUyMGV4b3RpYyUyMGNhcnN8ZW58MHx8MHx8fDA%3D";

    const API_ENDPOINT = 'http://localhost:5000/users/admin/signup';
    const navigate = useNavigate();

    // Renamed adminKey to invitationCode in state for better context
    const [formData, setFormData] = useState({ name: "", email: "", password: "", invitationCode: "" });
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
        if (!formData.name) tempErrors.name = "Full Name is required.";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Valid Email is required.";
        if (!formData.password || formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters.";
        // if (!formData.invitationCode || formData.invitationCode.length < 4) tempErrors.invitationCode = "A valid Invitation Code is required.";
        // setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) { return; }
        setIsLoading(true);
        setApiError(null);

        try {
            await axios.post(API_ENDPOINT, formData);
            setFormData({ name: "", email: "", password: "", invitationCode: "" });
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate('/admin/login');
            }, 2000);
        } catch (error) {
            setApiError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = () => {
        setApiError("Social sign-up is disabled for administrative accounts.");
    };


    return (
        // Global Container: Dark background
        <>
            <div className="h-screen flex bg-gray-900 overflow-hidden">

                {/* 1. VISUAL SECTION (Left) - Indigo/Purple Theme and new wording */}
                <div className="hidden lg:flex w-7/12 relative flex-1 h-full bg-black">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-3000 ease-in-out hover:scale-[1.05] filter brightness-75"
                        style={{
                            backgroundImage: `url(${ADMIN_IMAGE_URL})`,
                            backgroundPosition: '50% 50%',
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-indigo-900/10"></div>

                    <div className="relative z-10 p-16 flex flex-col justify-end text-white">
                        <p className="text-xl font-light uppercase tracking-[0.4em] mb-3 text-indigo-300 animate-fade-in-down delay-200">
                            Car Listing Portal
                        </p>
                        <h2 className="text-7xl font-extrabold mb-4 leading-tight tracking-tighter drop-shadow-lg animate-fade-in-down">
                            Manage Your <span className="text-indigo-400">Inventory</span>
                        </h2>
                        <p className="text-2xl font-light mt-4 max-w-lg opacity-90 animate-fade-in-down delay-300">
                            Upload and update your available fleet with ease.
                        </p>
                    </div>
                </div>


                
                <div className="w-full lg:w-5/12 flex items-center justify-center relative bg-gray-50/90 backdrop-blur-sm py-8 px-6 sm:px-12 xl:px-16 flex-1 h-full overflow-hidden ">

                    {/* Reduced inner padding (p-6 instead of p-7) */}
                    <div className="w-full max-w-lg bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-100 box-border animate-slide-up-form">

                        {/* Header reduced margins and smaller text */}
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-0.5 tracking-tight">
                            Admin <span className="text-indigo-600">Registration</span>
                        </h1>
                        <p className="text-gray-500 mb-4 text-sm">
                            Sign up to manage car uploads. Invitation required.
                        </p>

                        {/* API Error Box */}
                        {apiError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl mb-4 text-sm font-medium transition-opacity duration-500">
                                **Error:** {apiError}
                            </div>
                        )}

                        {/* --- SOCIAL SIGNUP (Disabled/Hidden) --- */}
                        <button
                            onClick={handleGoogleSignUp}
                            className="w-full flex items-center justify-center bg-gray-100 text-gray-500 font-semibold py-2.5 px-4 rounded-xl border border-gray-300 cursor-not-allowed shadow-sm mb-4" // Reduced mb
                            disabled
                        >
                            <IoLockClosedOutline className="w-5 h-5 mr-3 text-gray-400" />
                            Social Sign-up Disabled
                        </button>

                        {/* Divider */}
                        <div className="relative flex items-center mb-4">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase font-semibold">
                                Details
                            </span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>


                        {/* Form reduced space-y (space-y-3) */}
                        <form onSubmit={handleSubmit} className="space-y-3">

                            {/* Invitation Code Field - Renamed and tight padding */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-800 mb-0.5">Invitation Code</label>
                                <input
                                    type="text"
                                    name="invitationCode"
                                    value={formData.invitationCode}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-xl bg-gray-50/70 focus:ring-indigo-500 focus:border-indigo-500 transition box-border duration-200 ${errors.invitationCode ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`}
                                    placeholder="Unique access key"
                                />
                                {errors.invitationCode && <p className="text-red-500 text-xs mt-1">{errors.invitationCode}</p>}
                            </div>

                            {/* Full Name Field - Tight padding */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-800 mb-0.5">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-xl bg-gray-50/70 focus:ring-indigo-500 focus:border-indigo-500 transition box-border duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`}
                                    placeholder="Admin Name"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>


                            {/* Email Address Field - Tight padding */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-800 mb-0.5">Email</label>
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


                            {/* Password Field - Tight padding */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-800 mb-0.5">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-xl bg-gray-50/70 focus:ring-indigo-500 focus:border-indigo-500 transition box-border duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`}
                                        placeholder="Secure password (min 6 chars)"
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
                            </div>


                            {/* SUBMIT BUTTON */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center bg-indigo-600 text-white font-extrabold py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-xl shadow-indigo-500/30 disabled:bg-indigo-400 mt-4 box-border transform hover:scale-[1.01] active:scale-[0.99]" // Reduced mt
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    "Register Admin Account"
                                )}
                            </button>
                        </form>


                        {/* Footer Link (Login link) */}
                        <p className="text-center text-gray-500 mt-4 text-sm">
                            Already registered? <Link to="/admin/login" className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors">Admin Sign In</Link>
                        </p>

                    </div>
                </div>

                {/* Toast remains here */}
                <Toast
                    message={`Welcome Admin! Account created successfully.`}
                    isVisible={showToast}
                    onClose={() => setShowToast(false)}
                />

            </div>


            <div className="lg:hidden w-full ">
                <Footer />
            </div>
        </>

    );
};

export default UltimateAdminSignupPage;