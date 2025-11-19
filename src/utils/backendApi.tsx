import axios from "axios";
import { BackendUrl } from "./env";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: `${BackendUrl}`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Automatically attach token before every request
api.interceptors.request.use((config) => {
    const authTokenString = Cookies.get("authToken");

    if (authTokenString) {
        const parsed = JSON.parse(authTokenString);
        const token = parsed.token || parsed.accessToken || parsed;

        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

async function getNonce() {
    return await api.get('/api/v1/auth/nonce')
}
async function getChats() {
    return await api.get('/api/v1/chat')
}

async function sendChat(address: string, content: string) {
    return await api.post('/api/v1/chat', {
        address,
        content,
    })
}

async function getExploreMining() {
    return await api.get('/api/v1/explore/recent')
}

async function getExplorePowerhouse() {
    return await api.get('api/v1/explore/powerhouse')
}

const backendApi = {
    getNonce,
    getChats,
    sendChat,
    getExplorePowerhouse,
    getExploreMining
}

export default backendApi