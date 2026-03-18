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

      {/* Hero Section */}
      <main className="relative z-10 min-h-screen">
        {/* Top Visual Banner (Tiles BG) */}
        <div className="relative h-[80vh] overflow-hidden rounded-b-[4rem] md:rounded-b-[6rem] border-b border-primary/20 shadow-2xl">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url("/images/hero-background-tiles.jpg")' }}
            />
            {/* Multi-layered dark overlay for depth and focus */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-background/40" />
            <div className="absolute inset-0 bg-black/10" /> 
          </motion.div>
        </div>

        {/* Actionable Content Section */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-12 pb-20 text-center max-w-7xl mx-auto space-y-12">
          <div className="space-y-12 flex flex-col items-center py-8 px-8">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10 space-y-4"
            >
              <ParallaxSection speed={0.15}>
                <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl md:text-9xl text-foreground leading-[1.05]">
                  Your Mind,<br />
                  <span className="text-primary">Understood.</span>
                </h1>
              </ParallaxSection>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="inline-flex items-center gap-3.5 rounded-full border border-white/10 bg-[#0a0a0b] px-10 py-4 text-xs font-black uppercase tracking-[0.35em] text-primary shadow-2xl shadow-primary/5 hover:border-primary/30 transition-all duration-500 group"
            >
              <Activity className="h-4 w-4 animate-pulse text-primary group-hover:scale-110 transition-transform" />
              Designed for Academic Well-being
            </motion.div>
  
            <ParallaxSection speed={0.1}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="max-w-3xl mx-auto text-xl md:text-2xl font-semibold text-foreground/80 leading-relaxed"
              >
                Navigate the complexities of university life with <span className="text-primary font-bold">Ghana's first Context-Aware Support System.</span> <span className="text-foreground font-extrabold pb-0.5 border-b-2 border-primary/60">Simple tools, deeper understanding.</span>
              </motion.p>
            </ParallaxSection>
  
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="h-16 px-10 rounded-full text-lg font-bold shadow-2xl bg-primary text-[#0f0f10] hover:bg-primary/90">
                  Join MindBridge
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/resources" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="h-16 px-10 rounded-full text-lg font-bold border-2 border-primary/30 bg-transparent text-foreground hover:bg-primary/5 transition-all backdrop-blur-md">
                  View Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 3D Interactive Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full max-w-7xl mx-auto mt-16 px-4"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">Interactive <span className="text-primary">Experience</span></h2>
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
                },
                {
                  title: "Visual Mood Insights",
                  description: "Deep-dive into your emotional patterns with graphical mood trends and data-driven assessments.",
                  icon: Sparkles
                }
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  className="flex gap-4 p-6 rounded-[2rem] glass border border-border shadow-premium hover:border-primary/20 transition-all group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <Card3D
                hoverScale={1.05}
                hoverLift={0.5}
                color="transparent"
                hoverColor="transparent"
                className="h-[550px]"
                content={
                  <div className="w-[320px] p-8 text-left glass backdrop-blur-xl rounded-[2.5rem] border border-border/50 shadow-premium">
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
                        <div className="text-sm font-bold text-foreground opacity-90">Weekly Pulse</div>
                      </div>
                    </div>

                    {/* Graphical Mood Trends with Grid and Axis */}
                    <div className="mb-10 relative">
                      {/* Y-Axis Labels & Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pr-2 py-1">
                        {[1, 2, 3].map((_, i) => (
                          <div key={i} className="flex items-center gap-3 w-full">
                            <span className="text-[8px] font-black text-foreground/20 w-4 text-right">
                              {i === 0 ? 'H' : i === 1 ? 'A' : 'L'}
                            </span>
                            <div className="h-px flex-1 border-t border-dotted border-foreground/10" />
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

                      <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-foreground/30 px-6 mt-3">
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
                      <p className="text-[11px] font-semibold text-foreground italic leading-relaxed relative z-10">
                        "Your weekend mood showed a 15% increase in resilience. Keep up the consistent mindfulness practice."
                      </p>
                    </motion.div>

                    <div className="mt-8 pt-6 border-t border-foreground/5 flex justify-between items-center">
                      <div className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Session ID: #MB-0492</div>
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
                }
              />
            </div>
          </div>
        </motion.div>
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
