import React, { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard, Car, CalendarCheck, Clock, DollarSign, Users, TrendingUp, ChevronDown, Bell, Settings, LogOut, Search, MapPin, Gauge, Check, User } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import logo from '../assets/cgk.jpg'
import Footer from '../Components/Footer';

;

const stats = [
    { icon: Car, label: "Total Rentals", value: "48", color: "bg-blue-500" },
    { icon: CalendarCheck, label: "Pending Returns", value: "0", color: "bg-yellow-500" },
    { icon: DollarSign, label: "Lifetime Spend", value: "$4,520", color: "bg-green-500" },
    { icon: Users, label: "Referrals", value: "0", color: "bg-purple-500" },
];

const recentActivity = [
    { id: 1, car: "Tesla Model 3", status: "Returned", date: "2024-11-15", cost: "$450" },
    { id: 2, car: "Toyota Corolla", status: "Active", date: "2024-12-01", cost: "$120" },
    { id: 3, car: "Ford F-150", status: "Cancelled", date: "2024-10-28", cost: "$0" },
    { id: 4, car: "BMW X5", status: "Returned", date: "2024-10-10", cost: "$890" },
];

const rentalFrequencyData = [
    { name: 'Sport', Rentals: 35 },
    { name: 'SUV', Rentals: 28 },
    { name: 'Electric', Rentals: 15 },
    { name: 'Luxury', Rentals: 10 },
    { name: 'Van', Rentals: 5 },
];

const SidebarLink = ({ icon: Icon, label, href, isActive, onClick }) => {
    const commonClasses = `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${isActive
        ? 'bg-blue-600 text-white shadow-lg'
        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        }`;

    if (onClick) {
        // If onClick is provided, render as a button for accessibility
        return (
            <button
                onClick={onClick}
                className={`${commonClasses} w-full text-left focus:outline-none`}
            >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
            </button>
        );
    }

    // Otherwise, render as a standard anchor tag
    return (
        <a
            href={href}
            className={commonClasses}
        >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
        </a>
    );
};

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="p-5 bg-white rounded-xl shadow-lg flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <div className="flex justify-between items-start">
            <div className={`p-3 rounded-full text-white ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <span className="text-xs text-gray-500">{label}</span>
        </div>
        <div className="mt-4">
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const ActiveRentalCard = ({ rental }) => {
    if (!rental) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-200 flex flex-col items-center justify-center h-[280px]">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                    <Car className="w-8 h-8 text-gray-300" />
                </div>
                <h2 className="text-xl font-semibold text-gray-400">No Active Rental</h2>
                <p className="text-gray-400 text-sm">Your active bookings will appear here.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" /> Active Rental
                </h2>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                    View Details &rarr;
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <img
                    src={rental.image || (rental.carId && rental.carId.image)}
                    alt={rental.carName}
                    className="w-full md:w-48 h-32 rounded-lg object-cover shadow-md"
                />
                <div className="text-left w-full">
                    <p className="text-2xl font-extrabold text-gray-900">{rental.carName}</p>
                    <div className="grid grid-cols-2 gap-y-2 mt-3 text-sm text-gray-600">
                        <div className="flex items-center"><CalendarCheck className="w-4 h-4 mr-1 text-blue-500" /> From: {rental.startDate}</div>
                        <div className="flex items-center"><CalendarCheck className="w-4 h-4 mr-1 text-green-500" /> To: {rental.endDate}</div>
                        <div className="flex items-center"><Check className="w-4 h-4 mr-1 text-indigo-500" /> Status: {rental.status}</div>
                        <div className="flex items-center"><DollarSign className="w-4 h-4 mr-1 text-green-600" /> Paid: ${rental.totalPrice}</div>
                    </div>
                </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Extend Rental
                </button>
            </div>
        </div>
    );
};

const ChartCard = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-teal-500" /> Rental Frequency
        </h2>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rentalFrequencyData} margin={{ top: 10, right: 0, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }} />
                    <Bar dataKey="Rentals" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const RecentActivityTable = ({ bookings }) => {
    if (bookings.length === 0) {
        return (
            <div className="bg-white p-12 rounded-xl shadow-lg text-center border-2 border-dashed border-gray-100">
                <p className="text-gray-500 font-medium">No car rented yet</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Rental History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Car Model</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Cost</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bookings.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{item.carName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full 
                                        ${item.status === 'Active' || item.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.startDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-bold">${item.totalPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const handleLogout = () => {
    localStorage.removeItem('authToken');

    window.location.href = '/login';
};



// --- Main Component ---

// ... (Your imports and sub-components remain exactly the same)

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [bookings, setBookings] = useState([]); // Core logic kept
    const [loading, setLoading] = useState(true); // Core logic kept

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) return;

            try {
                const response = await fetch('https://zoomdrive-backend.onrender.com/users/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setUserName(data.userName);
            } catch (error) {
                console.error("Error fetching dashboard:", error);
            }
        };
        fetchDashboard();
    }, []);

    useEffect(() => {
        const getDashboardData = async () => {
            try {
                // Note: Ensure your token key is consistent (authToken vs token)
                const token = localStorage.getItem('authToken') || localStorage.getItem('token');
                const response = await fetch('https://zoomdrive-backend.onrender.com/users/getBooking', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.status === 401) {

                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return;
                }
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error("Error loading dashboard:", error);
            } finally {
                setLoading(false);
            }
        };
        getDashboardData();
    }, []);

    const totalRented = bookings.length;

    // Logic: Count bookings that are NOT 'Returned' or 'Completed'
    const pendingReturns = bookings.filter(b => b.status !== 'Returned' && b.status !== 'Completed').length;

    const totalSpent = bookings.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

    // Map your live data back into the format the StatCard expects
    const liveStats = [
        { icon: Car, label: "Total Rentals", value: totalRented.toString(), color: "bg-blue-500" },
        { icon: CalendarCheck, label: "Pending Returns", value: pendingReturns.toString(), color: "bg-yellow-500" },
        { icon: DollarSign, label: "Lifetime Spend", value: `$${totalSpent.toLocaleString()}`, color: "bg-green-500" },
        { icon: Users, label: "Referrals", value: "0", color: "bg-purple-500" },
    ];
    const activeRental = bookings.find(b => b.status === 'Active' || b.status === 'Approved') || null;
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    return (
        <>
            <div className="min-h-screen bg-gray-50 flex font-sans">
                {/* --- Sidebar Overlay and Sidebar remain unchanged --- */}
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 
                    ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
                <div
                    className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-5 space-y-6 flex flex-col z-40 
                    transition-transform duration-300 transform 
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <div className="flex items-center justify-between">
                        <img src={logo} width='180px' alt="logo" />
                        <button className="text-white p-2 rounded-full hover:bg-gray-700" onClick={() => setIsSidebarOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex-grow space-y-2">
                        <SidebarLink icon={LayoutDashboard} label="Dashboard" href="/dashboard" isActive={true} />
                        <SidebarLink icon={Car} label="Browse Cars" href="/browse" isActive={false} />
                        <SidebarLink icon={DollarSign} label="Payments" href="/payment" isActive={false} />
                        <SidebarLink icon={Users} label="Refer & Earn" href="#" isActive={false} />
                    </nav>

                    <div className="pt-4 border-t border-gray-700 space-y-2">
                        <SidebarLink icon={Settings} label="Settings" href="/settings" isActive={false} />
                        <SidebarLink icon={LogOut} label="Logout" onClick={handleLogout} isActive={false} />
                    </div>
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* --- Header remains unchanged --- */}
                    <header className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-20">



                        <button

                            className="text-gray-600 p-2 rounded-full hover:bg-gray-100" // Now visible on all screen sizes

                            onClick={() => setIsSidebarOpen(true)}

                        >

                            <Menu className="w-6 h-6" />

                        </button>
                        <div className="relative hidden  md:block">

                            <input

                                type="text"

                                placeholder="Search bookings, cars, or help..."

                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 md:w-64 lg:w-96 transition-all duration-300"

                            />

                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3  h-5 text-gray-400" />

                        </div>



                        <div className="flex items-center space-x-4">
                            <div className="relative"> {/* 1. Container must be relative for the dropdown to align */}
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}

                                    className={`p-2 rounded-full transition-colors ${showNotifications ? 'bg-blue-50 text-blue-500' : 'text-gray-500 hover:text-blue-500 hover:bg-gray-100'

                                        }`}
                                >
                                    <Bell className="w-6 h-6" />

                                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                                </button>
                                {showNotifications && (

                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">

                                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">

                                            <h3 className="font-bold text-gray-700">Notifications</h3>

                                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">2 New</span>

                                        </div>



                                        <div className="max-h-[300px] overflow-y-auto">

                                            {/* Notification Item 1 */}

                                            <div className="p-4 hover:bg-blue-50 border-b border-gray-50 cursor-pointer transition-colors">

                                                <div className="flex gap-3">

                                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">

                                                        <Check className="w-4 h-4" />

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-gray-800 font-medium">Upload Successful</p>

                                                        <p className="text-xs text-gray-500">Toyota Camry has been added to inventory.</p>

                                                    </div>

                                                </div>

                                            </div>



                                            {/* Notification Item 2 */}

                                            <div className="p-4 hover:bg-blue-50 cursor-pointer transition-colors">

                                                <div className="flex gap-3">

                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">

                                                        <User className="w-4 h-4" />

                                                    </div>

                                                    <div>

                                                        <p className="text-sm text-gray-800 font-medium">New Admin Joined</p>

                                                        <p className="text-xs text-gray-500">A new admin has been verified.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setShowNotifications(!showNotifications)}

                                            className={`p-2 rounded-full transition-colors ${showNotifications ? 'w-full py-3 text-sm text-blue-600 font-semibold bg-gray-50 hover:bg-gray-100 transition-colors' : 'text-gray-500 hover:text-blue-500 hover:bg-gray-100'

                                                }`}
                                        > Mark all as read</button>

                                    </div>

                                )}

                            </div>

                            <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">

                                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                                    {userName ? userName.charAt(0).toUpperCase() : 'A'}
                                </div>
                                <a href=""></a>
                                <span className="ffont-semibold hidden sm:inline-block">
                                    {userName
                                        || "loading.."}
                                </span>
                            </div>

                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {greeting}, {userName ? (userName.length > 10 ? userName.substring(0, 6) : userName) : "loading.."}
                        </h1>
                        <p className="text-gray-500 mb-8">It's a great day to find your next ride..</p>

                        {/* Statistics Grid - NOW USING liveStats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {liveStats.map((stat) => (
                                <StatCard key={stat.label} {...stat} />
                            ))}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <ActiveRentalCard rental={activeRental} />
                            </div>
                            <div className="lg:col-span-1">
                                <ChartCard />
                            </div>
                        </div>
                        {/* Recent Activity Table (Now passing live data) */}
                        <div className="mt-8">
                            <RecentActivityTable bookings={bookings} loading={loading} />
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;