"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  MessageSquare, 
  Mail, 
  LifeBuoy, 
  ArrowLeft,
  Search,
  BookOpen,
  Settings,
  ShieldAlert
} from "lucide-react";

export default function SupportPage() {
  const categories = [
    {
      title: "Getting Started",
      description: "Learn how to set up your profile and start your well-being journey.",
      icon: BookOpen,
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "Technical Support",
      description: "Troubleshoot app issues, account access, and synchronization.",
      icon: Settings,
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      title: "Crisis Resources",
      description: "Immediate help and contacts for emergency mental health situations.",
      icon: ShieldAlert,
      color: "bg-red-500/10 text-red-500"
    }
  ];

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 overflow-x-hidden">
      {/* Background Accents */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] h-[50%] w-[50%] rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-24 backdrop-blur-md bg-background/50 border-b border-border/50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5"
        >
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo size="md" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/">
            <Button variant="ghost" size="sm" className="font-bold flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </nav>

      <main className="relative z-10 pt-40 pb-24 px-6 md:px-24">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary backdrop-blur-md">
              <HelpCircle className="h-3.5 w-3.5" />
              Support Center
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight pt-4">
              We're Here <br />
              <span className="text-secondary">For You.</span>
            </h1>
            <p className="text-xl font-medium text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Find answers to your questions, explore resources, or reach out to our team for personalized assistance.
            </p>

            {/* Mock Search Bar */}
            <div className="max-w-xl mx-auto pt-8">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="How can we help?" 
                  className="w-full h-16 pl-14 pr-6 rounded-3xl glass border border-border/50 outline-none focus:border-primary/50 transition-all font-medium text-lg shadow-premium"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Categories Grid */}
        <section className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-32 pt-20">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2.5rem] glass border border-border/50 shadow-premium group hover:border-primary/20 transition-all cursor-pointer"
            >
              <div className={`h-14 w-14 rounded-2xl ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <cat.icon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-extrabold mb-4">{cat.title}</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">{cat.description}</p>
            </motion.div>
          ))}
        </section>

        {/* Contact Strip */}
        <section className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] glass border border-border/50 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] pointer-events-none" />
            <div className="space-y-6 relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Still Need Help?</h2>
              <p className="text-lg text-muted-foreground font-medium max-w-md">
                Our support team is available 24/7. Send us a message and we'll get back to you as soon as possible.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 w-full md:w-auto relative z-10">
              <Button size="lg" className="h-16 px-10 rounded-full text-lg font-extrabold gap-3 w-full shadow-xl shadow-primary/20">
                <MessageSquare className="h-5 w-5" />
                Live Chat
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 rounded-full text-lg font-extrabold gap-3 w-full border-2">
                <Mail className="h-5 w-5" />
                Email Support
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-12 px-6 md:px-24 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo size="sm" />
          <div className="flex gap-8 text-sm font-bold text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">
            © 2026 MindBridge. Ghanaian Excellence.
          </div>
        </div>
      </footer>
    </div>
  );
}
