import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { IoCheckmarkCircle, IoEyeOutline, IoEyeOffOutline, IoLogoGoogle } from "react-icons/io5";
import PremiumNavbar from "../Components/PremiumNavbar";
import Footer from "../Components/Footer";

// ===================================
// TOAST COMPONENT (Unchanged)
// ===================================
const Toast = ({ message, isVisible, onClose }) => {
    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-2xl transition-transform duration-500 ease-in-out flex items-center space-x-3 z-50";
    const visibilityClass = isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0";

    return (
        <div className={`${baseClasses} ${visibilityClass} bg-white border-l-4 border-blue-600 text-gray-800`}>
            <IoCheckmarkCircle className="text-blue-600 w-6 h-6 flex-shrink-0" />
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
// MAIN SIGNUP PAGE COMPONENT (Maximum Compact Version)
// ===================================
const UltimateSignupPage = () => {
    // Original Constants
    const CAR_IMAGE_URL = "https://images.unsplash.com/photo-1545061371-98a8355c9c0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXhvdGljJTIwY2Fyc3xlbnwwfHwwfHx8MA%3D%3D";
    const API_ENDPOINT = 'http://localhost:5000/users/signup';
    const navigate = useNavigate();

    // Original State
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    // Original Handlers (Unchanged)
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
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) { return; }

        setIsLoading(true);
        setApiError(null);

        try {
            await axios.post(API_ENDPOINT, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            setFormData({ name: "", email: "", password: "" });
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate('/login');
            }, 2000);

        } catch (error) {
            const errorMessage = error.response?.data?.message || "An unexpected error occurred during registration.";
            setApiError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Hypothetical handler for social login
    const handleGoogleSignUp = () => {
        setApiError("Google Sign-up functionality not yet implemented.");
    };


    return (
        // Global Container: Dark background for depth on large screens
        <>
            <div className="w-full z-50 bg-gray-900">
                <PremiumNavbar />
            </div>

            {/* Added margin-top here to create space between navbar and main content */}
            <div className="h-screen flex bg-gray-900 mt-16 lg:mt-20">
                {/* You can adjust mt-16, mt-20, mt-24, or mt-32 depending on how much space you want */}
                {/* Currently using lg:mt-20 → only on large screens (desktop), no extra margin on mobile */}

                {/* 1. ANIMATED VISUAL SECTION (Left) - Unchanged */}
                <div className="hidden lg:flex w-7/12 relative flex-1 h-full bg-black">

                    <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-3000 ease-in-out hover:scale-[1.05] filter brightness-75"
                        style={{
                            backgroundImage: `url(${CAR_IMAGE_URL})`,
                            backgroundPosition: '50% 50%',
                        }}
                    ></div>

                    <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-blue-900/10"></div>

                    <div className="relative z-10 p-16 flex flex-col justify-end text-white">
                        <p className="text-xl font-light uppercase tracking-[0.4em] mb-3 text-blue-300 animate-fade-in-down delay-200">
                            The Ultimate Driving Experience
                        </p>
                        <h2 className="text-7xl font-extrabold mb-4 leading-tight tracking-tighter drop-shadow-lg animate-fade-in-down">
                            <span className="text-blue-400">Start</span> Your Engine
                        </h2>
                        <p className="text-2xl font-light mt-4 max-w-lg opacity-90 animate-fade-in-down delay-300">
                            Access the world of premium travel and effortless booking.
                        </p>
                    </div>
                </div>


                {/* 2. FORM SECTION (Right) - MAXIMUM COMPRESSION APPLIED HERE */}
                <div className="w-full lg:w-5/12 flex items-center justify-center relative bg-gray-50/90 backdrop-blur-sm py-6 px-6 sm:px-12 xl:px-16 flex-1 h-full overflow-hidden">

                    <div className="w-full max-w-lg bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-gray-100 box-border animate-slide-up-form">

                        <h1 className="text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">
                            Join the Elite <span className="text-blue-600">Ride</span>
                        </h1>
                        <p className="text-gray-500 mb-3 text-base">
                            Create your premium account in seconds.
                        </p>

                        {apiError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-xl mb-3 text-sm font-medium transition-opacity duration-500">
                                **Error:** {apiError}
                            </div>
                        )}

                        <button
                            onClick={handleGoogleSignUp}
                            className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 transition duration-200 shadow-sm mb-3"
                        >
                            <IoLogoGoogle className="w-5 h-5 mr-3 text-red-500" />
                            Continue with Google
                        </button>

                        <div className="relative flex items-center mb-3">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase font-semibold">
                                Or sign up with email
                            </span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-0.5">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-xl bg-gray-50/70 focus:ring-blue-500 focus:border-blue-500 transition box-border duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-0.5">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-xl bg-gray-50/70 focus:ring-blue-500 focus:border-blue-500 transition box-border duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`}
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-0.5">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-xl bg-gray-50/70 focus:ring-blue-500 focus:border-blue-500 transition box-border duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`}
                                            placeholder="Minimum 6 characters"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 focus:outline-none transition-colors"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? (
                                                <IoEyeOffOutline className="w-5 h-5" />
                                            ) : (
                                                <IoEyeOutline className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end text-sm pt-0 mt-0">
                                <Link to="/forgot-password" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center bg-blue-600 text-white font-extrabold py-3 px-4 rounded-xl hover:bg-blue-700 transition duration-300 shadow-xl shadow-blue-500/30 disabled:bg-blue-400 mt-3 box-border transform hover:scale-[1.01] active:scale-[0.99]"
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    "Create Your Account"
                                )}
                            </button>
                        </form>

                        <p className="text-center text-gray-500 mt-3 text-sm">
                            Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-800 font-bold transition-colors">Sign In</Link>
                        </p>

                    </div>
                </div>

                <Toast
                    message={`Welcome ${formData.name || 'User'}! Account created successfully.`}
                    isVisible={showToast}
                    onClose={() => setShowToast(false)}
                />
            </div>

            <div className="lg:hidden w-full">
                <Footer />
            </div>
        </>
    );
};

export default UltimateSignupPage;