import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link
import { Car, Upload, CalendarCheck, DollarSign, Users, BarChart3, Shield, Zap, ArrowRight } from 'lucide-react';
import Footer from './Footer';
import PremiumNavbar from './PremiumNavbar';

const AdminLandingPage = () => {
    return (
        <>
            <PremiumNavbar />
            <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 flex items-center justify-center p-6 md:p-12 overflow-hidden relative">
                {/* Background Layers */}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 via-transparent to-purple-600/30" />

                {/* Enhanced Subtle Car Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
                    style={{
                        backgroundImage: `url('https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1464649221486182')`,
                    }}
                />

                <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-12 md:gap-16 items-center pt-12">
                    {/* Left Side - Hero Welcome */}
                    <div className="text-white space-y-8">


                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Admin Portal
                        </h2>

                        <p className="text-lg md:text-xl text-indigo-200 max-w-2xl">
                            Empower your car rental business with a sophisticated admin dashboard.
                            Seamlessly manage your luxury fleet, bookings, and finances — all in one powerful platform.
                        </p>

                        <div className="flex items-center gap-4 text-indigo-200">
                            <div className="w-16 h-1 bg-indigo-500 rounded-full" />
                            <span className="font-bold uppercase tracking-widest text-base">Complete Fleet Control</span>
                        </div>
                    </div>

                    {/* Right Side - Feature Sections */}
                    <div className="space-y-8">
                        {/* Upload & Manage Cars */}
                        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-7 shadow-2xl">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="p-3.5 bg-indigo-600/50 rounded-2xl">
                                    <Upload className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white">Upload & Manage Cars</h3>
                            </div>
                            <p className="text-base md:text-lg text-indigo-200 leading-relaxed">
                                Easily add new vehicles to your premium fleet. Upload high-quality images, set daily rates,
                                specify categories (Luxury, SUV, Electric, Sport), transmission, fuel type, seating capacity,
                                and features. Edit or remove listings anytime with real-time inventory updates.
                            </p>
                            <div className="mt-5 flex gap-4">
                                <div className="flex items-center gap-2 text-indigo-300">
                                    <Zap className="w-5 h-5" />
                                    <span className="text-sm">Instant Updates</span>
                                </div>
                                <div className="flex items-center gap-2 text-indigo-300">
                                    <Shield className="w-5 h-5" />
                                    <span className="text-sm">Secure Storage</span>
                                </div>
                            </div>
                        </div>

                        {/* Booking Handling */}
                        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-7 shadow-2xl">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="p-3.5 bg-indigo-600/50 rounded-2xl">
                                    <CalendarCheck className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white">Booking Management</h3>
                            </div>
                            <p className="text-base md:text-lg text-indigo-200 leading-relaxed">
                                View, approve, or cancel bookings in real-time. Track pickup/drop-off dates, customer details,
                                vehicle assignment, and status (pending, confirmed, completed). Get analytics on peak seasons,
                                popular cars, and occupancy rates to optimize your fleet.
                            </p>
                            <div className="mt-5 flex gap-4">
                                <div className="flex items-center gap-2 text-indigo-300">
                                    <Users className="w-5 h-5" />
                                    <span className="text-sm">Customer Insights</span>
                                </div>
                                <div className="flex items-center gap-2 text-indigo-300">
                                    <BarChart3 className="w-5 h-5" />
                                    <span className="text-sm">Performance Analytics</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Handling */}
                        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-7 shadow-2xl">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="p-3.5 bg-indigo-600/50 rounded-2xl">
                                    <DollarSign className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white">Payment Processing</h3>
                            </div>
                            <p className="text-base md:text-lg text-indigo-200 leading-relaxed">
                                Securely handle transactions, refunds, and deposits. Monitor revenue streams, generate invoices,
                                track paid/pending payments, and export reports. Integrated with reliable gateways for smooth,
                                fraud-protected operations.
                            </p>
                            <div className="mt-5 flex gap-4">
                                <div className="flex items-center gap-2 text-indigo-300">
                                    <Shield className="w-5 h-5" />
                                    <span className="text-sm">Fraud Protection</span>
                                </div>
                                <div className="flex items-center gap-2 text-indigo-300">
                                    <BarChart3 className="w-5 h-5" />
                                    <span className="text-sm">Revenue Reports</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <Link to="/admin/login" className="flex-1">
                                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl">
                                    Admin Login <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <Link to="/admin/signup" className="flex-1">
                                <button className="w-full bg-white/10 backdrop-blur-md border border-white/30 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl">
                                    Create Admin Account <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AdminLandingPage;