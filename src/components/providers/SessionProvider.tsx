"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { api } from "@/lib/api";

function SessionSync() {
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user) {
            const token = (session.user as any).accessToken;
            if (token) {
                api.setToken(token);
                console.log('[AUTH SYNC] Updated localStorage token');
            }
        }
    }, [session]);

    return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <SessionSync />
            {children}
        </SessionProvider>
    );
}
