import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';

export async function getAuthSession() {
    return await getServerSession(authOptions);
}

export async function serverApi(endpoint: string, options: RequestInit = {}) {
    const session = await getAuthSession();
    const token = (session as any)?.user?.accessToken;

    const url = `${API_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    } as Record<string, string>;

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Server API Request failed');
    }

    return response.json();
}
