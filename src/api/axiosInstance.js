import axios from 'axios';

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token) {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
}
    
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

// Request interceptor to attach access token
api.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem("access_token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is coming from the refresh endpoint itself, reject immediately
        if (originalRequest.url === '/api/token/refresh/') {
            return Promise.reject(error);
        }

        // If response is 401 and the request has not been retried yet
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // If a refresh is already in progress, queue the request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    subscribeTokenRefresh((token) => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                });
            }

            isRefreshing = true;
            try {
                // Attempt to refresh the access token
                const refreshResponse = await api.post('/api/token/refresh/');
                const { access } = refreshResponse.data;

                // Save the new access token
                sessionStorage.setItem('access_token', access);
                isRefreshing = false;
                onRefreshed(access);

                // Retry the original request with the new access token
                originalRequest.headers['Authorization'] = `Bearer ${access}`;
                return api(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                console.error("Token refresh failed", refreshError);

                // If refresh token expired, clear session data and redirect to login
                if (refreshError.response && refreshError.response.status === 401) {
                    sessionStorage.removeItem('access_token');
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
