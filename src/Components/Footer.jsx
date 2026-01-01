import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/cgk.jpg";

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-indigo-950 via-purple-950 to-cyan-950 text-gray-300 overflow-hidden">
            {/* Subtle Animated Background Layers */}
            <div className="absolute inset-0 opacity-30">
                <img 
                    src="https://png.pngtree.com/background/20250103/original/pngtree-abstract-background-with-blue-and-purple-waves-picture-image_15431312.jpg" 
                    alt="Abstract waves"
                    className="w-full h-full object-cover"
                />
            </div>
            
            <div className="absolute inset-0 opacity-10">
                <img 
                    src="https://media.istockphoto.com/id/1127130255/vector/black-car-silhouette.jpg?s=612x612&w=0&k=20&c=ngTvenhkdMx1bToQMYUr1Ejdyt_5vMbg3VcI0ggI30Q=" 
                    alt="Luxury car silhouette"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="relative bg-black/30 backdrop-blur-md py-16">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

                    {/* Logo + Description */}
                    <div className="space-y-6">
                        <img 
                            src={logo} 
                            alt="ZoomDrive Logo" 
                            className="w-44 rounded-xl shadow-2xl ring-4 ring-white/10"
                        />
                        <p className="text-gray-400 leading-relaxed text-base">
                            The easiest way to rent reliable and affordable vehicles anytime, anywhere.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="hover:text-cyan-400 transition duration-300">Home</Link></li>
                            <li><Link to="/fleet" className="hover:text-cyan-400 transition duration-300">Fleet</Link></li>
                            <li><Link to="/login" className="hover:text-cyan-400 transition duration-300">Login</Link></li>
                            <li><Link to="/admin/home" className="hover:text-cyan-400 transition duration-300">Admin</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
                        <div className="space-y-3 text-gray-400">
                            <p>support@zoomdrive.com</p>
                            <p>+234 7019577768</p>
                            <p>Ogbomoso, Nigeria</p>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Follow Us</h3>
                        <div className="flex gap-4">
                            {/* Facebook */}
                            <a 
                                href="#" 
                                className="p-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-blue-600/70 hover:scale-110 transition-all duration-300 shadow-lg"
                            >
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1 .9 0 1.8.1 2 .1v2.3h-1.1c-1.1 0-1.4.7-1.4 1.3V12h2.5l-.4 3h-2.1v7A10 10 0 0 0 22 12z" />
                                </svg>
                            </a>

                            {/* Twitter/X */}
                            <a 
                                href="#" 
                                className="p-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-cyan-500/70 hover:scale-110 transition-all duration-300 shadow-lg"
                            >
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 5.8c-.8.4-1.6.6-2.5.8a4.3 4.3 0 0 0 1.9-2.4 9 9 0 0 1-2.8 1A4.4 4.4 0 0 0 12 8a12.4 12.4 0 0 1-9-4.5 4.4 4.4 0 0 0 1.4 5.9c-.7 0-1.4-.2-2-.5 0 2.1 1.5 3.8 3.4 4.3a4.4 4.4 0 0 1-2 .1 4.4 4.4 0 0 0 4.1 3 9 9 0 0 1-5.6 2c-.4 0-.8 0-1.2-.1A12.8 12.8 0 0 0 8.3 21c8.3 0 12.8-7 12.8-13v-.6A9 9 0 0 0 22 5.8z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a 
                                href="#" 
                                className="p-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-110 transition-all duration-300 shadow-lg"
                            >
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5zm0 9A3.5 3.5 0 1 1 15.5 13 3.5 3.5 0 0 1 12 16.5zm4.8-10.8a1.2 1.2 0 1 0 1.2 1.2c0-.7-.5-1.2-1.2-1.2z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8">
                    <p className="text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} ZoomDrive. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;