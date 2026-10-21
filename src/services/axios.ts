import axios from "axios";
import * as SecureStore from "expo-secure-store";

// https://viacep.com.br/ws/01001000/json/

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3000/api/'
})

api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync("donna-auth-token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api