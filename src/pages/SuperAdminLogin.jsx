import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const SuperAdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const SUPERADMIN_LOGIN_URL = 'https://zoomdrive-backend.onrender.com/users/superadmin/login'; 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        setIsLoading(true);

        try {
            const response = await axios.post(SUPERADMIN_LOGIN_URL, formData);
            const { token } = response.data;

            if (token) {
                localStorage.setItem('superAdminToken', token); 
                setMessage('Access Granted. Initializing Secure Session...');
                setIsError(false);
                
                setTimeout(() => {
                    navigate('/superadmin/dashboard');
                }, 1500);
            } else {
                throw new Error('Security Error: Token not received.');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Unauthorized: Invalid credentials.';
            setMessage(errorMessage);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0F172A] relative overflow-hidden font-sans">
            {/* Ambient Background Decorative Circles */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />

            <div className="relative z-10 w-full max-w-md p-8 mx-4">
                {/* Glass Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl p-8 transition-all hover:border-white/20">
                    
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex p-4 rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/30 mb-4">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Super Admin</h1>
                        <p className="text-slate-400 text-sm mt-2 font-medium">Secure Authorization Gateway</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Admin Identity</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Passkey</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 ring-blue-500/50 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Action Button */}
                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transform active:scale-95"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Verifying...
                                </>
                            ) : 'Establish Connection'}
                        </button>
                    </form>

                    {/* Feedback Messages */}
                    {message && (
                        <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
                            isError 
                                ? 'bg-red-500/10 border-red-500/50 text-red-400' 
                                : 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                        }`}>
                            {isError ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                            <span className="text-sm font-bold">{message}</span>
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <p className="mt-8 text-center text-slate-500 text-xs font-medium uppercase tracking-tighter">
                    Encrypted End-to-End System Access
                </p>
            </div>
        </div>
    );
};

export default SuperAdminLogin;