import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Car, Zap, Crown, Gauge, Mountain,
    ArrowRight, Star, Users, Search,
    BatteryCharging, Sparkles, SlidersHorizontal, ArrowUpDown
} from 'lucide-react';
import PremiumNavbar from './PremiumNavbar';
import Footer from './Footer';
import Toast from './Toast';

const FleetPage = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');
    const [showToast, setShowToast] = useState(false);

    // --- EXPANDED FLEET INVENTORY ---
    const fleet = [
        // Electric Collection
        { id: 1, name: 'Tesla Model S Plaid', price: 650, category: 'Electric', make: 'Tesla', transmission: 'Auto', fuel: 'Electric', rating: 4.9, seats: 5, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VGVzbGElMjBNb2RlbCUyMFMlMjBQbGFpZHxlbnwwfHwwfHx8MA%3D%3D' },
        { id: 2, name: 'Lucid Air Sapphire', price: 720, category: 'Electric', make: 'Lucid', transmission: 'Auto', fuel: 'Electric', rating: 5.0, seats: 5, image: 'https://images.unsplash.com/photo-1701311521752-9f85d68d55ed?w=500&auto=format&fit=crop&q=60' },
        { id: 3, name: 'Porsche Taycan Turbo S', price: 850, category: 'Electric', make: 'Porsche', transmission: 'Auto', fuel: 'Electric', rating: 4.9, seats: 4, image: 'https://images.unsplash.com/photo-1746851647822-8742f3609558?w=500&auto=format&fit=crop&q=60' },
        { id: 4, name: 'Hyundai Ioniq 6 N', price: 350, category: 'Electric', make: 'Hyundai', transmission: 'Auto', fuel: 'Electric', rating: 4.8, seats: 5, image: 'https://images.unsplash.com/photo-1695427721471-d2bd4de16bb3?w=500&auto=format&fit=crop&q=60' },
        { id: 5, name: 'Tesla Cybertruck Cyberbeast', price: 950, category: 'Electric', make: 'Tesla', transmission: 'Auto', fuel: 'Electric', rating: 4.9, seats: 5, image: 'https://images.unsplash.com/photo-1731988423705-d5f267e711b4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 6, name: 'CLS 53 Amg Mercedes', price: 880, category: 'Electric', make: 'Lucid', transmission: 'Auto', fuel: 'Electric', rating: 5.0, seats: 7, image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500&auto=format&fit=crop&q=60' },

        // Luxury Collection
        { id: 7, name: 'Rolls-Royce Phantom VIII', price: 1800, category: 'Luxury', make: 'Rolls-Royce', transmission: 'Auto', fuel: 'Petrol', rating: 5.0, seats: 5, image: 'https://images.unsplash.com/photo-1728458664292-ac6d6034e78d?w=500&auto=format&fit=crop&q=60' },
        { id: 8, name: 'Bentley Continental GT Speed', price: 1200, category: 'Luxury', make: 'Bentley', transmission: 'Auto', fuel: 'Petrol', rating: 4.9, seats: 4, image: 'https://images.unsplash.com/photo-1576668273906-4c087ac1dc85?w=500&auto=format&fit=crop&q=60' },
        { id: 9, name: 'Mercedes-Maybach S680 V12', price: 1400, category: 'Luxury', make: 'Mercedes', transmission: 'Auto', fuel: 'Petrol', rating: 5.0, seats: 5, image: 'https://images.unsplash.com/photo-1701985739263-7c2f6015f270?w=500&auto=format&fit=crop&q=60' },
        { id: 10, name: 'Aston Martin DB12 Volante', price: 1100, category: 'Luxury', make: 'Aston Martin', transmission: 'Auto', fuel: 'Petrol', rating: 4.9, seats: 4, image: 'https://images.unsplash.com/photo-1749746811536-2fd0f03a8095?w=500&auto=format&fit=crop&q=60' },
        { id: 11, name: 'Chevrolet Camaro ZL1', price: 1650, category: 'Luxury', make: 'Cadillac', transmission: 'Auto', fuel: 'Electric', rating: 5.0, seats: 4, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&auto=format&fit=crop&q=60' },

        // Sports & Supercars Collection
        { id: 12, name: 'Porsche 911 GT3 RS', price: 1400, category: 'Sport', make: 'Porsche', transmission: 'PDK Auto', fuel: 'Petrol', rating: 5.0, seats: 2, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=60' },
        { id: 13, name: 'Lamborghini Huracán Sterrato', price: 1350, category: 'Sport', make: 'Lamborghini', transmission: 'Auto', fuel: 'Petrol', rating: 5.0, seats: 2, image: 'https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?w=500&auto=format&fit=crop&q=60' },
        { id: 14, name: 'Ferrari SF90 Stradale XX', price: 1750, category: 'Sport', make: 'Ferrari', transmission: 'Auto', fuel: 'Hybrid', rating: 5.0, seats: 2, image: 'https://images.unsplash.com/photo-1609138314972-08a5a13e88cf?w=500&auto=format&fit=crop&q=60' },
        { id: 15, name: 'McLaren 750S Spider', price: 1250, category: 'Sport', make: 'McLaren', transmission: 'Auto', fuel: 'Petrol', rating: 4.9, seats: 2, image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=500&auto=format&fit=crop&q=60' },
        { id: 16, name: 'Aston Martin Valhalla Hybrid', price: 2100, category: 'Sport', make: 'Aston Martin', transmission: 'Auto', fuel: 'Hybrid', rating: 5.0, seats: 2, image: 'https://images.unsplash.com/photo-1659499843682-9e651ec46847?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

        // SUV Collection
        { id: 17, name: 'Range Rover SV Long Wheelbase', price: 1200, category: 'SUV', make: 'Land Rover', transmission: 'Auto', fuel: 'Petrol', rating: 4.9, seats: 7, image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=500&auto=format&fit=crop&q=60' },
        { id: 18, name: 'Mercedes G 63 AMG 4x4²', price: 1350, category: 'SUV', make: 'Mercedes', transmission: 'Auto', fuel: 'Petrol', rating: 5.0, seats: 5, image: 'https://images.unsplash.com/photo-1680843274944-40433b411e2b?w=500&auto=format&fit=crop&q=60' },
        { id: 19, name: 'Lamborghini Urus Performante', price: 1400, category: 'SUV', make: 'Lamborghini', transmission: 'Auto', fuel: 'Petrol', rating: 4.9, seats: 5, image: 'https://images.unsplash.com/photo-1575650681837-c0ca3b1e7275?w=500&auto=format&fit=crop&q=60' },
        { id: 20, name: 'Ferrari Purosangue V12', price: 1950, category: 'SUV', make: 'Ferrari', transmission: 'Auto', fuel: 'Petrol', rating: 5.0, seats: 4, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&auto=format&fit=crop&q=60' },
         { id: 21, name: 'Dodge Challenger SRT Hellcat', price: 1650, category: 'Luxury', make: 'Cadillac', transmission: 'Auto', fuel: 'Electric', rating: 5.0, seats: 4, image: 'https://images.unsplash.com/photo-1614220683044-58f9e9548df6?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
    ];

    const categories = [
        { id: 'All', icon: Car, label: 'Full Fleet' },
        { id: 'Electric', icon: Zap, label: 'Electric' },
        { id: 'Luxury', icon: Crown, label: 'Luxury' },
        { id: 'Sport', icon: Gauge, label: 'Sports' },
        { id: 'SUV', icon: Mountain, label: 'SUVs' },
    ];

    // --- SEARCH, FILTER & SORT LOGIC ---
    const processedFleet = useMemo(() => {
        let result = fleet.filter(car => {
            const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                car.make.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || car.category === activeCategory;
            return matchesSearch && matchesCategory;
        });

        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        }

        return result;
    }, [searchQuery, activeCategory, sortBy]);

    const isLoggedIn = !!localStorage.getItem('authToken');

    const handleBookClick = () => {
        if (isLoggedIn) {
            navigate('/payments');
        } else {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate('/login');
            }, 3500);
        }
    };

    return (
        <>
            <PremiumNavbar />
            <div className="min-h-screen bg-[#FDFDFD]">
                
                {/* --- HERO SECTION --- */}
                <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500&auto=format&fit=crop&q=60"
                            alt="Luxury Car Background"
                            className="w-full h-full object-cover scale-105 animate-subtle-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/75 to-[#FDFDFD]" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 px-4 py-2 rounded-full mb-8">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-100 text-[10px] font-black uppercase tracking-[0.2em]">
                                2026 Collection • Live Availability
                            </span>
                        </div>
                        <div></div>

                        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Elite</span> Fleet.
                        </h1>
                        <p className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
                            Unmatched performance. Absolute luxury. Reserve your driving experience today.
                        </p>
                    </div>
                </section>

                {/* --- STICKY FILTER & SORT BAR --- */}
                <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                            
                            {/* Categories */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${
                                            activeCategory === cat.id
                                                ? 'bg-[#131B32] text-white shadow-lg shadow-blue-900/10'
                                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                        }`}
                                    >
                                        <cat.icon className="w-4 h-4" />
                                        {cat.label}
                                    </button>
                                ))}
                            </div>

                            {/* Search & Sort Controls */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                                {/* Search */}
                                <div className="relative w-full sm:w-64 group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search brand or model..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    />
                                </div>

                                {/* Sort Dropdown */}
                                <div className="relative w-full sm:w-auto">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full sm:w-auto appearance-none bg-slate-50 px-5 py-3 pr-10 rounded-2xl text-xs font-bold text-slate-600 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer"
                                    >
                                        <option value="featured">Sort: Featured</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="rating">Top Rated</option>
                                    </select>
                                    <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* --- FLEET GRID --- */}
                <main className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {processedFleet.map((car) => (
                            <div key={car.id} className="group relative bg-white rounded-[2.5rem] border border-slate-100 hover:border-blue-500/20 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col justify-between">
                                
                                <div>
                                    {/* Image Header */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#131B32] shadow-sm">
                                                {car.make}
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4 bg-[#131B32]/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-white flex items-center gap-1.5 shadow-lg">
                                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                            <span className="text-[10px] font-black">{car.rating}</span>
                                        </div>
                                    </div>

                                    {/* Car Details */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-black text-[#131B32] mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {car.name}
                                        </h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                                            {car.category} • {car.transmission}
                                        </p>

                                        <div className="flex items-center justify-between py-3 border-y border-slate-100 mb-6">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-blue-50 rounded-lg">
                                                    <Users className="w-3.5 h-3.5 text-blue-600" />
                                                </div>
                                                <span className="text-xs font-bold text-slate-600">{car.seats} Seats</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-indigo-50 rounded-lg">
                                                    <BatteryCharging className="w-3.5 h-3.5 text-indigo-600" />
                                                </div>
                                                <span className="text-xs font-bold text-slate-600">{car.fuel}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Booking Action */}
                                <div className="p-6 pt-0 flex items-center justify-between gap-4">
                                    <div>
                                        <span className="text-2xl font-black text-[#131B32]">${car.price}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">/ Day</span>
                                    </div>
                                    <button 
                                        className="flex-1 bg-[#131B32] text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-900/10"
                                        onClick={handleBookClick}
                                    >
                                        Book
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* --- EMPTY STATE --- */}
                    {processedFleet.length === 0 && (
                        <div className="text-center py-32">
                            <div className="inline-flex p-8 bg-slate-50 rounded-full mb-6">
                                <Search className="w-12 h-12 text-slate-300" />
                            </div>
                            <h2 className="text-2xl font-black text-[#131B32]">No vehicle matches found</h2>
                            <p className="text-slate-500 font-medium text-sm">Try broadening your search term or selecting another category.</p>
                        </div>
                    )}
                </main>

                {/* --- CONCIERGE BANNER --- */}
                <section className="px-6 pb-20">
                    <div className="max-w-7xl mx-auto bg-[#131B32] rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-colors" />

                        <div className="relative max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                Personalize Your <br />
                                <span className="text-blue-500">Driving Experience.</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-10 font-medium leading-relaxed">
                                Looking for a hypercar or custom chauffeur delivery? Our VIP concierge can acquire and deliver any vehicle globally.
                            </p>
                            <button className="bg-white text-[#131B32] px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl active:scale-95">
                                Contact Concierge
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />

            <Toast
                message="Please log in or create an account to book a car"
                type="info"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    );
};

export default FleetPage;