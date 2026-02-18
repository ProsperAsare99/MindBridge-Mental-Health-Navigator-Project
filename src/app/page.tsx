import Link from "next/link";
import { Button } from "@/components/ui/button";
import ShaderBackground from "@/components/shader-background";
import { ArrowRight, LogIn, UserPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans text-white selection:bg-indigo-300 selection:text-indigo-900">
      {/* Background Shader */}
      <ShaderBackground />

      {/* Navigation - Minimal and Floating */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-indigo-500/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-indigo-400" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-white/90">MindBridge</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
          <Link href="#" className="hover:text-white transition-colors">About</Link>
          <Link href="#" className="hover:text-white transition-colors">Resources</Link>
          <Link href="#" className="hover:text-white transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white border-white/20">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-white text-indigo-900 hover:bg-indigo-50 border-none shadow-lg shadow-indigo-900/20">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl space-y-8 animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-10">

          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-indigo-200 backdrop-blur-md mx-auto mb-4">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
            Context-Aware Mental Health Support
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-sm">
            Your Mind,<br />
            <span className="text-indigo-200">Understood.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-indigo-100/80 leading-relaxed">
            A navigator for tertiary students in Ghana. Get personalized help, track your mood,
            and access awareness resources tailored to your academic life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-500 text-white border-none ring-1 ring-white/20 shadow-xl shadow-indigo-900/30 transition-all hover:scale-105">
                <LogIn className="mr-2 h-5 w-5" />
                Sign In
              </Button>
            </Link>
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all hover:scale-105">
                <UserPlus className="mr-2 h-5 w-5" />
                Create Account
              </Button>
            </Link>
          </div>

          <div className="pt-12 flex items-center justify-center gap-8 text-white/40 text-sm">
            <div className="flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Confidential</div>
            <div className="flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Context-Aware</div>
            <div className="flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Always Available</div>
          </div>
        </div>
      </main>
    </div>
  );
}
