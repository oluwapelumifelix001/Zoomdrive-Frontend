import axios from 'axios';
const fetchUserProfile = async () => {
    // 1. Retrieve the token from localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
        // Handle case where user is not logged in (e.g., redirect to login)
        console.error("No authentication token found.");
        return;
    }

    try {
        const profileResponse = await axios.get('https://zoomdrive-backend.onrender.com/users/profile', {
            headers: {
                // 2. Attach the token in the required format: "Bearer <token>"
                'Authorization': `Bearer ${token}` 
            }
        });

        console.log('Profile Data:', profileResponse.data);

    } catch (error) {
        // If the token is expired or invalid, the backend will return 401
        if (error.response && error.response.status === 401) {
            console.error("Token invalid or expired. Logging out...");
            localStorage.removeItem('authToken'); // Clear the bad token
            // Redirect to login page
        } else {
            console.error("Error fetching profile:", error);
        }
    }
};

export default fetchUserProfile;