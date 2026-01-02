import React, { useState, useEffect } from 'react';
import {
    Menu, X, Settings, LayoutDashboard, Car, DollarSign, LogOut,
    User, Save, Lock, RotateCw, CheckCircle, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/cgk.jpg';
import Footer from '../Components/Footer';



const SettingsView = ({ authToken, setUserName: setParentUserName }) => {
    const [profile, setProfile] = useState({
        userName: '',
        email: '',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', msg: '' });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const navigate = useNavigate();
        const verifyToken = () => {
        const token = localStorage.getItem('authToken');
        if(!token){
            navigate('/login');
        }
    }
    verifyToken();


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
                    // Update the profile state so the inputs fill up
                    setProfile({
                        userName: data.userName || '',
                        email: data.email || ''
                    });
                    // Also update the parent if the prop exists
                    if (setParentUserName) setParentUserName(data.userName);
                }
            } catch (error) {
                console.error( error);
            }
        };
        fetchDashboard();
    }, [setParentUserName]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setFeedback({ type: '', msg: '' });

        try {
            const response = await fetch('http://localhost:5000/users/updateProfile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken || localStorage.getItem('authToken')}`
                },
                // FIX 1: Use profile.userName because 'userName' alone doesn't exist
                // FIX 2: Use the key 'userName' because your backend destructures { userName }
                body: JSON.stringify({ userName: profile.userName })
            });

            if (response.ok) {
                setFeedback({ type: 'success', msg: 'Profile updated successfully!' });
                // FIX 3: Use profile.userName here too
                if (setParentUserName) setParentUserName(profile.userName);
            } else {
                throw new Error("Failed to update profile");
            }
        } catch (err) {
            setFeedback({ type: 'error', msg: err.message || 'Update failed' });
        } finally {
            setIsSaving(false);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    };

    const sidebarLinks = [
        { icon: LayoutDashboard, label: "My Dashboard", href: "/dashboard" },
        { icon: Car, label: "My Rentals", href: "/rentals" },
        { icon: DollarSign, label: "Transactions", href: "/transactions" },
        { icon: Settings, label: "Settings", href: "/settings", active: true },
    ];

    return (
        <>
        <div className="h-screen w-full bg-slate-50 flex overflow-hidden font-sans">
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* SIDEBAR */}
            <aside className={`fixed inset-y-0 left-0 w-72 bg-slate-900 p-6 flex flex-col z-[70] transition-transform duration-300 border-r border-white/10 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:h-full shadow-2xl`}>
                <div className="flex items-center justify-between mb-10">
                    <img src={logo} alt="Logo" className="w-40 rounded-lg" />
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 space-y-2">
                    {sidebarLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`flex items-center gap-4 p-3.5 rounded-xl transition-all ${
                                link.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <link.icon className="w-5 h-5" />
                            <span className="font-medium">{link.label}</span>
                        </a>
                    ))}
                </nav>

                <button onClick={handleLogout} className="mt-auto flex items-center gap-4 p-4 text-gray-400 hover:text-red-400 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </aside>

            {/* CONTENT AREA */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <header className="h-16 lg:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 lg:hidden text-slate-600 bg-slate-100 rounded-lg">
                        <Menu className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold text-slate-800">Account Settings</h1>
                    
                    <div className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                            {profile.userName ? profile.userName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span className="font-semibold hidden sm:inline-block">{profile.userName || "User"}</span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-slate-50/50">
                    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                                    <p className="text-sm text-slate-500">Update your public profile details</p>
                                </div>
                            </div>

                            {feedback.msg && (
                                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
                                    feedback.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                    {feedback.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                    {feedback.msg}
                                </div>
                            )}

                            <form onSubmit={handleUpdateProfile} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={profile.userName}
                                        onChange={(e) => setProfile({ ...profile, userName: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address (Read-only)</label>
                                    <input
                                        type="email"
                                        value={profile.email}
                                        className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed outline-none"
                                        disabled
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    {isSaving ? <RotateCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    {isSaving ? "Saving..." : "Update Profile"}
                                </button>
                            </form>
                        </div>

                        {/* Security Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
                                <Lock className="w-5 h-5 text-slate-400" />
                                <h3 className="font-bold text-slate-800">Security & Privacy</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <p className="font-bold text-slate-800">Password</p>
                                        <p className="text-sm text-slate-500">Change your login credentials</p>
                                    </div>
                                    <button type="button" className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <div className='lg:hidden w-full'>
            <Footer />
        </div>
        </>
    );
};

export default SettingsView;