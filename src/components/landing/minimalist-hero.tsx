"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText?: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

// Helper component for navigation links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-sm font-bold tracking-widest text-foreground/60 transition-all hover:text-primary hover:scale-105"
  >
    {children}
  </Link>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/60 transition-all hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20"
  >
    <Icon className="h-5 w-5" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8 font-sans md:p-12',
        className
      )}
    >
      {/* Abstract Background Accents */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <Logo size="md" />
          </Link>
        </motion.div>
        
        <div className="hidden items-center space-x-10 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block">
                <button className="text-sm font-bold text-foreground/60 hover:text-primary transition-colors">Sign In</button>
            </Link>
            <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-1.5 md:hidden"
            aria-label="Open menu"
            >
                <Menu className="h-6 w-6 text-foreground" />
            </motion.button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3 gap-8 md:gap-0">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="z-20 order-2 md:order-1 text-center md:text-left space-y-6"
        >
          <div className="space-y-4">
            <div className="h-px w-12 bg-primary hidden md:block" />
            <p className="mx-auto max-w-xs text-base md:text-lg leading-relaxed text-foreground/80 md:mx-0 font-medium">
                {mainText}
            </p>
          </div>
          <Link 
            href={readMoreLink} 
            className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors"
          >
            Read Our Story
            <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <span className="h-px w-4 bg-current inline-block align-middle" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Center Image with Circle */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-[350px] md:h-full">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute z-0 h-[300px] w-[300px] rounded-full bg-primary/20 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px] backdrop-blur-3xl border border-primary/20 shadow-[0_0_50px_rgba(174,145,100,0.15)]"
            ></motion.div>
            <motion.div
                className="relative z-10 w-full max-w-[320px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="h-full w-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://placehold.co/400x600/ae9164/0f0f10?text=MindBridge+Wellness`;
                    }}
                />
            </motion.div>
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="z-20 order-3 flex flex-col items-center justify-center text-center md:items-end md:text-right"
        >
          <h1 className="text-6xl sm:text-7xl font-black text-foreground md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tighter">
            <span className="block">{overlayText.part1}</span>
            <span className="block text-primary drop-shadow-sm">{overlayText.part2}</span>
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between mt-8 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-5"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-xs font-black uppercase tracking-[0.4em] text-foreground/40"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
