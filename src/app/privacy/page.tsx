"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  ArrowLeft,
  ChevronRight
} from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data Collection",
      content: "We only collect information that is strictly necessary to provide our core services. This includes your name, email, and institution to personalize your experience.",
      icon: Eye
    },
    {
      title: "How We Use Data",
      content: "Your data is used exclusively to train our context-aware AI on general student trends—never to identify you individually. We never sell your personal information.",
      icon: FileText
    },
    {
      title: "Encryption & Security",
      content: "Every message and profile update is encrypted using industry-standard protocols. Your data is stored in secured, isolated environments.",
      icon: Lock
    }
  ];

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 overflow-x-hidden">
      {/* Background Accents */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-secondary/10 blur-[120px]" />
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

      <main className="relative z-10 pt-40 pb-24 px-6 md:px-24 max-w-5xl mx-auto">
        {/* Header */}
        <section className="mb-20 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5" />
              Privacy First
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Your Privacy, <br />
              <span className="text-primary/80">Protected.</span>
            </h1>
            <p className="text-xl font-medium text-muted-foreground max-w-2xl leading-relaxed">
              At MindBridge, we believe that mental health support must be built on a foundation of absolute trust and transparency.
            </p>
          </motion.div>
        </section>

        {/* Policy Sections */}
        <section className="space-y-8 mb-24">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 md:p-12 rounded-[2.5rem] glass border border-border/50 shadow-premium group hover:border-primary/20 transition-all flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <section.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold flex items-center gap-3">
                  {section.title}
                  <ChevronRight className="h-5 w-5 text-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Trust Badge */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 rounded-[3rem] bg-primary/5 border border-primary/20 border-dashed inline-block"
          >
            <div className="flex flex-col items-center gap-4">
              <ShieldCheck className="h-12 w-12 text-primary animate-pulse" />
              <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-widest text-primary">Certified Student Support</p>
                <p className="text-muted-foreground font-semibold">Ghanaian Data Protection Compliant</p>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-12 px-6 md:px-24 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo size="sm" />
          <div className="flex gap-8 text-sm font-bold text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/support" className="hover:text-primary transition-colors">Support</Link>
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">
            © 2026 MindBridge. Ghanaian Excellence.
          </div>
        </div>
      </footer>
    </div>
  );
}
