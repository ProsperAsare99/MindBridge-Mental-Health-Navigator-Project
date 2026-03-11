import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      institution?: string;
      studentId?: string;
      course?: string;
      phoneNumber?: string;
      isVerified?: boolean;
      isAnonymous?: boolean;
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    institution?: string;
    studentId?: string;
    course?: string;
    phoneNumber?: string;
    isVerified?: boolean;
    isAnonymous?: boolean;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    institution?: string;
    studentId?: string;
    course?: string;
    phoneNumber?: string;
    isVerified?: boolean;
    isAnonymous?: boolean;
    accessToken?: string;
  }
}
