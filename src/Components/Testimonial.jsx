import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    // {
    //     name: "Jane Doe",
    //     role: "CEO, CompanyX",
    //     message: "This product is amazing! It has completely transformed how we work.",
    //     avatar: "https://i.pravatar.cc/100?img=1",
    //     bgImage: "https://www.dreamtoygarage.com/wp-content/uploads/2021/06/Dream-Toy-Garage-Edits_Josh-Vaughn-Photography_June-2021-49-of-122.jpg",
    // },
    // {
    //     name: "John Smith",
    //     role: "Developer, DevCo",
    //     message: "Absolutely love the user experience. Highly recommend it!",
    //     avatar: "https://i.pravatar.cc/100?img=2",
    //     bgImage: "https://thumbs.dreamstime.com/b/business-man-male-guy-happy-caucasian-businessman-driver-client-sit-inside-automobile-buy-modern-electric-car-rent-business-man-350644999.jpg",
    // },
    // {
    //     name: "Alice Johnson",
    //     role: "Designer, Creatives",
    //     message: "The design and functionality are top-notch. Great job!",
    //     avatar: "https://i.pravatar.cc/100?img=3",
    //     bgImage: "https://angieaway.com/wp-content/uploads/2022/02/How-much-is-a-supercar-rental-in-Las-Vegas.jpg",
    // },
    {
        name: "Michael Lee",
        role: "Product Manager, TechSolutions",
        message: "Incredible service and support. This team truly cares about its users.",
        avatar: "https://i.pravatar.cc/100?img=4",
        bgImage: "https://www.dreamtoygarage.com/wp-content/uploads/2023/03/Dream-Toy-Garage-May-2022-4-of-51.jpg",
    },
    {
        name: "Sofia Martinez",
        role: "Entrepreneur, StartUpHub",
        message: "The platform exceeded my expectations. Smooth, fast, and reliable!",
        avatar: "https://i.pravatar.cc/100?img=5",
        bgImage: "https://cdn.biz2credit.com/images/html5/start-a-luxury-car-rental-business.webp",
    },
    {
        name: "David Kim",
        role: "Freelancer, CreativeWorks",
        message: "I can’t imagine working without it now. It saves me so much time every day.",
        avatar: "https://i.pravatar.cc/100?img=6",
        bgImage: "https://thumbs.dreamstime.com/b/caucasian-man-inside-new-car-enjoy-purchase-luxury-auto-rent-modern-vehicle-male-businessman-business-guy-happy-smile-caucasian-350645139.jpg",
    },
];

const Testimonials = () => {
    return (
        <section className="py-28 bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-center mb-20 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent"
                >
                    What Our Customers Say
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-10">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl overflow-hidden transition-all duration-700 hover:-translate-y-8 border border-white/50"
                        >
                            {/* Background Image with Dark Overlay */}
                            <div className="absolute inset-0 -z-10">
                                <img 
                                    src={t.bgImage} 
                                    alt="Customer experience"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative p-10 text-white">
                                {/* Stars */}
                                <div className="flex mb-5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-lg leading-relaxed mb-8">"{t.message}"</p>

                                <div className="flex items-center">
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="w-14 h-14 rounded-full ring-4 ring-white/50 shadow-xl mr-4"
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold">{t.name}</h3>
                                        <p className="text-base text-indigo-200">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;