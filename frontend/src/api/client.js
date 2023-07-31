import axios from 'axios';

const client = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000/api',
});

// Request interceptor - will be available in V2
client.interceptors.request.use(
    (config) => {
        // Add code here to read the token from localStorage
        // and set it in the request headers
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - will be available in V2
client.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Add code here to handle responses, including handling 401 errors
        // and redirecting to the login page
        // if (error.response.status === 401) {
        //   // Redirect to the login page
        //   window.location.replace('/login');
        // }
        return Promise.reject(error);
    }
);

export default client;
