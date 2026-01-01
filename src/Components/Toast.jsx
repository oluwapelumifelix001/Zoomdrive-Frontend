// src/components/Toast.jsx
import React from 'react';
import { X, Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

const Toast = ({ message, type = 'info', isVisible, onClose }) => {
    if (!isVisible) return null;

    const config = {
        success: {
            bg: 'bg-green-600',
            icon: <CheckCircle className="w-6 h-6" />,
            title: 'Success',
        },
        error: {
            bg: 'bg-red-600',
            icon: <AlertCircle className="w-6 h-6" />,
            title: 'Error',
        },
        warning: {
            bg: 'bg-orange-500',
            icon: <AlertTriangle className="w-6 h-6" />,
            title: 'Warning',
        },
        info: {
            bg: 'bg-blue-600',
            icon: <Info className="w-6 h-6" />,
            title: 'Info',
        },
    };

    const current = config[type] || config.info;

    return (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
            {/* Changed from bottom-8 to top-8 */}
            {/* Changed animation from animate-slide-up to animate-slide-down */}

            <div className={`max-w-md w-full ${current.bg} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4`}>
                <div className="flex items-center gap-3">
                    {current.icon}
                    <div>
                        <p className="font-bold">{current.title}</p>
                        <p className="text-sm opacity-90">{message}</p>
                    </div>
                </div>

                <button onClick={onClose} className="hover:opacity-70 transition">
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Toast;