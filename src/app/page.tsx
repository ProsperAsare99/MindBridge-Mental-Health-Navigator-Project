"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import ParallaxSection from "@/components/parallax-section";
import dynamic from "next/dynamic";
import {
  Heart,
  TrendingUp,
  ChevronRight,
  Activity,
  Brain,
  MessageCircle,
  ShieldCheck,
  Trophy,
  Search,
  GraduationCap,
  Sparkles,
  Zap,
  Layers,
  Globe
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useSearch } from "@/components/providers/SearchProvider";
import { cn } from "@/lib/utils";
import { VisualHero } from "@/components/landing/visual-hero";
import { BentoGrid, BentoCard } from "@/components/landing/bento-grid";
import { JourneyTimeline } from "@/components/landing/journey-timeline";

export default function Home() {
  const router = useRouter();
  const { toggle } = useSearch();

  const innovationFeatures = useMemo(() => [
    {
      title: "Smart Mood Tracking",
      description: "Real-time emotional analytics mapped to your academic pulse. We correlate your moods with campus deadlines and events.",
      icon: Activity,
      color: "text-primary",
      className: "md:col-span-2"
    },
    {
      title: "Personalized Guidance",
      description: "Smart support paths derived from context-aware analytics.",
      icon: Brain,
      color: "text-blue-400",
      className: "md:col-span-1"
    },
    {
      title: "Institutional Bridge",
      description: "Secure, encrypted connections to your campus ecosystem.",
      icon: ShieldCheck,
      color: "text-emerald-400",
      className: "md:col-span-1"
    },
    {
      title: "Predictive Insights",
      description: "Uncovering hidden patterns within your wellness journey. Stay ahead of academic burnout with visual trend analytics.",
      icon: TrendingUp,
      color: "text-amber-400",
      className: "md:col-span-2"
    }
  ], []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] font-sans text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden noise-bg">
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="flex items-center justify-between px-8 py-4 rounded-3xl bg-secondary/20 backdrop-blur-3xl border border-white/5 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <Link href="/">
              <Logo size="md" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-10 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground"
          >
            {[
              { label: "About", href: "/about" },
              { label: "Resources", href: "/resources" },
              { label: "Privacy", href: "/privacy" },
              { label: "Support", href: "/support" }
            ].map((item) => (
              <Link 
                key={item.label} 
                href={item.href} 
                className="hover:text-primary transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </motion.div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-2xl px-6 h-11 text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <VisualHero />

        {/* Feature Grid Section */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6 mb-20 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black uppercase tracking-[0.4em] text-primary"
            >
              Innovation
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Advanced <span className="text-gradient">Support.</span><br />
              Simplified Interface.
            </h2>
            <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">
              Experience the intersection of psychological expertise and cutting-edge technology, tailored for your academic success.
            </p>
          </div>

          <BentoGrid>
            {innovationFeatures.map((feature, i) => (
              <BentoCard
                key={feature.title}
                {...feature}
                icon={feature.icon}
              />
            ))}
          </BentoGrid>
        </section>

        <JourneyTimeline />

        {/* Mission Section */}
        <section className="py-32 bg-secondary/10 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="text-xs font-black uppercase tracking-[0.4em] text-primary">The Mission</div>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
                  Empowering <br />
                  <span className="relative inline-block">
                    Ghanaian
                    <motion.svg 
                      viewBox="0 0 200 20" 
                      className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      <path d="M5 15 Q 100 5 195 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </motion.svg>
                  </span> Minds.
                </h2>
                <p className="text-xl font-medium text-muted-foreground leading-relaxed">
                  MindBridge combines deep institutional knowledge with smart insights to provide support that actually understands your environment.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/register">
                  <Button size="lg" className="h-14 px-8 rounded-2xl text-sm font-black uppercase tracking-widest bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/10">
                    Join Today
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/resources">
                  <Button variant="ghost" size="lg" className="h-14 px-8 rounded-2xl text-sm font-black uppercase tracking-widest text-white border border-white/5 hover:bg-white/5 transition-all">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-3xl opacity-20 animate-pulse" />
              <div className="relative glass-morphism rounded-[3rem] p-8 aspect-square flex flex-col justify-center items-center text-center space-y-8 border-white/5 overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                 <Brain className="h-24 w-24 text-primary animate-pulse" />
                 <div className="space-y-4">
                   <div className="text-4xl font-black text-white">84%</div>
                   <div className="text-xs font-black text-primary uppercase tracking-[0.4em]">Resilience Index</div>
                 </div>
                 <div className="grid grid-cols-3 gap-6 w-full pt-8">
                   {[Activity, Heart, ShieldCheck].map((Icon, i) => (
                     <div key={i} className="flex flex-col items-center gap-2">
                       <Icon className="h-5 w-5 text-muted-foreground" />
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: "65%" }}
                           className="h-full bg-primary/50" 
                         />
                       </div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 relative z-10 bg-[#0a0a0b]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Logo size="md" />
            <p className="text-muted-foreground font-medium max-w-sm leading-relaxed">
              Ghana's first context-aware support system designed to navigate the complexities of university life with precision and empathy.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">Platform</h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Mission</Link></li>
              <li><Link href="/resources" className="hover:text-primary transition-colors">Resources</Link></li>
              <li><Link href="/support" className="hover:text-primary transition-colors">Support Center</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">Legal</h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30">
            © 2026 MindBridge. Ghanaian Excellence.
          </div>
          <div className="flex gap-6">
             {/* Social items would go here */}
          </div>
        </div>
      </footer>
    </div>
  );
}
