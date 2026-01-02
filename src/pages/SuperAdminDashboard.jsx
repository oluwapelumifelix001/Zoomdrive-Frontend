import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LayoutDashboard, Users, ShieldCheck, Car,
  LogOut, Settings, Activity, Search, Bell, Menu, X
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SuperAdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ users: 0, admins: 0, cars: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('superAdminToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // 1. Fetch Stats and Bookings
        const statsRes = await axios.get('https://zoomdrive-backend.onrender.com/users/superadmin/stats', config);
        const bookingsRes = await axios.get('https://zoomdrive-backend.onrender.com/users/superadmin/allBookings', config);

        const allBookings = bookingsRes.data;

      const totalRev = allBookings
          .filter(b => b.status === 'Approved') // Must match your Enum exactly
          .reduce((sum, b) => {
            // Convert to number to avoid string concatenation issues
            const price = parseFloat(b.totalPrice) || 0;
            return sum + price;
          }, 0);

        // 3. Set the state for both Bookings and Stats
        setBookings(allBookings);
        setStats({
          ...statsRes.data,
          totalRevenue: totalRev
        });


      } catch (err) {
        console.error("Connection Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const chartData = [
    { name: 'Users', value: stats.users || 0, color: '#3b82f6' },
    { name: 'Admins', value: stats.admins || 0, color: '#10b981' },
  ];

const handleApprove = async (bookingId) => {
    try {
      const token = localStorage.getItem('superAdminToken');
      await axios.patch(
        `https://zoomdrive-backend.onrender.com/users/superadmin/approveBooking/${bookingId}`, 
        { status: 'Approved' }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the local state
      setBookings((prev) => prev.map((item) => 
        item._id === bookingId ? { ...item, status: 'Approved' } : item
      ));

      alert("Rental confirmed!");
    } catch (err) {
      console.error("Approval Error:", err);
      alert("Failed to update status.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-white bg-[#0F172A]">Initializing Systems...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800">

      {/* --- Sidebar --- 
          HIDDEN ON MOBILE (hidden), FLEX ON MEDIUM SCREENS (md:flex)
      */}
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside className={`
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
    md:translate-x-0 
    ${isSidebarOpen ? 'w-64' : 'w-20'} 
    bg-[#0F172A] transition-all duration-300 flex flex-col fixed h-full z-50
  `}>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg"><Car className="text-white w-6 h-6" /></div>
          {isSidebarOpen && <span className="text-white font-black text-xl tracking-tight">ZoomDrive</span>}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Control Center" active={true} isOpen={isSidebarOpen} />
          <NavItem icon={<Users size={20} />} label="Users List" isOpen={isSidebarOpen} />
          <NavItem icon={<ShieldCheck size={20} />} label="Admin Management" isOpen={isSidebarOpen} />
          <NavItem icon={<Activity size={20} />} label="System Logs" isOpen={isSidebarOpen} />
          <NavItem icon={<Settings size={20} />} label="Global Settings" isOpen={isSidebarOpen} />
        </nav>

        <button onClick={handleLogout} className="m-4 flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all">
          <LogOut className="w-5 h-5" />
          {isSidebarOpen && <span className="font-bold text-sm">Logout System</span>}
        </button>
      </aside>

      {/* --- Main Content --- 
          MARGIN-LEFT REMOVED ON MOBILE (ml-0), APPLIED ON MEDIUM+ (md:ml-64)
      */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'} ml-0`}>

        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-4 md:p-6 flex justify-between items-center sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle Button */}
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 bg-slate-100 rounded-lg text-slate-600 active:bg-slate-200"
            >
              {/* Show X if open, Menu if closed */}
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 className="text-lg md:text-2xl font-black text-slate-900 leading-tight">ZoomDrive Dashboard</h1>
              <p className="hidden md:block text-slate-500 text-sm font-medium italic">Master Access: Full Control</p>
            </div>
          </div>

          <div className="flex gap-2 md:gap-4 items-center">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm outline-none w-32 lg:w-64" />
            </div>
            <div className="bg-slate-100 p-2 rounded-full cursor-pointer"><Bell className="w-5 h-5" /></div>
          </div>
        </header>

        <div className="p-4 md:p-8 space-y-6 md:space-y-8">

          {/* Stats Grid - Stacked on Mobile, 4 columns on MD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <TopCard label="Total Users" value={stats.users} trend="+12%" />
            <TopCard label="Active Admins" value={stats.admins} trend="+2" />
            <TopCard label="Fleet Size" value={stats.cars} trend="Stable" />
            <TopCard label="Net Revenue" value={`$${(stats.totalRevenue || 0).toLocaleString()}`} trend="+18%" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Distribution Chart */}
            <div className="bg-white p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 shadow-sm">
              <h3 className="font-black text-lg mb-6">User Distribution</h3>
              <div className="h-[250px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                      {chartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Booking Approvals */}
            <div className="lg:col-span-2 bg-white p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 shadow-sm">
              <h3 className="font-black text-lg mb-6">Approval Queue</h3>

              {/* Added overflow-x-auto to handle table scrolling on tiny screens */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="text-left text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                      <th className="pb-4">Customer</th>
                      <th className="pb-4">Car Model</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {bookings.length > 0 ? (
                      bookings.map((item) => (
                        <tr key={item._id} className="hover:bg-slate-50/50 transition-all">
                          <td className="py-4 font-bold text-slate-900 text-sm">{item.userName || "Customer"}</td>
                          <td className="py-4 text-slate-600 font-medium text-sm">{item.carName}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.status?.toLowerCase() === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                              }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            {item.status?.toLowerCase() === 'pending approval' ? (
                              <button onClick={() => handleApprove(item._id)} className="bg-[#0F172A] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition-all">Approve</button>
                            ) : (
                              <span className="text-emerald-500 font-bold text-xs">✓ Approved</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="4" className="py-10 text-center text-slate-400">No bookings found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Helper Components ---
const NavItem = ({ icon, label, active, isOpen }) => (
  <div className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
    {icon}
    {isOpen && <span className="font-bold text-sm">{label}</span>}
  </div>
);

const TopCard = ({ label, value, trend }) => (
  <div className="bg-white p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 shadow-sm">
    <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase mb-2">{label}</p>
    <div className="flex items-end justify-between">
      <h4 className="text-xl md:text-2xl font-black">{value}</h4>
      <span className={`text-[9px] md:text-[10px] font-black px-2 py-1 rounded-lg ${trend.includes('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{trend}</span>
    </div>
  </div>
);

export default SuperAdminDashboard;