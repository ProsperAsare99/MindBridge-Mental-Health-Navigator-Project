"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from "@/hooks/use-auth";
import { Logo } from "@/components/brand/Logo";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, UserCircle, ArrowLeft, PlusCircle } from "lucide-react";

// --- Components ---

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: React.ReactNode;
  [key: string]: any;
}

const AppInput = (props: InputProps) => {
  const { label, placeholder, icon, ...rest } = props;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="w-full min-w-[200px] relative group/input">
      { label && 
        <label className='block mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 ml-1'>
          {label}
        </label>
      }
      <div className="relative w-full">
        <input
          className="peer relative z-10 border-2 border-primary/10 h-14 w-full rounded-2xl bg-muted/30 px-4 pl-12 font-bold outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:bg-background focus:border-primary/30 placeholder:text-muted-foreground/30 text-sm"
          placeholder={placeholder}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          {...rest}
        />
        {/* Animated Borders */}
        {isHovering && (
          <>
            <div
              className="absolute pointer-events-none top-0 left-0 right-0 h-[2px] z-20 rounded-t-2xl overflow-hidden opacity-50"
              style={{
                background: `radial-gradient(40px circle at ${mousePosition.x}px 0px, var(--primary) 0%, transparent 100%)`,
              }}
            />
            <div
              className="absolute pointer-events-none bottom-0 left-0 right-0 h-[2px] z-20 rounded-b-2xl overflow-hidden opacity-50"
              style={{
                background: `radial-gradient(40px circle at ${mousePosition.x}px 2px, var(--primary) 0%, transparent 100%)`,
              }}
            />
          </>
        )}
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-muted-foreground/40 group-focus-within/input:text-primary transition-colors">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

// --- Main Page ---

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const { loginWithGoogle, loginWithCredentials, loginAnonymously } = useAuth() as any;

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registered') === 'true') {
      setSuccessMessage("Account created successfully! You can now sign in.");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginWithCredentials(email, password);
      if (result?.ok) {
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      console.error('Login error detail:', err);
      setError(err.message || "Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || "Google Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const leftSection = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - leftSection.left,
      y: e.clientY - leftSection.top
    });
  };

  const socialIcons = [
    {
      icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/></svg>,
      href: '#',
      onClick: handleGoogleLogin,
      label: "Google"
    },
    {
      icon: <UserCircle className="h-5 w-5" />,
      href: '#',
      onClick: async () => {
        setLoading(true);
        try {
          await loginAnonymously();
        } catch (err: any) {
          setError(err.message || "Anonymous login failed.");
        } finally {
          setLoading(false);
        }
      },
      label: "Anonymous"
    }
  ];

  return (
    <div className="h-screen w-full bg-background flex items-center justify-center p-4 selection:bg-primary/20 overflow-hidden">
      <div className='glass border border-primary/10 w-full lg:w-[85%] max-w-6xl flex justify-between h-[85vh] md:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl relative'>
        
        {/* Left Section (Form) */}
        <div
          className='w-full lg:w-1/2 px-6 lg:px-16 flex flex-col justify-center h-full relative overflow-hidden bg-background/50 backdrop-blur-sm'
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}>
          
          {/* Animated Aurora Background */}
          <div
            className={`absolute pointer-events-none w-[600px] h-[600px] bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-full blur-[100px] transition-opacity duration-700 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`,
              transition: 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          />

          <div className="z-10 w-full max-w-sm mx-auto flex flex-col h-full py-10">
            {/* Header */}
            <div className='mb-8 flex flex-col gap-6'>
                <div className="flex items-center justify-between">
                    <Logo iconOnly size="md" />
                    <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-all flex items-center gap-2 group">
                        <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                        Exit Node
                    </Link>
                </div>
                <div>
                   <h1 className='text-4xl font-black tracking-tighter leading-none'>Sign in</h1>
                   <p className="text-sm font-bold text-muted-foreground/40 mt-2">Initialize your MindBridge session</p>
                </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-6 p-4 bg-red-500/10 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-2xl border border-red-500/20 flex items-center gap-4"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse shrink-0" />
                  {error}
                </motion.div>
              )}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-6 p-4 bg-green-500/10 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-2xl border border-green-500/20 flex items-center gap-4"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse shrink-0" />
                  {successMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <form className='grid gap-6' onSubmit={handleLogin}>
              <div className='grid gap-4'>
                <AppInput 
                  label="Network Identity" 
                  placeholder="name@university.gh" 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="h-4 w-4" />}
                />
                <AppInput 
                  label="Secure Access Key" 
                  placeholder="••••••••" 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="h-4 w-4" />}
                />
              </div>

              <div className="flex items-center justify-between">
                <a href="#" className='font-bold text-xs text-muted-foreground/40 hover:text-primary transition-colors'>Forgot key?</a>
                <Link href="/register" className='font-bold text-xs text-primary hover:underline underline-offset-4'>Create Profile</Link>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="group/button relative w-full h-14 overflow-hidden rounded-2xl bg-primary px-4 font-black uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20"
              >
                <span className="relative z-10">{loading ? "Authenticating..." : "Establish Connection"}</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-12 bg-white/20" />
                </div>
              </button>
            </form>

            <div className='mt-auto pt-10'>
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-primary/5" />
                </div>
                <div className="relative flex justify-center text-[8px] uppercase font-black tracking-[0.4em] text-muted-foreground/30">
                  <span className="bg-background/20 px-4">Social Access Nodes</span>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ul className="flex gap-4">
                  {socialIcons.map((social, index) => (
                    <li key={index} className="list-none">
                      <button
                        onClick={social.onClick}
                        disabled={loading}
                        title={social.label}
                        className={`w-12 h-12 bg-muted/50 rounded-2xl flex justify-center items-center relative z-[1] border border-primary/10 overflow-hidden group hover:border-primary/30 transition-all active:scale-95 disabled:opacity-50`}
                      >
                        <div
                          className={`absolute inset-0 w-full h-full bg-primary/10 scale-y-0 origin-bottom transition-transform duration-500 ease-in-out group-hover:scale-y-100`}
                        />
                        <span className="text-muted-foreground/60 transition-all duration-500 ease-in-out z-[2] group-hover:text-primary">
                          {social.icon}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (Cinematic Image) */}
        <div className='hidden lg:block w-1/2 right h-full overflow-hidden relative'>
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/40 z-10" />
            <Image
              src='https://images.pexels.com/photos/7102037/pexels-photo-7102037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              width={1200}
              height={1200}
              priority
              alt="Cinematic mental health visual"
              className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
            />
            {/* Overlay Branding */}
            <div className="absolute bottom-12 left-12 z-20 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
                    <PlusCircle className="h-3 w-3" />
                    Secure Infrastructure
                </div>
                <h2 className="text-4xl font-black text-white tracking-tight drop-shadow-2xl">Ghana's First<br />Wellness Navigator.</h2>
            </div>
       </div>
      </div>
    </div>
  )
}
