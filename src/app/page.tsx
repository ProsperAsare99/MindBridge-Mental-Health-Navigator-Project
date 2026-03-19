"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ParallaxSection from "@/components/parallax-section";
import dynamic from "next/dynamic";

const Card3D = dynamic(() => import("@/components/card-3d").then((mod) => mod.Card3D), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full rounded-[2.5rem] bg-muted/20 animate-pulse border border-border" />
});
import {
  Heart,
  Sparkles,
  ChevronRight,
  Activity,
  Brain,
  MessageCircle,
  ShieldCheck,
  Trophy,
  Search,
  GraduationCap
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useSearch } from "@/components/providers/SearchProvider";

export default function Home() {
  const { toggle } = useSearch();

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary overflow-hidden">
      {/* Soft Background Accents */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <ParallaxSection speed={0.05} direction="down" className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%]">
          <div className="h-full w-full rounded-full bg-primary/10 blur-[120px]" />
        </ParallaxSection>
        <ParallaxSection speed={0.1} direction="up" className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%]">
          <div className="h-full w-full rounded-full bg-secondary/10 blur-[120px]" />
        </ParallaxSection>
      </div>

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="flex items-center justify-between px-8 py-4 rounded-[2.5rem] bg-background/40 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-black/20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 outline-none"
          >
            <Link href="/">
              <Logo size="md" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-10 text-md font-bold text-foreground"
          >
            {[
              { label: "About", href: "/about" },
              { label: "Resources", href: "/resources" },
              { label: "Privacy", href: "/privacy" },
              { label: "Support", href: "/support" }
            ].map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95 relative group px-2 py-1">
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-5"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full hover:bg-primary/10 group transition-all"
              onClick={toggle}
            >
              <Search className="h-6 w-6 text-foreground/80 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
            </Button>
            <Link href="/login">
              <Button variant="ghost" className="text-sm font-bold text-foreground/90 hover:text-primary">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-full px-8 h-12 text-sm font-bold bg-primary text-black hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section: Editorial Luxury Style */}
      <main className="relative z-10 pt-24 md:pt-32 pb-20">
        {/* Floating Pill Visual Banner */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative h-[45vh] md:h-[65vh] w-full overflow-hidden rounded-[3rem] md:rounded-[5.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-primary/10 group"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: 'url("/images/hero-landscape-nature.png")' }}
            />
            {/* Soft sophisticated overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>
        </div>

        {/* Layered Heading: Overlapping the bottom of the pill */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 -mt-16 md:-mt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <ParallaxSection speed={0.05}>
              <h1 className="text-7xl font-black tracking-tight sm:text-8xl md:text-[11rem] text-[#0f0f10] drop-shadow-[0_20px_40px_rgba(0,0,0,0.05)] leading-[0.9] inline-block">
                Your Mind,<br />
                <span className="text-primary tracking-tighter">Understood.</span>
              </h1>
            </ParallaxSection>
          </motion.div>
        </div>

        {/* Value Proposition: 2-Column Editorial Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Left Column: Branding & Mission */}
            <div className="md:col-span-7 space-y-10 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-[#0a0a0b] px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.4em] text-primary shadow-2xl"
              >
                <Activity className="h-4 w-4 animate-pulse text-primary" />
                Designed for Academic Well-being
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 1 }}
                className="text-2xl md:text-4xl font-light text-[#0f0f10]/90 leading-tight max-w-2xl"
              >
                Navigate the complexities of university life with <span className="text-primary font-bold italic">Ghana's first </span> <span className="font-black text-[#0f0f10] border-b-4 border-primary/40 pb-1">Context-Aware Support System.</span>
              </motion.p>
            </div>

            {/* Right Column: Deep Insight & Actions */}
            <div className="md:col-span-5 space-y-8 md:pt-16">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-lg font-bold text-[#0f0f10]/70 leading-relaxed uppercase tracking-widest"
              >
                Simple tools, deeper understanding. Your journey to wellness starts with clarity.
              </motion.p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" className="h-20 px-12 rounded-full text-xl font-black shadow-2xl bg-primary text-[#0f0f10] hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all outline-none">
                    Join MindBridge
                    <ChevronRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/resources" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="h-20 px-12 rounded-full text-xl font-black border-2 border-primary/30 bg-white/20 text-[#0f0f10] hover:bg-primary/5 transition-all backdrop-blur-md">
                    Explore
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section Transition: Parchment to Carbon */}
        <div className="mt-32 pt-24 pb-32 bg-gradient-to-b from-background via-[#0f0f10]/60 to-[#0f0f10] relative">
          {/* Subtle noise/texture overlay for the dark section */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
          
          {/* 3D Interactive Section: Embedded in Carbon */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-7xl mx-auto px-4 relative z-10"
          >
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-6 text-white leading-tight">
                Interactive <span className="text-primary italic">Experience.</span>
              </h2>
              <p className="text-[#a1a1aa] font-medium max-w-2xl mx-auto text-lg md:text-xl">
                Explore our innovative tools designed to help you navigate your academic journey with precision and confidence.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
                {/* Feature Cards Grid (Asymmetric offsets) */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Smart Mood Tracking",
                      description: "Monitor your emotional well-being over time with our context-aware analytics.",
                      icon: Activity,
                      className: "md:mt-0"
                    },
                    {
                      title: "AI-Powered Guidance",
                      description: "Get personalized support tailored to your unique academic and personal challenges.",
                      icon: Brain,
                      className: "md:mt-12"
                    },
                    {
                      title: "University Integration",
                      description: "Seamlessly connect with your institution's resources.",
                      icon: ShieldCheck,
                      className: "md:-mt-12"
                    },
                    {
                      title: "Visual Mood Insights",
                      description: "Deep-dive into your patterns with graphical trends.",
                      icon: Sparkles,
                      className: "md:mt-0"
                    }
                  ].map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i + 0.3 }}
                      className={cn(
                        "flex flex-col gap-5 p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 shadow-2xl hover:bg-white/[0.05] hover:border-primary/20 transition-all group",
                        feature.className
                      )}
                    >
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                        <feature.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                        <p className="text-sm text-[#a1a1aa] font-medium leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center lg:justify-end">
                <Card3D
                  hoverScale={1.05}
                  hoverLift={0.5}
                  color="transparent"
                  hoverColor="transparent"
                  className="h-[550px]"
                  content={
                    <div className="w-[320px] p-8 text-left glass backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-premium">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center relative shadow-inner">
                          <Activity className="h-6 w-6 text-primary" />
                          <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-background animate-pulse" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-[10px] font-black uppercase tracking-widest text-primary/70">Mood Trend Analysis</div>
                            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                          </div>
                          <div className="text-sm font-bold text-white opacity-90">Weekly Pulse</div>
                        </div>
                      </div>

                      {/* Graphical Mood Trends with Grid and Axis */}
                      <div className="mb-10 relative">
                        {/* Y-Axis Labels & Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pr-2 py-1">
                          {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 w-full">
                              <span className="text-[8px] font-black text-white/20 w-4 text-right">
                                {i === 0 ? 'H' : i === 1 ? 'A' : 'L'}
                              </span>
                              <div className="h-px flex-1 border-t border-dotted border-white/10" />
                            </div>
                          ))}
                        </div>

                        <div className="flex items-end justify-between h-28 gap-2 px-6 relative z-10 pt-4">
                          {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0, opacity: 0 }}
                              whileInView={{ height: `${height}%`, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.6 + (i * 0.1), duration: 0.8, ease: "circOut" }}
                              className="w-full bg-gradient-to-t from-primary/10 via-primary/40 to-primary rounded-t-sm relative group/bar shadow-[0_0_15px_rgba(174,145,100,0.1)]"
                            >
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all text-[9px] font-black text-primary bg-background/80 backdrop-blur-sm px-1.5 py-0.5 rounded-md border border-primary/20">
                                {height}%
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-white/30 px-6 mt-3">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                            <span key={`${day}-${i}`} className="w-full text-center">{day[0]}</span>
                          ))}
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 }}
                        className="p-5 rounded-[1.5rem] bg-primary/[0.03] border border-primary/10 relative overflow-hidden group/box shadow-inner"
                      >
                        <div className="flex items-center gap-2 mb-2 relative z-10">
                          <div className="px-2 py-0.5 rounded-full bg-primary/20 text-[8px] font-black text-primary uppercase tracking-wider">Insight</div>
                          <div className="h-px flex-1 bg-primary/5" />
                        </div>
                        <p className="text-[11px] font-semibold text-white italic leading-relaxed relative z-10">
                          "Your weekend mood showed a 15% increase in resilience. Keep up the consistent mindfulness practice."
                        </p>
                      </motion.div>

                      <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Session ID: #MB-0492</div>
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 2.5 + (i * 0.1) }}
                              className="h-6 w-6 rounded-full border-2 border-white bg-primary/20"
                            />
                          ))}
                        </div>
                      </div>
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </main>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-10 right-10 z-50 md:flex hidden"
      >
        <div className="group relative">
          <button className="h-16 w-16 rounded-full glass bg-card shadow-premium border border-foreground/5 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300">
            <MessageCircle className="h-7 w-7 text-primary" />
          </button>
          <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-foreground text-background px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl">
              Talk to someone now
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 pt-24 pb-12 px-6 md:px-24 bg-background/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <Logo size="md" />
              <p className="text-muted-foreground font-medium max-w-sm leading-relaxed">
                Ghana's first context-aware support system designed to navigate the complexities of university life with precision and empathy.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-foreground">Platform</h4>
              <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Mission</Link></li>
                <li><Link href="/resources" className="hover:text-primary transition-colors">Resources</Link></li>
                <li><Link href="/support" className="hover:text-primary transition-colors">Support Center</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-foreground">Legal</h4>
              <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">
              © 2026 MindBridge. Ghanaian Excellence.
            </div>
            <div className="flex gap-6">
              {/* Social Placeholders */}
              {[1, 2, 3].map(i => (
                <div key={i} className="h-8 w-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer">
                  <div className="h-3 w-3 rounded-full bg-primary/40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
