import React, { useState, useMemo, useEffect } from 'react';
import {
    Menu, X, LayoutDashboard, Car, CalendarCheck,
    DollarSign, Users, Bell, Settings, LogOut, Search,
    Star, ArrowRight, Zap, Shield, Sparkles, Check, User
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/cgk.jpg';
import Footer from '../Components/Footer';

const carInventory = [
    { _id: '65a1b2c3d4e5f6a7b8c9d001', name: 'Tesla Model S Plaid', price: 650, category: 'Electric', make: 'Tesla', transmission: 'Auto', fuel: 'Electric', rating: 4.9, seats: 5, image: 'https://images.unsplash.com/photo-1716558964076-1abe07448abf?w=500&auto=format&fit=crop&q=60' },
    { _id: '65a1b2c3d4e5f6a7b8c9d002', name: 'Lucid Air Sapphire', price: 720, category: 'Electric', make: 'Lucid', transmission: 'Auto', fuel: 'Electric', rating: 5.0, seats: 5, image: 'https://images.unsplash.com/photo-1701311521752-9f85d68d55ed?w=500&auto=format&fit=crop&q=60' },
    { _id: '65a1b2c3d4e5f6a7b8c9d003', name: 'Porsche Taycan Turbo S', price: 850, category: 'Electric', make: 'Porsche', transmission: 'Auto', fuel: 'Electric', rating: 4.9, seats: 4, image: 'https://images.unsplash.com/photo-1746851647822-8742f3609558?w=500&auto=format&fit=crop&q=60' },
    { _id: '65a1b2c3d4e5f6a7b8c9d004', name: 'Hyundai Ioniq 6', price: 2200, category: 'Electric', make: 'Rimac', transmission: 'Auto', fuel: 'Electric', rating: 5.0, seats: 5, image: 'https://images.unsplash.com/photo-1695427721471-d2bd4de16bb3?w=500&auto=format&fit=crop&q=60' },
    { _id: '65a1b2c3d4e5f6a7b8c9d005', name: 'Rolls-Royce Phantom', price: 1800, category: 'Luxury', make: 'Rolls-Royce', transmission: 'Auto', fuel: 'Petrol', rating: 5.0, seats: 5, image: 'https://images.unsplash.com/photo-1728458664292-ac6d6034e78d?w=500&auto=format&fit=crop&q=60' },
    { _id: '65a1b2c3d4e5f6a7b8c9d006', name: 'Bentley Continental GT', price: 1200, category: 'Luxury', make: 'Bentley', transmission: 'Auto', fuel: 'Petrol', rating: 4.9, seats: 4, image: 'https://images.unsplash.com/photo-1576668273906-4c087ac1dc85?w=500&auto=format&fit=crop&q=60' },
    { _id: '65a1b2c3d4e5f6a7b8c9d007', name: 'Mercedes-Maybach S680', price: 1400, category: 'Luxury', make: 'Mercedes', transmission: 'Auto', fuel: 'Petrol', rating: 5.0, seats: 5, image: 'https://images.unsplash.com/photo-1701985739263-7c2f6015f270?q=80&w=872&auto=format' },
    { _id: '65a1b2c3d4e5f6a7b8c9d008', name: 'Aston Martin DB12', price: 1100, category: 'Luxury', make: 'Aston Martin', transmission: 'Auto', fuel: 'Petrol', rating: 4.9, seats: 4, image: 'https://images.unsplash.com/photo-1749746811536-2fd0f03a8095?w=500&auto=format&fit=crop&q=60' },
    { _id: '65a1b2c3d4e5f6a7b8c9d009', name: 'Porsche 911 GT3 RS', price: 1400, category: 'Sport', make: 'Porsche', transmission: 'Manual', fuel: 'Petrol', rating: 5.0, seats: 2, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80' },
    { _id: '65a1b2c3d4e5f6a7b8c9d010', name: 'Lamborghini Huracán EVO', price: 1300, category: 'Sport', make: 'Lamborghini', transmission: 'Auto', fuel: 'Petrol', rating: 5.0, seats: 2, image: 'https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?w=500&auto=format&fit=crop&q=60' },
    { _id: '65a1b2c3d4e5f6a7b8c9d011', name: 'Ferrari SF90 Stradale', price: 1600, category: 'Sport', make: 'Ferrari', transmission: 'Auto', fuel: 'Hybrid', rating: 5.0, seats: 2, image: 'https://images.unsplash.com/photo-1609138314972-08a5a13e88cf?w=500&auto=format&fit=crop&q=60' },
    { _id: '65a1b2c3d4e5f6a7b8c9d012', name: 'McLaren 720S', price: 1100, category: 'Sport', make: 'McLaren', transmission: 'Auto', fuel: 'Petrol', rating: 4.9, seats: 2, image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&q=80' },
    { _id: '65a1b2c3d4e5f6a7b8c9d013', name: 'Range Rover SV Autobiography', price: 1200, category: 'SUV', make: 'Land Rover', transmission: 'Auto', fuel: 'Diesel', rating: 4.9, seats: 7, image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&w=800&q=80' },
    { _id: '65a1b2c3d4e5f6a7b8c9d014', name: 'Mercedes G-Class AMG', price: 1300, category: 'SUV', make: 'Mercedes', transmission: 'Auto', fuel: 'Petrol', rating: 5.0, seats: 5, image: 'https://images.unsplash.com/photo-1680843274944-40433b411e2b?w=500&auto=format&fit=crop&q=60' },
    { _id: '65a1b2c3d4e5f6a7b8c9d015', name: 'Lamborghini Urus Performante', price: 1400, category: 'SUV', make: 'Lamborghini', transmission: 'Auto', fuel: 'Petrol', rating: 4.9, seats: 5, image: 'https://images.unsplash.com/photo-1575650681837-c0ca3b1e7275?w=500&auto=format&fit=crop&q=60' },
    { _id: '65a1b2c3d4e5f6a7b8c9d016', name: 'Bentley Bentayga Speed', price: 1500, category: 'SUV', make: 'Bentley', transmission: 'Auto', fuel: 'Petrol', rating: 5.0, seats: 5, image: 'https://images.unsplash.com/photo-1658593105931-3900ad253607?w=500&auto=format&fit=crop&q=60' },
];

// Sub-component for the Modal
const BookingModal = ({ car, isOpen, onClose, dates, setDates, onConfirm }) => {
    if (!isOpen || !car) return null;

    const start = new Date(dates.start);
    const end = new Date(dates.end);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const serviceFee = 25;
    const totalAmount = (car.price * diffDays) + serviceFee;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                <div className="relative h-40">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
                <div className="px-8 pb-8 -mt-12 relative">
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 mb-6">
                        <h3 className="text-2xl font-black text-slate-800">{car.name}</h3>
                        <p className="text-blue-600 font-bold">${car.price} <span className="text-slate-400 text-sm font-medium">/ day</span></p>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Pick Up</label>
                                <input
                                    type="date"
                                    value={dates.start}
                                    onChange={(e) => setDates({ ...dates, start: e.target.value })}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Return</label>
                                <input
                                    type="date"
                                    value={dates.end}
                                    onChange={(e) => setDates({ ...dates, end: e.target.value })}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3 mb-8 px-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Duration</span>
                            <span className="font-bold text-slate-800">{diffDays} {diffDays === 1 ? 'Day' : 'Days'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Service Fee</span>
                            <span className="font-bold text-slate-800">${serviceFee}</span>
                        </div>
                        <div className="pt-3 border-t border-dashed border-slate-200 flex justify-between items-center">
                            <span className="font-bold text-slate-800">Total Price</span>
                            <span className="text-2xl font-black text-blue-600">${totalAmount}</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="flex-1 py-4 font-bold text-slate-500 hover:text-slate-700 transition">Cancel</button>
                        <button
                            onClick={() => onConfirm(totalAmount, diffDays)}
                            className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition active:scale-95"
                        >
                            Confirm Booking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BrowseCarsPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [userName, setUserName] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);

    // Booking States
    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingDates, setBookingDates] = useState({
        start: new Date().toISOString().split('T')[0],
        end: new Date(Date.now() + 86400000).toISOString().split('T')[0]
    });

    const location = useLocation();
    const navigate = useNavigate();
    const categories = ["All", "Electric", "Luxury", "Sport", "SUV"];

    const filteredCars = useMemo(() => {
        return carInventory.filter(car => {
            const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || car.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const isActive = (path) => location.pathname === path;

useEffect(() => {
    const fetchDashboard = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;
        
        try {
            const response = await fetch('http://localhost:5000/users/dashboard', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.ok) {
                const data = await response.json();
                setUserName(data.userName);
            }
        } catch (error) {
            console.error("Dashboard fetch error:", error);
        } // <--- Added this brace
    }; // <--- Added this brace

    fetchDashboard();
}, []);
        const verifyToken = () => {
        const token = localStorage.getItem('authToken');
        if(!token){
            navigate('/login');
        }
    }
verifyToken();




const handleLogout = () => {   
    localStorage.removeItem('authToken');
    window.location.href = '/login';
};

    const handleConfirmBooking = (totalAmount, totalDays) => {
        // We send the car details and the calculated price to the payment route

        const token = localStorage.getItem('authToken');
        if (!token) {
            alert("Please login to book a car");
            return;
        }
        navigate('/payment', {
            state: {
                car: selectedCar,
                totalAmount: totalAmount,
                days: totalDays
            }
        });


    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col font-sans text-slate-800 overflow-x-hidden">

            {/* Sidebar Overlay */}
            <div className={`fixed inset-0 bg-black/50 backdrop-blur-md z-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)} />

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-slate-900 to-black/95 backdrop-blur-2xl p-6 flex flex-col z-[70] transition-transform duration-500 border-r border-white/5 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between mb-10">
                    <img src={logo} alt="Logo" className="w-[200px] rounded-[10px] shadow-xl" />
                    <button onClick={() => setIsSidebarOpen(false)} className="p-2.5 hover:bg-white/10 rounded-xl transition"><X className="w-5 h-5 text-slate-400" /></button>
                </div>
                <nav className="flex-grow space-y-2">
                    {[
                        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                        { path: '/browse', label: 'Browse Cars', icon: Car },
                        { path: '/payment', label: 'Payments', icon: DollarSign },
                    ].map((item) => (
                        <Link key={item.path} to={item.path} onClick={() => setIsSidebarOpen(false)}>
                            <button className={`flex items-center space-x-3 p-4 rounded-xl w-full transition-all group ${isActive(item.path) ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        </Link>
                    ))}
                </nav>
                <div className="pt-6 border-t border-white/10 space-y-2">
                    <button className="flex items-center space-x-3 p-4 rounded-xl text-red-400 w-full hover:bg-red-500/20 transition-all"onClick={handleLogout} ><LogOut className="w-5 h-5" /><span>Logout</span></button>
                </div>
            </aside>
                   
            <header className="bg-white/70 backdrop-blur-2xl border-b border-slate-200/50 px-4 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
                <div className="flex items-center gap-4">
                    <button className="p-2.5 bg-blue-600 text-white rounded-xl" onClick={() => setIsSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
                    <h2 className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Zoomdrive</h2>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button onClick={() => setShowNotifications(!showNotifications)} className={`p-2 rounded-full ${showNotifications ? 'bg-blue-50 text-blue-50' : 'text-gray-500'}`}><Bell className="w-6 h-6" /><span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span></button>
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                                <div className="p-4 border-b bg-gray-50 font-bold">Notifications</div>
                                <div className="p-4 hover:bg-blue-50 flex gap-3"><Check className="text-green-500" /><p className="text-sm">Welcome to Zoomdrive!</p></div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">{userName ? userName.charAt(0).toUpperCase() : 'A'}</div>
                        <span className="font-semibold hidden sm:inline-block">{userName || "User"}</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 px-4 md:px-8 py-8 max-w-[1800px] mx-auto w-full">
                {/* Hero section remained same as your original code... */}
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden mb-12 shadow-2xl h-[300px] sm:h-[400px] md:h-[480px] group">
                    <img
                        src="https://files.drivo.com/drivo-uploads/production/images/news/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2025-04-25-151106.webp"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        alt="Winter Promotion 2025"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-16">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 bg-red-600/90 backdrop-blur-md px-5 py-2 rounded-full mb-4">
                                <Sparkles className="w-5 h-5 text-yellow-300" />
                                <span className="text-white font-bold uppercase tracking-wider text-sm">Winter Special 2025</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 leading-tight">
                                Up to <span className="text-red-400">30% OFF</span><br />
                                Luxury Rentals This Holiday!
                            </h1>
                            <p className="text-lg sm:text-xl text-slate-200 mb-8 max-w-lg">Book now and drive in style this Christmas & New Year. Limited time offer – ends soon!</p>
                            <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 shadow-xl">
                                Claim Discount Now <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-6 mb-10 items-center justify-between">
                    <div className="relative flex-1 max-w-lg w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search cars..." className="w-full pl-12 pr-6 py-4 bg-white border rounded-2xl outline-none shadow-md" />
                    </div>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-3 rounded-full font-bold uppercase text-xs transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border'}`}>{cat}</button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredCars.map(car => (
                        <div key={car.id} className="group bg-white rounded-3xl overflow-hidden border shadow-lg hover:-translate-y-2 transition-all">
                            <div className="relative h-64"><img src={car.image} className="w-full h-full object-cover" alt={car.name} /></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div><h3 className="text-2xl font-black">{car.name}</h3><p className="text-slate-500">{car.transmission} • {car.fuel}</p></div>
                                    <div className="text-right"><p className="text-3xl font-black text-blue-600">${car.price}</p><p className="text-xs uppercase font-bold text-slate-500">per day</p></div>
                                </div>
                                <button
                                    onClick={() => { setSelectedCar(car); setIsModalOpen(true); }}
                                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />

            {/* The Booking Modal */}
            <BookingModal
                car={selectedCar}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                dates={bookingDates}
                setDates={setBookingDates}
                onConfirm={handleConfirmBooking}
            />
        </div>
    );
};

export default BrowseCarsPage;