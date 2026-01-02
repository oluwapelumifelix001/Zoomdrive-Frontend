import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";


import PremiumNavbar from "../Components/PremiumNavbar.jsx";
import { IoSpeedometerOutline, IoCarSportOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

import Testimonials from "../Components/Testimonial.jsx";


const Home = () => {
    const { scrollY } = useScroll();
    const parallax = useTransform(scrollY, [0, 400], [0, 80]);
    const textParent = {
        hidden: { opacity: 0, x: -70 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2,
            }
        }
    };

    const textChild = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (

        <div className="w-full">
            <PremiumNavbar />
            {/* HERO SECTION */}
            <section
                className="h-[85vh] text-white flex items-center overflow-hidden
  bg-gradient-to-r from-blue-900 via-gray-800 to-black
  bg-[length:300%_300%] animate-[gradientMove_12s_ease_infinite]">
                <motion.div
                    style={{ y: parallax }}
                    className="w-full"
                    transition={{ type: "spring", stiffness: 30, damping: 20 }}
                >
                    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

                        {/* Text Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                                Find & Rent
                                <span className="text-blue-500"> Your Perfect Car</span>
                            </h1>

                            <p className="text-gray-300 mb-8 text-lg">
                                Choose from reliable, luxury, and affordable vehicles.
                                Book seamlessly with flexible pickup & return times.
                            </p>

                            <div className="flex gap-4">
                                <Link
                                    to="/fleet"
                                    className="px-6 py-3 bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition"
                                >
                                    Browse Cars
                                </Link>

                                <Link
                                    to="/about"
                                    className="px-6 py-3 border rounded-lg border-gray-500 hover:bg-gray-700 transition">
                                    Learn More
                                </Link>
                            </div>
                        </motion.div>

                        {/* Image Section */}
                        <motion.div
                            className="hidden md:block"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 0.6 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80"
                                alt="car"
                                className="rounded-xl shadow-lg"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </section>



            {/* HOW IT WORKS */}
            <section className="py-20 bg-gray-100">
                <motion.div
                    className="max-w-6xl mx-auto px-6 text-center"
                    initial={{ opacity: 0, y: 70 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}

                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[1, 2, 3].map((step) => (
                            <motion.div
                                key={step}
                                className="bg-white p-6 rounded-xl shadow"
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: step * 0.2 }}
                            >
                                <h3 className="text-xl font-semibold mb-3">
                                    {step}. {
                                        step === 1 ? "Choose a Car" :
                                            step === 2 ? "Select Dates" :
                                                "Book & Drive"
                                    }
                                </h3>
                                <p className="text-gray-600">
                                    {step === 1
                                        ? "Browse through our list of available cars and pick the perfect ride."
                                        : step === 2
                                            ? "Enter your rental period and check availability instantly."
                                            : "Complete payment securely and pick up your car."}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* SLIDER / CAROUSEL */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">

                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-10 text-center"
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}

                    >
                        Featured Cars
                    </motion.h2>

                    {/* Cars Data */}
                    {/*
            You can later fetch this dynamically from backend.
            For now it's static.
        */}
                    {(() => {
                        const cars = [
                            {
                                id: 1,
                                name: "Rolls-Royce Phantom",
                                price: "$1450 / day",
                                img: "https://images.unsplash.com/photo-1695427721471-d2bd4de16bb3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEh5dW5kYWklMjBJb25pcSUyMDZ8ZW58MHwwfDB8fHww"
                            },
                            {
                                id: 2,
                                name: "Bentley Continental GT",
                                price: " $1300 / day",
                                img: "https://images.unsplash.com/photo-1576668273906-4c087ac1dc85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QmVudGxleSUyMENvbnRpbmVudGFsJTIwR1R8ZW58MHx8MHx8fDA%3D"
                            },
                            {
                                id: 3,
                                name: "Mercedes-Maybach S680",
                                price: " $2000 / day",
                                img: "https://images.unsplash.com/photo-1701985739263-7c2f6015f270?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            },
                            {
                                id: 4,
                                name: "BMW X5",
                                price: " $1000 / day",
                                img: "https://images.unsplash.com/photo-1615908397724-6dc711db34a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Qk1XJTIwWDV8ZW58MHx8MHx8fDA%3D"
                            },
                            {
                                id: 5,
                                name: "Ferrari SF90 Stradale",
                                price: "  $1600/ day",
                                img: "https://images.unsplash.com/photo-1609138314972-08a5a13e88cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RmVycmFyaSUyMFNGOTAlMjBTdHJhZGFsZXxlbnwwfHwwfHx8MA%3D%3D"
                            },
                        ];

                        return (
                            <motion.div
                                className="overflow-x-auto flex gap-6 scrollbar-hide pb-2"
                                transition={{ duration: 1 }}
                                initial={{ opacity: 0, y: 70 }}
                                whileInView={{ opacity: 1, y: 0 }}

                            >
                                {cars.map((car) => (
                                    <div
                                        key={car.id}
                                        className="min-w-[280px] bg-gray-100 rounded-xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer"
                                    >
                                        <img
                                            src={car.img}
                                            className="h-48 w-full object-cover"
                                        />

                                        <div className="p-5">
                                            <h3 className="text-xl font-bold">{car.name}</h3>
                                            <p className="text-gray-600">{car.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        );
                    })()}

                </div>
            </section>

            {/* Why Choose Us */}
            <motion.section
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <section className="py-28 bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">

                        {/* Header */}
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
                        >
                            The Road Less Traveled,<br />
                            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">Perfectly Planned.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray-600 mb-20 max-w-4xl mx-auto"
                        >
                            We fuse cutting-edge technology with elite service to deliver an unmatched luxury rental experience.
                        </motion.p>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-12">

                            {/* Feature 1: Pristine Fleet */}
                            <motion.div
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-6 border border-white/50 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Visual Illustration */}
                                <div className="p-6">
                                    <img
                                        src="https://mphclub.com/wp-content/uploads/2024/01/exploring-miami-finest-luxury-car-rentals-blog-post-thumbnail.webp"
                                        alt="Premium luxury fleet lineup"
                                        className="w-full h-48 object-cover rounded-2xl mb-6 shadow-lg"
                                    />
                                </div>

                                <div className="relative p-8 pt-0">
                                    <div className="inline-flex p-5 mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl">
                                        <IoCarSportOutline className="w-10 h-10" />
                                    </div>

                                    <h3 className="text-3xl font-black mb-4 text-gray-800">
                                        Pristine, Diverse Fleet
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        Hand-picked, new-model vehicles, from economic efficiency to luxury performance. Quality guaranteed.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Feature 2: Seamless Booking */}
                            <motion.div
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-6 border border-white/50 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Visual Illustration */}
                                <div className="p-6">
                                    <img
                                        src="https://cdn.dribbble.com/userupload/44888602/file/acc01ac708d05a914042463115210a40.png?resize=752x&vertical=center"
                                        alt="Modern car rental booking app interface"
                                        className="w-full h-48 object-cover rounded-2xl mb-6 shadow-lg"
                                    />
                                </div>

                                <div className="relative p-8 pt-0">
                                    <div className="inline-flex p-5 mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl">
                                        <IoSpeedometerOutline className="w-10 h-10" />
                                    </div>

                                    <h3 className="text-3xl font-black mb-4 text-gray-800">
                                        Seamless & Fast Booking
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        Book your perfect car in under 60 seconds with our intuitive online platform and instant confirmation.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Feature 3: Trusted Pricing */}
                            <motion.div
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-6 border border-white/50 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Visual Illustration */}
                                <div className="p-6">
                                    <img
                                        src="https://www.stressfreecarrental.com/en/car-hire-images/no-security-deposit_insurance-options.png"
                                        alt="No hidden fees transparent pricing"
                                        className="w-full h-48 object-contain rounded-2xl mb-6 shadow-lg bg-gray-50"
                                    />
                                </div>

                                <div className="relative p-8 pt-0">
                                    <div className="inline-flex p-5 mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl">
                                        <IoShieldCheckmarkOutline className="w-10 h-10" />
                                    </div>

                                    <h3 className="text-3xl font-black mb-4 text-gray-800">
                                        Transparent & Trusted Pricing
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        No hidden fees. What you see is what you pay. Full insurance options for complete peace of mind.
                                    </p>
                                </div>
                            </motion.div>

                        </div>

                    </div>
                </section>
            </motion.section>
            <Testimonials />






            {/* CTA */}
            <motion.section
                className="py-20 bg-blue-600 text-white text-center"
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to Book Your Next Ride?
                </h2>
                <Link
                    to="/fleet"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                    View Available Cars
                </Link>
            </motion.section>

            <Footer />
        </div>
    );
};

export default Home;
