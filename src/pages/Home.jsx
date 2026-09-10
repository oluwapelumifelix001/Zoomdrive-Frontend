import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import PremiumNavbar from "../Components/PremiumNavbar.jsx";
import { IoSpeedometerOutline, IoCarSportOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import Testimonials from "../Components/Testimonial.jsx";

const FEATURED_CARS = [
  {
    id: 1,
    name: "Rolls-Royce Phantom",
    price: "$1,450",
    badge: "Ultra Luxury",
    img: "https://images.unsplash.com/photo-1695427721471-d2bd4de16bb3?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Bentley Continental GT",
    price: "$1,300",
    badge: "Grand Tourer",
    img: "https://images.unsplash.com/photo-1576668273906-4c087ac1dc85?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Mercedes-Maybach S680",
    price: "$2,000",
    badge: "VIP Class",
    img: "https://images.unsplash.com/photo-1701985739263-7c2f6015f270?q=80&w=872&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "BMW X5 M",
    price: "$1,000",
    badge: "Performance SUV",
    img: "https://images.unsplash.com/photo-1615908397724-6dc711db34a7?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Ferrari SF90 Stradale",
    price: "$1,600",
    badge: "Supercar",
    img: "https://images.unsplash.com/photo-1609138314972-08a5a13e88cf?w=500&auto=format&fit=crop&q=60"
  },
];

const STEPS = [
  { step: "01", title: "Choose a Vehicle", desc: "Select from our curated list of luxury, sports, and economic models." },
  { step: "02", title: "Select Dates", desc: "Choose your flexible pickup location and rental timeframe." },
  { step: "03", title: "Instant Reservation", desc: "Confirm booking securely online and hit the road with zero friction." },
];

const Home = () => {
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <div className="w-full bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white font-sans antialiased">
      <PremiumNavbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-950 pt-20">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div style={{ y: parallax }} className="w-full relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-12">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Premium Car Rental Experience
              </div> */}

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                Find & Rent <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                  Your Perfect Ride
                </span>
              </h1>

              <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
                Experience freedom with our pristine fleet of high-performance and luxury vehicles. Seamless booking, transparent pricing, and instant delivery.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/fleet"
                  className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5"
                >
                  Browse Fleet
                </Link>
                <Link
                  to="/about"
                  className="px-7 py-3.5 bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-xl font-semibold backdrop-blur-md transition-all hover:-translate-y-0.5"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative hidden md:block"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80"
                  alt="Luxury vehicle showcase"
                  className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-28 bg-slate-900/40 border-y border-slate-800/60 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-slate-400">Rent your ideal vehicle in three effortless steps.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((item, index) => (
              <motion.div
                key={item.step}
                className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-all duration-300 relative group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.7, delay: (index + 1) * 0.2 }}
              >
                <div className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 w-fit px-3 py-1 rounded-md mb-6 border border-blue-500/20">
                  STEP {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CARS */}
      <section className="py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Featured Fleet</h2>
              <p className="text-slate-400">Hand-picked models available for immediate reservation.</p>
            </div>
            <Link to="/fleet" className="text-blue-400 hover:text-blue-300 font-medium text-sm transition">
              View All Vehicles &rarr;
            </Link>
          </motion.div>

          <motion.div
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.9 }}
          >
            {FEATURED_CARS.map((car) => (
              <div
                key={car.id}
                className="min-w-[300px] md:min-w-[340px] bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 snap-start group flex flex-col justify-between"
              >
                <div className="relative overflow-hidden h-52">
                  <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-wider font-bold bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700 text-slate-200">
                    {car.badge}
                  </span>
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-100 mb-2">{car.name}</h3>
                  <div className="flex items-baseline justify-between pt-2 border-t border-slate-800/80">
                    <span className="text-xs text-slate-400">Starting at</span>
                    <div>
                      <span className="text-xl font-extrabold text-blue-400">{car.price}</span>
                      <span className="text-xs text-slate-500"> / day</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-28 bg-slate-900/30 border-t border-slate-800/60">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
              The Road Less Traveled, <br />
              <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                Perfectly Planned.
              </span>
            </h2>
            <p className="text-slate-400 text-lg">
              We fuse cutting-edge vehicle technology with elite service to deliver an unmatched rental experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm hover:border-slate-700 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                <IoCarSportOutline className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">Pristine, Diverse Fleet</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Hand-picked, latest-model vehicles thoroughly inspected for safety, efficiency, and peak performance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm hover:border-slate-700 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6">
                <IoSpeedometerOutline className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">Fast & Digital Booking</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Reserve your vehicle in under 60 seconds with instant confirmations and dynamic pickup schedules.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm hover:border-slate-700 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <IoShieldCheckmarkOutline className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">Transparent Pricing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                No hidden fees or unexpected deposit charges. Full insurance options tailored for total peace of mind.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Testimonials />

      {/* CTA SECTION */}
      <motion.section
        className="py-20 relative overflow-hidden"
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative bg-gradient-to-r from-blue-900/80 via-indigo-900/60 to-slate-900 border border-blue-500/30 rounded-3xl p-10 md:p-16 text-center overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/20 blur-3xl pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
              Ready to Hit the Road?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
              Book your car online in minutes and enjoy seamless keyless pickup options.
            </p>
            <Link
              to="/fleet"
              className="inline-block bg-white text-slate-950 hover:bg-slate-100 px-8 py-3.5 rounded-xl font-bold transition shadow-lg shadow-white/10 hover:-translate-y-0.5"
            >
              View Available Cars
            </Link>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Home;