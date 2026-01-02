import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { IoCheckmarkCircle, IoEyeOutline, IoEyeOffOutline, IoLogoGoogle } from "react-icons/io5";
import PremiumNavbar from "../Components/PremiumNavbar";
import Footer from "../Components/Footer";


// ===================================
// TOAST COMPONENT (Consistent with Signup)
// ===================================
const Toast = ({ message, isVisible, onClose }) => {
    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-2xl transition-transform duration-500 ease-in-out flex items-center space-x-3 z-50";
    const visibilityClass = isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0";

    return (
        <>
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
        </>
    );
};



const UltimateLoginPage = () => {
    // Original Constants
    const CAR_IMAGE_URL = "https://images.unsplash.com/photo-1617718983914-e901af86531c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJsdWUlMjBjYXJ8ZW58MHwwfDB8fHww";
    const API_ENDPOINT = 'https://zoomdrive-backend.onrender.com/users/login';
    const navigate = useNavigate();

    // Original State
    const [formData, setFormData] = useState({ email: "", password: "" });
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
            const response = await axios.post(API_ENDPOINT, {
                email: formData.email,
                password: formData.password,
            });

            const { token } = response.data;
            if (token) {
                localStorage.setItem('authToken', token);
               
            }
           

            setShowToast(true);
            // Note: Keeping the 3-second delay for navigation as per your original logic
            setTimeout(() => {
                setShowToast(false);
                navigate('/dashboard');
            }, 3000);

        } catch (error) {
            console.error( error.response);
            const errorMessage = error.response?.data?.message || "Invalid email or password.";
            setApiError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Hypothetical handler for social login (Consistent with Signup page)
    const handleGoogleLogin = () => {
        setApiError("Google Login functionality not yet implemented.");
    };


    return (
        // Global Container: Dark background and hidden overflow
        <>
            <div className="w-full z-50 bg-gray-900">
                <PremiumNavbar />
            </div>
            <div className="h-screen flex flex-row-reverse mt-16 lg:mt-20 bg-gray-900 overflow-hidden">

                {/* 1. ANIMATED VISUAL SECTION (Right - reversed order) - Enhanced backdrop */}
                <div className="hidden lg:flex w-7/12 relative flex-1 h-full bg-black">

                    {/* Background Image with subtle animation on hover/load */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-3000 ease-in-out hover:scale-[1.05] filter brightness-75"
                        style={{
                            backgroundImage: `url('${CAR_IMAGE_URL}')`,
                            backgroundPosition: '50% 50%',
                        }}
                    ></div>

                    {/* Darker Gradient Overlay and Blue Flare */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-blue-900/10"></div>

                    {/* Text Content - Stylized, Right Aligned */}
                    <div className="relative z-10 p-16 flex flex-col justify-end text-white text-right">
                        <p className="text-xl font-light uppercase tracking-[0.4em] mb-3 text-blue-300 animate-fade-in-down delay-200">
                            The Future of Fleet Management
                        </p>
                        <h2 className="text-7xl font-extrabold mb-4 leading-tight tracking-tighter drop-shadow-lg animate-fade-in-down">
                            Your <span className="text-blue-400">VIP Pass</span> to Luxury Rides
                        </h2>
                        <p className="text-2xl font-light mt-4 max-w-lg ml-auto opacity-90 animate-fade-in-down delay-300">
                            Every feature, every booking, right at your fingertips.
                        </p>
                    </div>
                </div>


                {/* 2. FORM SECTION (Left) - Compact and Modern Style */}
                {/* Increased outer vertical padding (py-10) for margin around the form */}
                <div className="w-full lg:w-5/12 flex items-center justify-center relative bg-gray-50/90 backdrop-blur-sm py-10 px-6 sm:px-12 xl:px-16 flex-1 h-full overflow-hidden">

                    {/* Compact container styling (p-7) */}
                    <div className="w-full max-w-lg bg-white/95 backdrop-blur-xl p-7 rounded-2xl shadow-2xl border border-gray-100 box-border animate-slide-up-form">

                        {/* Header reduced margins and size */}
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">
                            Welcome <span className="text-blue-600">Back</span>
                        </h1>
                        <p className="text-gray-500 mb-5 text-base">
                            Log in to access your premium account.
                        </p>

                        {/* API Error Box (Reduced margin) */}
                        {apiError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm font-medium transition-opacity duration-500">
                                **Error:** {apiError}
                            </div>
                        )}

                        {/* --- SOCIAL LOGIN (New Feature) --- (Reduced margin) */}
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 transition duration-200 shadow-sm mb-5"
                        >
                            <IoLogoGoogle className="w-5 h-5 mr-3 text-red-500" />
                            Continue with Google
                        </button>

                        {/* Divider (Reduced margin) */}
                        <div className="relative flex items-center mb-5">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase font-semibold">
                                Or sign in with email
                            </span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        {/* ---------------------------------- */}


                        {/* Form reduced space-y (space-y-4) */}
                        <form onSubmit={handleSubmit} className="space-y-4">


                            {/* Email Address Field (Aggressively reduced vertical padding: py-2) */}
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


                            {/* Password Field with Toggle (Aggressively reduced vertical padding: py-2) */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-0.5">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-xl bg-gray-50/70 focus:ring-blue-500 focus:border-blue-500 transition box-border duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`}
                                        placeholder="Enter your password"
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

                                {/* Forgot Password Link (Reduced margin) */}
                                <div className="text-right mt-1">
                                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>


                            {/* SUBMIT BUTTON (Reduced vertical padding and margin) */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center bg-blue-600 text-white font-extrabold py-3 px-4 rounded-xl hover:bg-blue-700 transition duration-300 shadow-xl shadow-blue-500/30 disabled:bg-blue-400 mt-5 box-border transform hover:scale-[1.01] active:scale-[0.99]"
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    "Login to Account"
                                )}
                            </button>
                        </form>


                        {/* Footer Link (Reduced top margin) */}
                        <p className="text-center text-gray-500 mt-5 text-sm">
                            Need an account? <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-bold transition-colors">Sign Up Now</Link>
                        </p>
                    </div>
                </div>



                {/* Toast remains here */}
                <Toast
                    message={`Login successful! Redirecting to dashboard...`}
                    isVisible={showToast}
                    onClose={() => setShowToast(false)}
                />

            </div>
            <div className="lg:hidden w-full">
                <Footer />
            </div></>
    );
};

export default UltimateLoginPage;