import React, { useState, useMemo, useEffect } from 'react';
import {
  Menu, X, LayoutDashboard, Car,
  DollarSign, Bell, LogOut, Search,
  Star, ArrowRight, Sparkles, Check, Fuel, Gauge, Users, Calendar, ShieldCheck
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
  
  // --- NEW ADDITIONS ---
  { _id: '65a1b2c3d4e5f6a7b8c9d017', name: 'Audi RS e-tron GT', price: 780, category: 'Electric', make: 'Audi', transmission: 'Auto', fuel: 'Electric', rating: 4.8, seats: 5, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&auto=format&fit=crop&q=60' },
  { _id: '65a1b2c3d4e5f6a7b8c9d018', name: 'BMW i7 xDrive60', price: 890, category: 'Electric', make: 'BMW', transmission: 'Auto', fuel: 'Electric', rating: 4.9, seats: 5, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&auto=format&fit=crop&q=60' },
  { _id: '65a1b2c3d4e5f6a7b8c9d019', name: 'Maserati MC20', price: 1250, category: 'Sport', make: 'Maserati', transmission: 'Auto', fuel: 'Petrol', rating: 4.9, seats: 2, image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=500&auto=format&fit=crop&q=60' },
  { _id: '65a1b2c3d4e5f6a7b8c9d020', name: 'Chevrolet Corvette Z06', price: 950, category: 'Sport', make: 'Chevrolet', transmission: 'Auto', fuel: 'Petrol', rating: 4.8, seats: 2, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&auto=format&fit=crop&q=60' },
  { _id: '65a1b2c3d4e5f6a7b8c9d021', name: 'Aston Martin DBX707', price: 1350, category: 'SUV', make: 'Aston Martin', transmission: 'Auto', fuel: 'Petrol', rating: 4.9, seats: 5, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&auto=format&fit=crop&q=60' },
  { _id: '65a1b2c3d4e5f6a7b8c9d022', name: 'Porsche Cullinan Black Badge', price: 1950, category: 'Luxury', make: 'Rolls-Royce', transmission: 'Auto', fuel: 'Petrol', rating: 5.0, seats: 5, image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&auto=format&fit=crop&q=60' },
  { _id: '65a1b2c3d4e5f6a7b8c9d023', name: 'BMW M8 Competition', price: 1050, category: 'Luxury', make: 'BMW', transmission: 'Auto', fuel: 'Petrol', rating: 4.8, seats: 4, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60' },
  { _id: '65a1b2c3d4e5f6a7b8c9d024', name: 'Cadillac Escalade V-Series', price: 1150, category: 'SUV', make: 'Cadillac', transmission: 'Auto', fuel: 'Petrol', rating: 4.7, seats: 7, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=60' },
];

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
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-800 text-slate-100 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="relative h-48">
          <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-950/60 hover:bg-slate-800 rounded-full text-slate-300 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6 -mt-10 relative">
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-xl mb-6">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-xl font-bold text-white">{car.name}</h3>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {car.rating}
              </div>
            </div>
            <p className="text-blue-400 font-bold text-lg">${car.price} <span className="text-slate-500 text-xs font-medium">/ day</span></p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-400" /> Pick Up
                </label>
                <input
                  type="date"
                  value={dates.start}
                  onChange={(e) => setDates({ ...dates, start: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-400" /> Return
                </label>
                <input
                  type="date"
                  value={dates.end}
                  onChange={(e) => setDates({ ...dates, end: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2.5 mb-6 px-1 text-sm">
            <div className="flex justify-between text-slate-400 text-xs">
              <span>Rental Duration</span>
              <span className="font-semibold text-slate-200">{diffDays} {diffDays === 1 ? 'Day' : 'Days'}</span>
            </div>
            <div className="flex justify-between text-slate-400 text-xs">
              <span>Standard Insurance & Fee</span>
              <span className="font-semibold text-slate-200">${serviceFee}</span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="font-bold text-slate-200">Total Price</span>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">${totalAmount}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3.5 font-semibold text-xs text-slate-400 hover:text-white transition">
              Cancel
            </button>
            <button
              onClick={() => onConfirm(totalAmount, diffDays)}
              className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/25 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Confirm Booking
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
        const response = await fetch('https://zoomdrive-backend.onrender.com/users/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.userName);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchDashboard();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const handleConfirmBooking = (totalAmount, totalDays) => {
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
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100 overflow-x-hidden">

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col z-[70] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-8">
          <img src={logo} alt="Zoomdrive" className="h-10 rounded-lg shadow-lg" />
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl transition text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-grow space-y-1.5">
          {[
            { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { path: '/browse', label: 'Browse Fleet', icon: Car },
            { path: '/payment', label: 'Payments', icon: DollarSign },
          ].map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setIsSidebarOpen(false)}>
              <button className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl w-full text-sm font-semibold transition-all ${isActive(item.path) ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}>
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </Link>
          ))}
        </nav>
        <div className="pt-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-rose-400 w-full hover:bg-rose-500/10 transition">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Zoomdrive</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className={`p-2.5 rounded-xl border border-slate-800 transition ${showNotifications ? 'bg-slate-800 text-blue-400' : 'bg-slate-900 text-slate-400 hover:text-slate-200'}`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 z-50 overflow-hidden">
                <div className="p-4 border-b border-slate-800 font-bold text-xs uppercase tracking-wider text-slate-400">Notifications</div>
                <div className="p-4 hover:bg-slate-800/50 flex gap-3 items-start transition cursor-pointer">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5" />
                  <p className="text-xs text-slate-300">Welcome to Zoomdrive Premium Fleet!</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              {userName ? userName.charAt(0).toUpperCase() : 'A'}
            </div>
            <span className="font-semibold text-xs text-slate-300 hidden sm:inline-block">{userName || "User"}</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">

        {/* Hero Promotion Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-10 border border-slate-800 bg-slate-900 shadow-2xl h-[340px] sm:h-[400px] group">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60"
            alt="Promotion Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full mb-4 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 font-semibold tracking-wider text-xs uppercase">Holiday Special</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                Up to <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">30% OFF</span><br />
                Luxury Fleet Rentals
              </h1>
              <p className="text-sm sm:text-base text-slate-400 mb-6 max-w-md">Experience keyless delivery, zero hidden fees, and pure driving performance on demand.</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2">
                Explore Promotions <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search make or model..."
              className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-200 outline-none focus:border-blue-500 transition"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map(car => (
            <div key={car._id} className="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between shadow-xl">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={car.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={car.name} />
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-xs font-semibold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {car.rating}
                  </div>
                  <div className="absolute top-3 left-3 bg-blue-500/10 border border-blue-500/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                    {car.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-blue-400 transition">{car.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{car.make}</p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-[11px] text-slate-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-slate-500" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-slate-500" />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      <span>{car.seats} Seats</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-2xl font-black text-white">${car.price}</span>
                    <span className="text-xs text-slate-500 font-medium"> / day</span>
                  </div>
                </div>

                <button
                  onClick={() => { setSelectedCar(car); setIsModalOpen(true); }}
                  className="w-full bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-200 py-3 rounded-xl font-bold text-xs transition-all border border-slate-700/60 hover:border-blue-500"
                >
                  Reserve Vehicle
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

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