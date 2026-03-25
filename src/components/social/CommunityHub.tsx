'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, UserPlus, Heart, Zap, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { SupportCircles } from './SupportCircles';
import { StoryWall } from './StoryWall';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Tab = 'circles' | 'stories' | 'mentorship';

export default function CommunityHub() {
    const [activeTab, setActiveTab] = useState<Tab>('circles');

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
            {/* Hero Header */}
            <div className="relative p-10 rounded-[3rem] bg-gradient-to-br from-primary via-primary/80 to-primary/60 text-white overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Users className="w-64 h-64 -mr-20 -mt-20" />
                </div>
                
                <div className="relative z-10 space-y-6 max-w-2xl">
                    <Badge className="bg-white/20 text-white border-none backdrop-blur-md px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
                        Community & Peer Support
                    </Badge>
                    <h1 className="text-5xl font-black tracking-tight leading-none">
                        You're not navigating this <span className="text-white/60">alone</span>.
                    </h1>
                    <p className="text-lg font-medium text-white/80 leading-relaxed">
                        Connect with peers who understand your journey. Share stories, join support circles, and find mentorship in a safe, anonymous space.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-primary/20 flex items-center justify-center font-black text-xs">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                        <div className="text-sm font-bold flex flex-col justify-center">
                            <span>Join 500+ students</span>
                            <span className="text-white/60">supporting each other today</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-muted/30 rounded-full border border-primary/5 mx-auto max-w-2xl sticky top-6 z-50 backdrop-blur-xl shadow-lg">
                <TabButton 
                    active={activeTab === 'circles'} 
                    onClick={() => setActiveTab('circles')}
                    icon={<Users className="w-4 h-4" />}
                    label="Support Circles"
                />
                <TabButton 
                    active={activeTab === 'stories'} 
                    onClick={() => setActiveTab('stories')}
                    icon={<BookOpen className="w-4 h-4" />}
                    label="Story Wall"
                />
                <TabButton 
                    active={activeTab === 'mentorship'} 
                    onClick={() => setActiveTab('mentorship')}
                    icon={<UserPlus className="w-4 h-4" />}
                    label="Mentorship"
                />
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                >
                    {activeTab === 'circles' && <SupportCircles />}
                    {activeTab === 'stories' && <StoryWall />}
                    {activeTab === 'mentorship' && <MentorshipModule />}
                </motion.div>
            </AnimatePresence>

            {/* Quick Actions Footer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-primary/10">
                <QuickCard 
                    icon={<Heart className="w-5 h-5 text-red-400" />}
                    title="Send Encouragement"
                    desc="Drop a random supportive message to someone who might need it today."
                    action="Send Note"
                />
                <QuickCard 
                    icon={<Zap className="w-5 h-5 text-yellow-500" />}
                    title="Become a Mentor"
                    desc="Have you overcome a challenge? Guide others through similar experiences."
                    action="Apply Now"
                    variant="primary"
                />
                <QuickCard 
                    icon={<ShieldCheck className="w-5 h-5 text-green-500" />}
                    title="Moderation Center"
                    desc="See how we keep our space safe and supportive for everyone."
                    action="Learn More"
                />
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-black transition-all",
                active ? "bg-primary text-white shadow-md shadow-primary/10" : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
            )}
        >
            {icon}
            {label}
        </button>
    );
}

function QuickCard({ icon, title, desc, action, variant }: { icon: React.ReactNode, title: string, desc: string, action: string, variant?: 'primary' }) {
    return (
        <Card className={cn(
            "p-6 border-primary/5 space-y-4 hover:border-primary/20 hover:shadow-xl transition-all group",
            variant === 'primary' && "bg-primary/5 border-primary/20"
        )}>
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="space-y-1">
                <h4 className="font-bold text-base">{title}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
            <Button variant="ghost" className="text-primary font-black text-xs uppercase tracking-widest p-0 h-auto hover:bg-transparent hover:translate-x-1 transition-transform">
                {action} →
            </Button>
        </Card>
    );
}

function MentorshipModule() {
    return (
        <div className="max-w-4xl mx-auto space-y-10 py-10">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                    <UserPlus className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black tracking-tight">Connect with a Mentor</h2>
                <p className="text-muted-foreground font-medium">
                    Mentorship connects students who have navigated specific challenges with those currently facing them. It's confidential, anonymous, and supportive.
                </p>
                <div className="flex items-center justify-center gap-4 pt-4">
                    <Button className="bg-primary hover:bg-primary/90 text-white px-8 h-12 rounded-full font-black shadow-lg shadow-primary/20">
                        Find a Mentor
                    </Button>
                    <Button variant="outline" className="px-8 h-12 rounded-full font-black border-primary/20 text-primary">
                        Become a Mentor
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
                <Card className="p-8 border-primary/5 bg-card space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h3 className="font-black text-lg">Peer Mentorship</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Matches are made based on shared experiences like "International Student Transition" or "Final Year Project Stress".
                    </p>
                    <ul className="space-y-3">
                        {['1-on-1 Confidential Chat', 'Goal-setting Support', 'Experience Sharing'].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                <MessageCircle className="w-4 h-4 text-primary" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card className="p-8 border-primary/5 bg-gradient-to-br from-primary/5 to-transparent space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="font-black text-lg">Safety First</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        All mentors are verified students who undergo training to provide supportive, non-clinical guidance.
                    </p>
                    <div className="flex items-center gap-2 pt-4">
                        <Badge className="bg-green-500/10 text-green-600 border-none font-black text-[10px] uppercase">Identity Verified</Badge>
                        <Badge className="bg-blue-500/10 text-blue-600 border-none font-black text-[10px] uppercase">Safety Trained</Badge>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
