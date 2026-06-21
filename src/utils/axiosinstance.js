import axios from "axios";

import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptor to handle 401 errors and token refresh logic
axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=> {
        // handle common errors Globally
        if (error.response) {
            if (error.response.status === 401) {
                // handle unauthorized error, e.g., redirect to login
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
            else if (error.response.status === 500) {
                // handle server error
                alert("Server error occurred. Please try again later.");
            }

        }
        else if (error.code === "ECONNABORTED") {
            // handle timeout error
            alert("Request timed out. Please check your internet connection and try again.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;