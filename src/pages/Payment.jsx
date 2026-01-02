import React, { useState, useEffect } from 'react';
import { 
    Menu, X, LayoutDashboard, Car, CalendarCheck, 
    DollarSign, Bell, Settings, LogOut, CreditCard, 
    Lock, CheckCircle, Loader2, ShieldCheck, 
    Star, Info, ChevronLeft
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/cgk.jpg';
import Footer from '../Components/Footer';



const PaymentPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('idle'); 
    
    const location = useLocation();
    const navigate = useNavigate();

    const verifyToken = () => {
        const token = localStorage.getItem('authToken');
        if(!token){
            navigate('/login');
        }
    }
    verifyToken();
    const bookingData = location.state || {
        car: { 
            name: "No Car Selected", 
            image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500", 
            category: "General",
            price: 0
        },
        totalAmount: 0,
        days: 0
    };

    const { car, totalAmount, days } = bookingData;
    const isActive = (path) => location.pathname === path;

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLogout = () => {
    localStorage.removeItem('authToken');

    window.location.href = '/login';
}; 


    const handlePayment = async (e) => {
    e.preventDefault();
    setPaymentStatus('processing');

    // 1. Simulate the bank delay
    setTimeout(async () => {
        try {
                if (totalAmount === 0) {
            alert("No booking details found. Please select a car first.");
            return;
        }
            const token = localStorage.getItem('authToken');
            const actualCarId = car._id || car.id;
            
            // 2. Save the booking to your database
            const response = await fetch('https://zoomdrive-backend.onrender.com/users/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    carId: actualCarId,
                    image: car.image,
                    carName: car.name,
                    totalPrice: totalAmount,
                    startDate: bookingData.startDate, // Ensure these are passed in state
                    endDate: bookingData.endDate,
                    paymentId: "PAY-" + Math.random().toString(36).substr(2, 9), // Fake ID
                    status: 'Pending Approval' // This is what the SuperAdmin sees
                })
            });

            if (response.ok) {
                setPaymentStatus('success');
            }
        } catch (error) {
           
            alert("Payment processed but failed to save booking. Contact support.");
        }
    }, 3000);
};


    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-x-hidden text-[#131B32]">
            
            {/* Sidebar Overlay */}
            <div 
                className={`fixed inset-0 bg-[#131B32]/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
                    isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-80 bg-[#131B32] text-white p-8 flex flex-col z-[70] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border-r border-white/5 transform ${
                isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
            }`}>
                <div className="flex items-center justify-between mb-12">
                    <img src={logo} alt="Logo" className="w-48 rounded-xl ring-2 ring-white/10" />
                    <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                        <X className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                <nav className="flex-grow space-y-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4 ml-4">Main Menu</p>
                    {[
                        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                        { path: '/browse', label: 'Browse Cars', icon: Car },
                        { path: '/payment', label: 'Payment', icon: DollarSign },
                    ].map((item) => (
                        <Link key={item.path} to={item.path} className="block">
                            <button className={`flex items-center space-x-4 p-4 rounded-2xl w-full transition-all group ${
                                isActive(item.path) 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}>
                                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'group-hover:text-blue-400'}`} />
                                <span className="font-bold text-lg">{item.label}</span>
                            </button>
                        </Link>
                    ))}
                </nav>

                <div className="pt-8 border-t border-white/5 space-y-3">
                    <button className="flex items-center space-x-4 p-4 rounded-2xl text-slate-400 w-full hover:bg-white/5 transition-all" >
                        <Settings className="w-5 h-5" />
                        <span className="font-bold">Settings</span>
                    </button>
                    <button className="flex items-center space-x-4 p-4 rounded-2xl text-red-400 w-full hover:bg-red-500/10 transition-colors" onClick={handleLogout}>
                        <LogOut className="w-5 h-5" />
                        <span className="font-bold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 p-5 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <button 
                        className="p-3 text-[#131B32] bg-slate-100 border border-slate-200 rounded-2xl transition-all hover:bg-slate-200 active:scale-95" 
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={() => navigate('/browse')}
                        className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors group"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Browse</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 p-6 md:p-12 max-w-[1400px] mx-auto w-full">
                {paymentStatus === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
                            <CheckCircle className="w-16 h-16 text-green-600" />
                        </div>
                        <h1 className="text-5xl font-black text-[#131B32] mb-4">Payment Confirmed!</h1>
                        <p className="text-slate-500 max-w-md mb-12 text-lg font-medium">Your booking for the <b>{car.name}</b> is ready. You can now access your rental details from the dashboard.</p>
                        <Link to="/dashboard" className="bg-[#131B32] text-white px-10 py-5 rounded-[2rem] font-black hover:bg-blue-600 transition-all shadow-xl shadow-blue-900/10">
                            Go to Dashboard
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Form Area */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-3xl font-black text-[#131B32] flex items-center gap-4">
                                        <div className="p-3 bg-blue-50 rounded-2xl"><CreditCard className="text-blue-600 w-8 h-8" /></div>
                                        Payment Details
                                    </h3>
                                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                                        <Lock className="w-4 h-4 text-slate-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure SSL</span>
                                    </div>
                                </div>
                                
                                <form onSubmit={handlePayment} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Cardholder Name</label>
                                            <input required type="text" placeholder="FULL NAME" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-[#131B32] font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all uppercase" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Card Number</label>
                                            <div className="relative">
                                                <input required type="number" placeholder="0000 0000 0000 0000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-[#131B32] font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
                                                <ShieldCheck className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-600 w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Expiry</label>
                                            <input required type="number" placeholder="MM/YY" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 font-bold outline-none" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 ml-1">CVC / CVV</label>
                                            <input required type="number" placeholder="123" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 font-bold outline-none" />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={paymentStatus === 'processing' || totalAmount === 0}
                                        className="w-full bg-[#131B32] text-white py-7 rounded-[2.5rem] font-black text-xl hover:bg-blue-600 transition-all shadow-2xl shadow-[#131B32]/20 flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-50"
                                    >
                                        {paymentStatus === 'processing' ? (
                                            <><Loader2 className="animate-spin w-7 h-7" /> Processing...</>
                                        ) : (
                                            `Confirm & Pay $${totalAmount.toLocaleString()}`
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Summary Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-[#131B32] text-white p-10 rounded-[3rem] shadow-2xl sticky top-32 border border-white/5">
                                <h3 className="text-2xl font-black mb-8">Booking Summary</h3>
                                
                                <div className="space-y-6 mb-10">
                                    <div className="p-2 bg-white/5 rounded-[2rem] border border-white/10">
                                        <img src={car.image} className="w-full h-44 rounded-[1.8rem] object-cover mb-4 shadow-lg" alt={car.name} />
                                        <div className="px-4 pb-4">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-black text-xl">{car.name}</h4>
                                                <div className="flex items-center gap-1 text-yellow-500">
                                                    <Star className="w-4 h-4 fill-current" />
                                                    <span className="text-xs font-black">5.0</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">{car.category} Collection</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 border-t border-white/10 pt-8">
                                    <div className="flex justify-between text-slate-400 font-bold text-sm">
                                        <span>Rental Period</span>
                                        <span className="text-white">{days} Day{days !== 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400 font-bold text-sm">
                                        <span>Service Fee</span>
                                        <span className="text-white">$25.00</span>
                                    </div>
                                    <div className="flex justify-between border-t border-white/10 pt-6">
                                        <span className="text-xl font-black">Total Amount</span>
                                        <span className="text-3xl font-black text-blue-400">${totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-start gap-3 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                                    <Info className="w-5 h-5 text-blue-400 shrink-0" />
                                    <p className="text-[10px] text-blue-100/70 font-medium leading-relaxed">
                                        Secure transaction via 256-bit SSL encryption. Payment will be processed instantly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default PaymentPage;