import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SuperAdminSignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const SUPERADMIN_SIGNUP_URL = 'https://zoomdrive-backend.onrender.com/users/superadmin/signup'; 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        setIsLoading(true);

        try {
            const response = await axios.post(SUPERADMIN_SIGNUP_URL, formData);
            
            // Success response (Status 201)
            setMessage(response.data.message || 'Super Admin account created successfully! Redirecting...');
            setIsError(false);
            
            // Redirect to the Super Admin login page after a delay
            setTimeout(() => {
                navigate('/superadmin/login'); 
            }, 3000);

        } catch (error) {
            // Check for explicit error message from the backend
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred during signup.';
            setMessage(errorMessage);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>🔑 Super Admin Account Creation</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Super Admin Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Strong Password (Min 6 chars)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                
                <button type="submit" disabled={isLoading} style={styles.button}>
                    {isLoading ? 'Creating Account...' : 'Create Super Admin'}
                </button>
            </form>

            {/* Display status message */}
            {message && (
                <p style={{ 
                    ...styles.message, 
                    backgroundColor: isError ? '#f8d7da' : '#d4edda',
                    color: isError ? '#721c24' : '#155724',
                    borderColor: isError ? '#f5c6cb' : '#c3e6cb'
                }}>
                    {message}
                </p>
            )}
        </div>
    );
};

const styles = {
    container: { maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
    header: { textAlign: 'center', color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' },
    warning: { color: '#a00', textAlign: 'center', fontSize: '14px', marginBottom: '20px', backgroundColor: '#fff3cd', padding: '10px', borderRadius: '4px', border: '1px solid #ffeeba' },
    form: { display: 'flex', flexDirection: 'column' },
    input: { padding: '12px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' },
    button: { padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '15px', fontSize: '16px', transition: 'background-color 0.3s' },
    message: { padding: '15px', borderRadius: '4px', textAlign: 'center', marginTop: '20px', border: '1px solid' }
};

export default SuperAdminSignup;