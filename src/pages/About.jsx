import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ShieldCheck, Zap, Clock, Users, Award, MapPin,
    ArrowRight, Star, Download, Smartphone, Layout, Zap as Bolt
} from 'lucide-react';
import PremiumNavbar from '../Components/PremiumNavbar';
import Footer from '../Components/Footer';
import { usePWA } from '../Components/PWAHandler.jsx';

const AboutUsPage = () => {
    /* --- INSTALLATION LOGIC --- */

    const { isVisible, installApp } = usePWA();
    const stats = [
        { label: 'Happy Clients', value: '10K+', icon: Users },
        { label: 'Luxury Fleet', value: '500+', icon: Zap },
        { label: 'Cities Covered', value: '25+', icon: MapPin },
        { label: 'Awards Won', value: '12', icon: Award },
    ];

    const values = [
        {
            title: "Lightning-Fast Booking",
            desc: "From selection to keys in hand — under 60 seconds. Fully digital, zero paperwork.",
            icon: Zap,
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            title: "Uncompromising Safety",
            desc: "Every vehicle passes our 150-point inspection. Full insurance + real-time tracking included.",
            icon: ShieldCheck,
            gradient: "from-emerald-500 to-teal-600"
        },
        {
            title: "24/7 White-Glove Support",
            desc: "Your personal concierge is always one tap away — day or night, rain or shine.",
            icon: Clock,
            gradient: "from-purple-500 to-indigo-600"
        }
    ];

    return (
        <>
            <PremiumNavbar />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-28 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
                    <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

                    <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 bg-blue-600/10 px-4 py-2 rounded-full border border-blue-200">
                                <Star className="w-4 h-4 text-blue-600 fill-current" />
                                <span className="text-blue-600 font-bold text-xs uppercase tracking-wider">Since 2024 • Trusted Worldwide</span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-black leading-tight">
                                We Don't Just Rent Cars.<br />
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    We Deliver Dreams.
                                </span>
                            </h1>

                            <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-2xl">
                                Born from a passion for driving and a frustration with outdated rental experiences,
                                Zoomdrive was created to bring the thrill of luxury motoring to everyone.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-base shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                    Explore Our Story
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>

                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl" />
                            <img
                                src="https://images.unsplash.com/photo-1701985739263-7c2f6015f270?q=80&w=872&auto=format&fit=crop"
                                alt="Luxury car fleet"
                                className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px] border-8 border-white/50"
                            />
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, i) => (
                                <div key={i} className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
                                    <div className={`inline-flex p-5 rounded-3xl mb-5 bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-500 to-indigo-600' : 'from-purple-500 to-pink-600'} shadow-lg`}>
                                        <stat.icon className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-4xl font-black text-gray-900 mb-2">{stat.value}</h3>
                                    <p className="text-gray-600 font-bold uppercase tracking-wider text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent" />
                    <div className="max-w-7xl mx-auto px-6 relative">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-black mb-4">The Zoomdrive Promise</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">Three pillars that define every journey with us</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {values.map((value, i) => (
                                <div key={i} className="group relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 hover:-translate-y-3">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                                    <div className="p-10 lg:p-12 text-center">
                                        <div className={`inline-flex p-6 rounded-3xl mb-6 bg-gradient-to-br ${value.gradient} shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                                            <value.icon className="w-12 h-12 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black mb-4">{value.title}</h3>
                                        <p className="text-base text-gray-600 leading-relaxed">{value.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- FULL WIDTH APP INSTALL SECTION --- */}
                <section className="w-full bg-gray-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />

                    <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative">
                        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 backdrop-blur-md">
                                <Smartphone className="w-4 h-4 text-blue-400" />
                                <span className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em]">Premium Mobile Experience</span>
                            </div>

                            <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">ZoomDrive in Your Pocket.</h2>

                            <p className="text-gray-400 text-lg lg:text-xl font-medium leading-relaxed">
                                Install our official web app for the fastest booking experience yet.
                                Enjoy real-time fleet updates, instant car tracking, and
                                <span className="text-blue-400"> exclusive member-only pricing</span> directly from your home screen.
                            </p>

                            <div className="flex flex-wrap justify-center gap-6 lg:gap-12 py-4">
                                {[
                                    { icon: Layout, text: "Native Interface" },
                                    { icon: Bolt, text: "Ultra-Fast Load" },
                                    { icon: ShieldCheck, text: "Secure Access" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-gray-200 font-bold">
                                        <div className="bg-blue-600/20 p-2 rounded-lg">
                                            <item.icon className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <span className="text-sm tracking-wide">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 w-full flex flex-col items-center gap-4">
                                <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto text-center">
                                    <h3 className="text-2xl font-bold text-white mb-6">Get the Full ZoomDrive Experience</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                        {/* Step 1 */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mb-3">1</div>
                                            <p className="text-gray-300">Tap the <strong>three dots (⋮)</strong> or <strong>Share</strong> icon in your browser.</p>
                                        </div>

                                        {/* Step 2 */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mb-3">2</div>
                                            <p className="text-gray-300">Select <strong>"Install App"</strong> or <strong>"Add to Home Screen"</strong>.</p>
                                        </div>

                                        {/* Step 3 */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mb-3">3</div>
                                            <p className="text-gray-300">Open <strong>ZoomDrive</strong> from your home screen like a native app.</p>
                                        </div>
                                    </div>
                                </div>
                                {!isVisible ? (
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest animate-pulse">App already installed or using an unsupported browser</p>
                                ) : (
                                    <p className="text-blue-400/60 text-xs font-bold uppercase tracking-widest">Available on iOS, Android, and Desktop</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative max-w-4xl mx-auto text-center px-6">
                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">Ready to Drive the Future?</h2>
                        <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">Join thousands who’ve already discovered the Zoomdrive difference.</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/signup" className="bg-white text-blue-600 px-12 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-110 transition-all duration-300 transform">Start Your Journey</Link>
                            <Link to="/fleet" className="bg-white/20 backdrop-blur-md border-2 border-white/50 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300">View Full Fleet</Link>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default AboutUsPage;