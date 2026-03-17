import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/providers/SessionProvider";
import { SearchProvider } from "@/components/providers/SearchProvider";
import dynamic from "next/dynamic";
const DynamicCommandMenu = dynamic(() => import("@/components/search/command-menu-component"), {
  ssr: false,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MindBridge - Mental Health Navigator",
  description: "Your safe space for mental wellness and navigation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <SearchProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <DynamicCommandMenu />
            </ThemeProvider>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
