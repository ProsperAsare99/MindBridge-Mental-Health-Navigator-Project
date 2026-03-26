import axiosInstance from './axios-config';

class ApiClient {
    connectivityError: string | null = null;

    setToken(token: string | null) {
        if (typeof window !== 'undefined') {
            if (token) {
                localStorage.setItem('token', token);
            } else {
                localStorage.removeItem('token');
            }
        }
    }

    getToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    }

    async get(endpoint: string, config?: any) {
        // Default to 2 retries for GET requests
        const finalConfig = { retry: 2, ...config };
        const response = await axiosInstance.get(endpoint, finalConfig);
        return response.data;
    }

    async post(endpoint: string, body: any, config?: any) {
        // High-stakes requests (POST/PUT/DELETE) usually shouldn't auto-retry unless safe
        // But we allow passing the retry option via config if needed
        const response = await axiosInstance.post(endpoint, body, config);
        return response.data;
    }

    async put(endpoint: string, body: any, config?: any) {
        const response = await axiosInstance.put(endpoint, body, config);
        return response.data;
    }

    async delete(endpoint: string, config?: any) {
        const response = await axiosInstance.delete(endpoint, config);
        return response.data;
    }
}

export const api = new ApiClient();

