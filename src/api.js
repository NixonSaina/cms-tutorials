// src/api.js
import axios from 'axios';

// Set the default baseURL for Axios requests
axios.defaults.baseURL = 'http://localhost:5000';  // This is where your backend runs

// Export Axios if you want to reuse it elsewhere
export default axios;
