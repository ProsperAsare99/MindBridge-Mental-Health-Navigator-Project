import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                accessToken: { label: "Access Token", type: "text" },
            },
            async authorize(credentials) {
                try {
                    // Check if we have an explicit access token (e.g. from anonymous login)
                    if (credentials?.accessToken) {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api'}/auth/verify-token`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${credentials.accessToken}`,
                                'Content-Type': 'application/json'
                            },
                        });

                        if (!response.ok) {
                            throw new Error("Token verification failed");
                        }

                        const data = await response.json();
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.name,
                            institution: data.user.institution,
                            studentId: data.user.studentId,
                            course: data.user.course,
                            image: data.user.image,
                            isVerified: data.user.isVerified ?? true,
                            isAnonymous: data.user.isAnonymous ?? false,
                            accessToken: data.token || credentials.accessToken,
                        };
                    }

                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Invalid credentials");
                    }

                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api'}/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(error.error || "Login failed");
                    }

                    const data = await response.json();

                    if (data.user && data.token) {
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.name,
                            institution: data.user.institution,
                            studentId: data.user.studentId,
                            course: data.user.course,
                            image: data.user.image,
                            isVerified: data.user.isVerified ?? true,
                            isAnonymous: data.user.isAnonymous ?? false,
                            accessToken: data.token,
                        };
                    }
                    return null;
                } catch (error: any) {
                    console.error("NextAuth Authorize Error:", error);
                    if (error.message.includes("fetch failed") || error.code === "ECONNREFUSED") {
                        throw new Error("Backend server unreachable. Please ensure the backend server is running (npm run dev:all).");
                    }
                    throw new Error(error.message || "Authentication failed");
                }
            },
        }),
    ],
    debug: false,
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, trigger, session }: { token: any; user: any; trigger?: string; session?: any }) {
            if (user) {
                token.id = user.id;
                token.isVerified = user.isVerified;
                token.isAnonymous = user.isAnonymous;
                token.accessToken = user.accessToken;
                token.institution = user.institution;
                token.studentId = user.studentId;
                token.course = user.course;
                token.image = user.image;
            }
            
            // Handle manual session updates
            if (trigger === "update" && session) {
                // If the update trigger is fired, merge the new session data into the token
                // This is where we handle profile updates in useAuth
                if (session.user) {
                   if (session.user.name) token.name = session.user.name;
                   if (session.user.institution) token.institution = session.user.institution;
                   if (session.user.studentId) token.studentId = session.user.studentId;
                   if (session.user.course) token.course = session.user.course;
                   if (session.user.image) token.image = session.user.image;
                }
            }
            
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.isVerified = token.isVerified;
                session.user.isAnonymous = token.isAnonymous;
                session.user.accessToken = token.accessToken;
                session.user.institution = token.institution;
                session.user.studentId = token.studentId;
                session.user.course = token.course;
                session.user.image = token.image;
                session.user.name = token.name;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
