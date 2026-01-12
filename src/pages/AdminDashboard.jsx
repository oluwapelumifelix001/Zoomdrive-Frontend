import React, { useState, useEffect, useCallback } from 'react';
import {
    Menu, X, CheckCircle,
    AlertCircle, LayoutDashboard, Car, CalendarCheck, Clock, DollarSign, Users, TrendingUp,
    ChevronDown, Bell, Settings, LogOut, Search, Gauge, Upload, PlusCircle, Factory,
    Edit, Save, RotateCw, User, Lock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import img from '../assets/cgk.jpg';
import Footer from '../Components/Footer';


const API_URL_BASE = 'https://zoomdrive-backend.onrender.com';
const ROUTER_PREFIX = '/users';

const GET_CARS_URL = `${API_URL_BASE}${ROUTER_PREFIX}/getCar`;
const UPDATE_CAR_URL = `${API_URL_BASE}${ROUTER_PREFIX}/updateCar`;
const CREATE_CAR_URL = `${API_URL_BASE}${ROUTER_PREFIX}/newCar`;

const STATUS_OPTIONS = ['Available', 'Sold', 'Pending', 'Service'];






const apiCallWithRetry = async (url, options = {}, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);

            if (response.status === 401 || response.status === 403) {
                throw new Error("Authorization failed. Ensure your token is valid and the API URL is correct.");
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response.' }));
                throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
            }

            return response;
        } catch (error) {
            if (i < retries - 1) {
                const delay = Math.pow(2, i) * 1000;
                
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
};



const StatusBadge = ({ status }) => {
    let color = 'bg-gray-200 text-gray-800';
    if (status === 'Available') color = 'bg-green-100 text-green-700';
    if (status === 'Sold') color = 'bg-red-100 text-red-700';
    if (status === 'Pending') color = 'bg-yellow-100 text-yellow-700';
    if (status === 'Service') color = 'bg-indigo-100 text-indigo-700';
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color}`}>{status}</span>;
};

const EditableCarRow = ({ car, authToken, fetchInventory }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editableData, setEditableData] = useState({
        price: car.price || 0,
        status: car.status || 'Available'
    });
    const [statusMessage, setStatusMessage] = useState(null);

    const handleUpdate = async () => {
        setIsLoading(true);
        setStatusMessage(null);
        try {
            const payload = {
                id: car._id,
                price: Number(editableData.price),
                status: editableData.status
            };

            
            if (payload.price <= 0) {
                throw new Error("Price must be a positive number.");
            }

            const response = await apiCallWithRetry(UPDATE_CAR_URL, {
                method: 'PATCH', // Using PATCH for partial updates
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            setStatusMessage(`Update successful: Car ${result.model || car.model} updated.`);
            setIsEditing(false);
            fetchInventory(); // Refresh the list

        } catch (error) {
            setStatusMessage(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 bg-white border-b hover:bg-gray-50 transition-colors duration-150">
            <div className="w-20 h-14 flex-shrink-0 mr-4">
                <img
                    src={car.image || 'https://via.placeholder.com/80x60?text=No+Img'}
                    alt={car.name || "Car"}
                    className="w-full h-full object-cover rounded-md border border-gray-200"
                />
            </div>
            <div className="flex-1 w-full sm:w-auto">
                <p className="font-semibold text-gray-900">{car.year || 'N/A'} {car.make} {car.model}</p>
                <p className="text-sm text-gray-500">ID: {car._id ? car._id.substring(0, 8) : 'N/A'}...</p>
                {statusMessage && (
                    <p className={`text-xs mt-1 ${statusMessage.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
                        {statusMessage}
                    </p>
                )}
            </div>

            <div className="w-full sm:w-auto sm:text-right flex items-center justify-between mt-3 sm:mt-0 space-x-4">
                {/* Price Field */}
                <div className="w-1/3 sm:w-auto min-w-[100px]">
                    {isEditing ? (
                        <input
                            type="number"
                            value={editableData.price}
                            onChange={(e) => setEditableData(prev => ({ ...prev, price: e.target.value }))}
                            className="w-full p-1 border border-gray-300 rounded text-sm text-right focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Price"
                            min="0"
                        />
                    ) : (
                        <p className="text-lg font-bold text-green-600">${(car.price || 0).toLocaleString()}</p>
                    )}
                </div>

                {/* Status Field */}
                <div className="w-1/3 sm:w-auto min-w-[120px]">
                    {isEditing ? (
                        <select
                            value={editableData.status}
                            onChange={(e) => setEditableData(prev => ({ ...prev, status: e.target.value }))}
                            className="w-full p-1 border border-gray-300 rounded text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {STATUS_OPTIONS.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    ) : (
                        <StatusBadge status={car.status || 'Available'} />
                    )}
                </div>
            </div>
        </div>
    );
};

// LiveInventoryView fetches data and uses EditableCarRow
const LiveInventoryView = ({ authToken }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [inventory, setInventory] = useState([]);

    // --- API Data Fetching (READ: GET /users/getCar) ---
    const fetchInventory = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiCallWithRetry(GET_CARS_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}` // Use token for Admin access
                },
            });

            const data = await response.json();
            // Assuming each car object has an '_id' field from MongoDB
            setInventory(data.map(car => ({ ...car, id: car._id })));
            setMessage("Inventory loaded successfully.");
        } catch (e) {
            setError(`Failed to load inventory: ${e.message}. (Is your API running at ${API_URL_BASE}?)`);
            setInventory([]);
            setMessage(null);
        } finally {
            setIsLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        fetchInventory();
    }, [fetchInventory]);

    const LoadingState = (
        <div className="flex flex-col justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading Live Inventory...</p>
        </div>
    );

    const NotificationArea = ({ error, message, setError, setMessage, isLoading }) => {
        // If there is nothing to show, or it's currently loading, return nothing
        if (isLoading || (!error && !message)) return null;

        return (
            <div className="space-y-3 mb-6">
                {/* Error Notification */}
                {error && (
                    <div className="flex items-center justify-between p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl shadow-sm animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                            <div>
                                <p className="font-bold text-sm">Action Failed</p>
                                <p className="text-xs">{error}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setError(null)}
                            className="p-1 hover:bg-red-100 rounded-full transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* Success/Info Message */}
                {message && !error && (
                    <div className="flex items-center justify-between p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-r-xl shadow-sm animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                            <p className="text-sm font-medium">{message}</p>
                        </div>
                        <button
                            onClick={() => setMessage(null)}
                            className="p-1 hover:bg-emerald-100 rounded-full transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
            </div>
        );
    };


    return (
        <div className="mt-8">
            <NotificationArea error={error} message={message} setError={setError} setMessage={setMessage} isLoading={isLoading} />

            <div className="bg-white p-6 rounded-xl shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-700">Live Inventory List ({inventory.length} cars)</h2>
                    <button
                        onClick={fetchInventory}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 transition duration-150 disabled:bg-indigo-300"
                        disabled={isLoading}
                    >
                        <RotateCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
                    </button>
                </div>

                {isLoading && inventory.length === 0 ? (
                    LoadingState
                ) : inventory.length === 0 && !isLoading ? (
                    <p className="text-gray-500 text-center py-8">No cars uploaded yet.</p>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {/* Header for Desktop */}
                        <div className="hidden sm:flex bg-gray-100 p-3 font-bold text-sm text-gray-700 rounded-t-lg border-b">
                            <div className="flex-1">Vehicle Details (ID)</div>
                            <div className="w-1/3 sm:w-auto min-w-[100px] text-right mr-4">Price/Day</div>
                            <div className="w-1/3 sm:w-auto min-w-[120px] text-center">Status</div>
                        </div>

                        {/* Editable Rows */}
                        {inventory.map(car => (
                            <EditableCarRow
                                key={car._id}
                                car={car}
                                authToken={authToken}
                                fetchInventory={fetchInventory}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const SettingsView = ({ authToken, setAdminName }) => {

    const [profile, setProfile] = useState({
        userName: '',
        email: '',
        phone: ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', msg: '' });

    // 1. Fetch current settings when page opens
    useEffect(() => {
        const fetchCurrentAdmin = async () => {
            try {
                const response = await fetch('https://zoomdrive-backend.onrender.com/users/admin/dashboard', {
                    headers: { 'Authorization': `Bearer ${authToken}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setProfile({
                        userName: data.userName || '',
                        email: data.email || '',

                    });
                }
            } catch (err) {
                console.error("Failed to load settings", err);
            }
        };
        if (authToken) fetchCurrentAdmin();
    }, [authToken]);

    // 2. Handle the Update
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setFeedback({ type: '', msg: '' });

        try {
            const response = await fetch('https://zoomdrive-backend.onrender.com/users/admin/updateProfile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(profile)
            });

            if (response.ok) {
                setFeedback({ type: 'success', msg: 'Profile updated successfully!' });

                // This updates the Name in your Navbar instantly
                const shortName = profile.userName.length > 10
                    ? profile.userName.substring(0, 10) + "..."
                    : profile.userName;
                setAdminName(shortName);
            } else {
                throw new Error("Failed to update profile");
            }
        } catch (err) {
            setFeedback({ type: 'error', msg: err.message });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>

            {/* --- Profile Section --- */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-lg font-semibold text-gray-700 mb-6 flex items-center">
                    <User className="mr-2 w-5 h-5 text-indigo-500" /> Profile Information
                </h3>

                {feedback.msg && (
                    <div className={`p-4 mb-4 rounded-lg flex items-center ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {feedback.msg}
                    </div>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Admin Display Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                value={profile.userName}
                                onChange={(e) => setProfile({ ...profile, userName: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                            value={profile.email}
                            disabled
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all flex items-center justify-center space-x-2 disabled:bg-indigo-300"
                    >
                        {isSaving ? <RotateCw className="animate-spin" /> : <Save size={20} />}
                        <span>{isSaving ? "Saving..." : "Save Profile"}</span>
                    </button>
                </form>
            </div>

            {/* --- Password/Security Section --- */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
                    <Lock className="text-red-500 w-6 h-6" />
                    <h3 className="text-lg font-semibold">Security</h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-800">Change Password</p>
                            <p className="text-sm text-gray-500">Update your account password regularly for security.</p>
                        </div>
                        <button type="button" className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition font-medium">
                            Update
                        </button>
                    </div>
                    <hr />
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                        </div>
                        <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};




// --- View Definitions (for routing) ---
const VIEWS = {
    DASHBOARD: 'Dashboard',
    INVENTORY: 'Car Inventory',
    UPLOAD: 'Upload New Car',
    USERS: 'User Accounts',
    SETTINGS: 'Settings',
};




// --- Mock Data (Admin Focus) ---

const revenueData = [
    { month: 'Oct', Revenue: 50000 },
    { month: 'Nov', Revenue: 40000 },
    { month: 'Dec', Revenue: 30100 },
    { month: 'Jan', Revenue: 20000 },
];



// --- Layout & Static Sub Components ---
const SidebarLink = ({ icon: Icon, label, isActive, onClick }) => {
    const commonClasses = `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${isActive
        ? 'bg-indigo-600 text-white shadow-lg' // Indigo active color
        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        }`;


    return (
        <button
            onClick={onClick}
            className={`${commonClasses} w-full text-left focus:outline-none`}
        >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
        </button>
    );
};

const StatCard = ({ icon: Icon, label, value, color }) => {
    return (
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
};
const RevenueChartCard = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" /> Monthly Revenue
        </h2>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }} />
                    <Bar dataKey="Revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const CarUploadForm = ({ isQuick, authToken }) => {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        mileage: '',
        color: '',
        image: '',
        imageFile: null,
    });

    const [statusMessage, setStatusMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fields = [
        { name: 'make', label: 'Name', type: 'text' },
        { name: 'model', label: 'Model', type: 'text' },
        { name: 'year', label: 'Year', type: 'number' },
        { name: 'price', label: 'Daily Price ($)', type: 'number' },
        ...(isQuick ? [] : [
            { name: 'mileage', label: 'Mileage', type: 'number' },
            { name: 'color', label: 'Color', type: 'text' },
        ]),
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            imageFile: e.target.files?.[0] || null,
        }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null); // Clear previous messages

    try {
        const payload = {
            make: formData.make,
            model: formData.model,
            year: Number(formData.year),
            price: Number(formData.price),
            image: formData.image,
            status: 'Available',
            category: formData.category,
            transmission: 'Auto'
        };

        // 1. Create a 4-second delay promise
        const timer = new Promise((resolve) => setTimeout(resolve, 4000));

        // 2. Run the fetch and the timer at the same time
        const [response] = await Promise.all([
            fetch(CREATE_CAR_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(payload),
            }),
            timer // This ensures we wait at least 4 seconds
        ]);

        if (response.ok) {
            setStatusMessage("Car uploaded successfully!");

            // 3. CLEAR THE FORM FIELDS
            setFormData({
                make: '',
                model: '',
                year: '',
                price: '',
                mileage: '',
                color: '',
                image: '',
                category: '', // Reset category too
                imageFile: null,
            });
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || "Upload failed");
        }

    } catch (error) {
        setStatusMessage(`Error during upload: ${error.message}`);
    } finally {
        setIsLoading(false);
    }
};

    const gridCols = isQuick ? 'grid-cols-1 gap-3' : 'grid-cols-1 sm:grid-cols-2 gap-4';
    const titleClass = isQuick ? 'text-lg' : 'text-xl';
    const wrapperClass = isQuick ? '' : 'lg:col-span-1';

    return (
        <div className={`bg-white p-6 rounded-xl shadow-lg ${wrapperClass}`}>
            <h2 className={`${titleClass} font-semibold text-gray-800 mb-4 flex items-center`}>
                <Upload className="w-5 h-5 mr-2 text-indigo-500" />
                {isQuick ? 'Quick Car Upload' : 'Dedicated New Car Upload'}
            </h2>

            {statusMessage && (
                <div className={`p-3 rounded-lg mb-4 text-sm ${statusMessage.startsWith('Error')
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                    }`}>
                    {statusMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className={`grid ${gridCols}`}>
                    {fields.map(field => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-lg border-gray-300 p-2 border"
                                min={
                                    field.name === 'year'
                                        ? 1900
                                        : ['price', 'mileage'].includes(field.name)
                                            ? 0
                                            : undefined
                                }
                            />
                        </div>
                    ))}

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Car Image URL
                        </label>
                        <input
                            type="url"
                            name="image"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/car.jpg"
                            className="mt-1 block w-full rounded-lg border-gray-300 p-2 border"
                        />
                    </div>

                    {/* Image File */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Categories
                        </label>
                        <input
                            type="text"
                            name="category"
                            placeholder='Categories-e.g., SUV, Sedan'
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 p-2 border"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 transition-colors shadow-lg disabled:bg-indigo-300 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <RotateCw size={20} className="animate-spin mr-2" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <PlusCircle size={20} className="mr-2" />
                                Submit Car Details
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};


const DashboardView = ({ authToken, adminName }) => {
    // 1. Setup state to hold the inventory
    const [inventory, setInventory] = useState([]);

    // 2. Fetch the inventory when the component loads
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('https://zoomdrive-backend.onrender.com/users/getCar', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setInventory(data);
                }
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            }
        };

        if (authToken) fetchInventory();
    }, [authToken]);

    // 3. Define your stats dynamically based on the inventory length
    const adminStats = [
        {
            icon: Car,
            label: "Total Inventory",
            value: inventory.length,
            color: "bg-indigo-600"
        },
        {
            icon: Users,
            label: "Active Users",
            value: "12", // You can fetch this similarly later
            color: "bg-blue-500"
        },
        {
            icon: DollarSign,
            label: "Total Revenue",
            value: "$42.5k",
            color: "bg-green-500"
        },
        {
            icon: TrendingUp,
            label: "Monthly Growth",
            value: "+12.5%",
            color: "bg-orange-500"
        }
    ];

    return (
        <>
            {/* Welcome Message */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {adminName}!</h1>
                <p className="text-gray-500">Here is what's happening with Zoomdrive today.</p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {adminStats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            {/* Revenue + Quick Upload */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RevenueChartCard />
                </div>
                <div className="lg:col-span-1">
                    <CarUploadForm isQuick={true} authToken={authToken} />
                </div>
            </div>

            {/* Inventory Section (LAST) */}
            <DashboardInventorySection authToken={authToken} />
        </>
    );
};


const DashboardInventorySection = ({ authToken }) => {
    return (
        <section className="mt-12">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Car Inventory Overview
                </h2>
                <span className="text-sm text-gray-500">
                    Live inventory snapshot
                </span>
            </div>

            <LiveInventoryView authToken={authToken} />
        </section>
    );
};
// --- Main App Component ---

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeView, setActiveView] = useState(VIEWS.INVENTORY);
    const [adminName, setAdminName] = useState('');
    const [authToken, setAuthToken] = useState(localStorage.getItem('adminAuthToken') || '');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const NotificationArea = ({ error, message, setError, setMessage, isLoading }) => {
        if (isLoading || (!error && !message)) return null;
        return (
            <div className="mb-4">
                {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
                {message && <div className="p-3 bg-green-100 text-green-700 rounded-lg">{message}</div>}
            </div>
        );
    };

    // --- FETCH ADMIN DATA ---
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await fetch('https://zoomdrive-backend.onrender.com/users/admin/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (response.ok && data.userName) {
                    // TRUNCATE LOGIC: Limit name to 10 characters
                    const displayName = data.userName.length > 10
                        ? data.userName.substring(0, 10) + "..."
                        : data.userName;

                    setAdminName(displayName);
                }
            } catch (err) {
                console.error( err);
            }
        };

        if (authToken) {
            fetchAdminData();
        }
    }, [authToken]);

    const handleLogout = () => {
        localStorage.removeItem('adminAuthToken');
        window.location.href = "/admin/home";
        setIsSidebarOpen(false);
    };

    const renderView = () => {
        const viewProps = { authToken, setError, setMessage, setIsLoading };
        switch (activeView) {
            case VIEWS.INVENTORY:
                return <LiveInventoryView authToken={authToken} setAdminName={setAdminName} {...viewProps} />;
            case VIEWS.UPLOAD:
                return <CarUploadForm isQuick={false} authToken={authToken} setAdminName={setAdminName} {...viewProps} />;
            case VIEWS.SETTINGS:
                return <SettingsView authToken={authToken} setAdminName={setAdminName} {...viewProps} />;
            case VIEWS.DASHBOARD:
            default:
                return <DashboardView authToken={authToken} adminName={adminName} />;
        }
    };

    return (
        <>
            <div className="h-screen overflow-hidden bg-gray-50 flex font-sans">
                <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
                .font-sans { font-family: 'Inter', sans-serif; }
            `}</style>

                
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 
                ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
                <div
                    className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-5 space-y-6 flex flex-col z-40 transition-transform duration-300 transform
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:relative md:translate-x-0`}
                >
                    <div className="flex items-center justify-between">
                        <img src={img} alt="" style={
                            {
                                width: 200,
                                borderRadius: 10
                            }
                        } />
                        <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex-grow space-y-2">
                        <SidebarLink icon={LayoutDashboard} label={VIEWS.DASHBOARD} onClick={() => { setActiveView(VIEWS.DASHBOARD); setIsSidebarOpen(false); }} isActive={activeView === VIEWS.DASHBOARD} />
                        <SidebarLink icon={Car} label={VIEWS.INVENTORY} onClick={() => { setActiveView(VIEWS.INVENTORY); setIsSidebarOpen(false); }} isActive={activeView === VIEWS.INVENTORY} />
                        <SidebarLink icon={Upload} label={VIEWS.UPLOAD} onClick={() => { setActiveView(VIEWS.UPLOAD); setIsSidebarOpen(false); }} isActive={activeView === VIEWS.UPLOAD} />
                    </nav>
                    <div className="pt-4 border-t border-gray-700 space-y-2">
                        <SidebarLink icon={Settings} label={VIEWS.SETTINGS} onClick={() => { setActiveView(VIEWS.SETTINGS); setIsSidebarOpen(false); }} isActive={activeView === VIEWS.SETTINGS} />
                        <SidebarLink icon={LogOut} label="Logout" onClick={handleLogout} isActive={false} />
                    </div>
                </div>

                {/* --- Main Content --- */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <NotificationArea
                        error={error}
                        message={message}
                        isLoading={isLoading}
                        setError={setError}
                        setMessage={setMessage}
                    />
                    <header className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-20">
                        <button className="text-gray-600 p-2 md:hidden" onClick={() => setIsSidebarOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>

                        <h2 className="text-xl font-semibold text-gray-700  md:block">{activeView}</h2>

                        <div className="relative hidden lg:block">
                            <input
                                type="text"
                                placeholder="Search cars, users..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 w-80"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="text-gray-500 hover:text-indigo-500 p-2 rounded-full hover:bg-gray-100">

                            </button>


                            <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-100">
                                {/* Initials Avatar */}
                                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                                    {adminName ? adminName.charAt(0).toUpperCase() : 'A'}
                                </div>
                                {/* TRUNCATED NAME DISPLAY */}
                                <span className="font-semibold">
                                    {adminName || 'Admin'}
                                </span>
                                <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                        {renderView()}
                    </main>

                </div>

            </div>
            <div className="block md:hidden">
                <Footer />
            </div>
        </>
    );
};

// Simple helper component for Sidebar links
const SidebarLinks = ({ icon: Icon, label, onClick, isActive }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
    >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
    </button>
);

export default App;