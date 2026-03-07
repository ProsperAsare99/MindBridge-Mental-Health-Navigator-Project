"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ParallaxSection from "@/components/parallax-section";
import { Card3D } from "@/components/card-3d";
import {
  Heart,
  Sparkles,
  ChevronRight,
  Activity,
  Brain,
  MessageCircle,
  ShieldCheck,
  Star
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary overflow-hidden">
      {/* Soft Background Accents */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <ParallaxSection speed={0.05} direction="down" className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%]">
          <div className="h-full w-full rounded-full bg-primary/5 blur-[120px]" />
        </ParallaxSection>
        <ParallaxSection speed={0.1} direction="up" className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%]">
          <div className="h-full w-full rounded-full bg-secondary/10 blur-[120px]" />
        </ParallaxSection>
      </div>

      {/* Navigation - Apple Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5"
        >
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground/90">MindBridge</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-foreground"
        >
          {["About", "Resources", "Privacy", "Support"].map((item) => (
            <Link key={item} href="#" className="hover:text-primary transition-colors duration-300">
              {item}
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Link href="/login">
            <Button variant="ghost" className="text-sm font-bold">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-full px-6 shadow-xl shadow-primary/25">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-5xl space-y-12 flex flex-col items-center"
        >
          {/* Heading */}
          <ParallaxSection speed={0.15}>
            <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl md:text-9xl text-foreground leading-[1.05]">
              Your Mind,<br />
              <span className="text-primary/80">Understood.</span>
            </h1>
          </ParallaxSection>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary/80 backdrop-blur-sm shadow-sm"
          >
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            Designed for Academic Well-being
          </motion.div>

          <ParallaxSection speed={0.1}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium text-muted-foreground leading-relaxed">
              Navigate the complexities of university life with Ghana's first
              context-aware support system. Simple tools, deeper understanding.
            </p>
          </ParallaxSection>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="h-16 px-10 rounded-full text-lg font-bold shadow-2xl shadow-primary/30">
                Join MindBridge
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/resources" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="h-16 px-10 rounded-full text-lg font-bold border-2 border-primary/10">
                View Resources
              </Button>
            </Link>
          </div>

          {/* Trust Assets */}
          <ParallaxSection speed={0.05} direction="down">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
            >
              {[
                { icon: ShieldCheck, label: "Confidential" },
                { icon: Brain, label: "AI-Powered" },
                { icon: Sparkles, label: "Student-Led" },
                { icon: Star, label: "Highly Rated" }
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center justify-center gap-2 group">
                  <Icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                  <span className="text-sm font-bold tracking-tight uppercase">{label}</span>
                </div>
              ))}
            </motion.div>
          </ParallaxSection>
        </motion.div>

        {/* 3D Interactive Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full max-w-7xl mx-auto mt-32 px-4"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Interactive <span className="text-primary">Experience</span></h2>
            <p className="text-muted-foreground font-medium max-w-xl mx-auto">Explore our innovative tools designed to help you navigate your academic journey with clarity and confidence.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-left order-2 md:order-1">
              {[
                {
                  title: "Smart Mood Tracking",
                  description: "Monitor your emotional well-being over time with our context-aware analytics.",
                  icon: Activity
                },
                {
                  title: "AI-Powered Guidance",
                  description: "Get personalized support tailored to your unique academic and personal challenges.",
                  icon: Brain
                },
                {
                  title: "University Integration",
                  description: "Seamlessly connect with your institution's specific support resources and counselors.",
                  icon: ShieldCheck
                }
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  className="flex gap-4 p-6 rounded-3xl bg-card border border-primary/5 hover:border-primary/20 transition-all group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="order-1 md:order-2">
              <Card3D
                hoverScale={1.1}
                hoverLift={1}
                color="#ffffff"
                hoverColor="#f8faff"
                className="h-[500px]"
                content={
                  <div className="w-[340px] p-6 text-left bg-white/5 backdrop-blur-[20px] rounded-[2rem] border border-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.3)] overflow-hidden relative group/card">
                    {/* Background Glows */}
                    <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary/20 blur-[60px] rounded-full" />
                    <div className="absolute -bottom-24 -left-24 h-48 w-48 bg-secondary/20 blur-[60px] rounded-full" />

                    {/* Header: Live Status */}
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center relative border border-primary/20">
                          <Activity className="h-5 w-5 text-primary" />
                          <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-white animate-pulse" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-0.5 flex items-center gap-1.5">
                            Real-time Pulse
                            <span className="h-1 w-1 rounded-full bg-red-500 animate-ping" />
                          </div>
                          <div className="text-base font-bold text-black dark:text-white">Academic Performance</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[20px] font-black text-primary leading-none">94<span className="text-[10px] opacity-60 ml-0.5">%</span></div>
                        <div className="text-[9px] font-black uppercase tracking-tighter text-black/40 dark:text-white/40">Efficiency</div>
                      </div>
                    </div>

                    {/* Main Pulse Metric: SVG Sparkline */}
                    <div className="mb-8 relative z-10 bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/5">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">Focus Flow</div>
                          <div className="text-xl font-extrabold text-black dark:text-white">Optimal</div>
                        </div>
                        <div className="flex items-end gap-1 h-8">
                          {[0.4, 0.7, 0.5, 0.9, 0.6, 1, 0.8].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              whileInView={{ height: `${h * 100}%` }}
                              transition={{ duration: 1, delay: 1 + i * 0.1, repeat: Infinity, repeatType: "reverse", repeatDelay: Math.random() }}
                              className="w-1.5 rounded-full bg-primary/40"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="h-16 w-full relative">
                        <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                              <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                            d="M0 25 Q 15 10, 30 25 T 60 25 T 90 10 T 130 30"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="text-primary"
                          />
                          <motion.path
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            d="M0 25 Q 15 10, 30 25 T 60 25 T 90 10 T 130 30"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="4"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Secondary Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                      <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 group-hover/card:bg-primary/5 transition-colors">
                        <div className="text-[9px] font-black uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">Social Battery</div>
                        <div className="flex items-center gap-2">
                          <Heart className="h-3 w-3 text-secondary animate-pulse" />
                          <span className="text-sm font-extrabold text-black dark:text-white">High</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 group-hover/card:bg-primary/5 transition-colors">
                        <div className="text-[9px] font-black uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">Restfulness</div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-3 w-3 text-primary" />
                          <span className="text-sm font-extrabold text-black dark:text-white">8.4h</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Feedback Box - Premium Glass Layer */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.5 }}
                      className="p-4 rounded-2xl bg-primary/10 border border-primary/20 relative overflow-hidden backdrop-blur-md"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary">MindBridge AI</span>
                      </div>
                      <p className="text-[11px] font-medium text-black/80 dark:text-white/80 leading-relaxed italic">
                        "Your flow state peaked 2 hours ago. A 10-minute break now will maximize your retention for the next study block."
                      </p>
                    </motion.div>

                    {/* Footer - Session Info */}
                    <div className="mt-6 pt-5 border-t border-black/5 dark:border-white/5 flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 2.8 + i * 0.1 }}
                              className="h-6 w-6 rounded-full border-2 border-white dark:border-zinc-900 bg-primary/20 ring-2 ring-primary/5"
                            />
                          ))}
                        </div>
                        <span className="text-[9px] font-bold text-black/40 dark:text-white/40">+12 Peers Online</span>
                      </div>
                      <div className="text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">Live Tracking</div>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </motion.div>
      </main>

      {/* Floating Action Button / Quick Mood (Apple Style) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-10 right-10 z-50 md:flex hidden"
      >
        <div className="group relative">
          <button className="h-16 w-16 rounded-full bg-card shadow-2xl border border-primary/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300">
            <MessageCircle className="h-6 w-6 text-primary" />
          </button>
          <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-foreground text-background px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl">
              Talk to someone now
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
