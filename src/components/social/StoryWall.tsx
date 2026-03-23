'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Quote, PenLine, Heart, Filter, ChevronDown, CheckCircle2, ShieldCheck } from 'lucide-react';
import api from '@/lib/axios-config';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Story {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
    author: {
        displayName: string;
    };
}

const CATEGORIES = [
    { label: 'All Stories', value: 'ALL' },
    { label: 'Academic Stress', value: 'ACADEMIC_STRESS' },
    { label: 'Anxiety', value: 'ANXIETY' },
    { label: 'Depression', value: 'DEPRESSION' },
    { label: 'Loneliness', value: 'LONELINESS' },
    { label: 'Family Pressure', value: 'FAMILY_PRESSURE' },
];

export function StoryWall() {
    const [stories, setStories] = useState<Story[]>([]);
    const [filter, setFilter] = useState('ALL');
    const [isSharing, setIsSharing] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // New Story Form
    const [newStory, setNewStory] = useState({ title: '', content: '', category: 'ACADEMIC_STRESS' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            const res = await api.get('/social/stories');
            setStories(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch stories:', error);
            setLoading(false);
        }
    };

    const handleShareStory = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await api.post('/social/stories', newStory);
            setStatus('success');
            setTimeout(() => {
                setIsSharing(false);
                setStatus('idle');
                setNewStory({ title: '', content: '', category: 'ACADEMIC_STRESS' });
                fetchStories();
            }, 2000);
        } catch (error) {
            console.error('Failed to share story:', error);
            setStatus('idle');
        }
    };

    const filteredStories = filter === 'ALL' 
        ? stories 
        : stories.filter(s => s.category === filter);

    if (loading) return <div className="h-40 flex items-center justify-center">Loading stories...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-primary" />
                        The Story Wall
                    </h2>
                    <p className="text-muted-foreground font-medium mt-1">Real stories of resilience, shared anonymously by students like you.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <select 
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="appearance-none bg-background border border-primary/20 rounded-full px-6 py-2.5 pr-10 text-sm font-bold focus:ring-2 ring-primary/20 outline-none cursor-pointer"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                    </div>
                    <Button 
                        onClick={() => setIsSharing(true)}
                        className="rounded-full bg-primary hover:bg-primary/90 text-white font-black px-6 gap-2 h-11"
                    >
                        <PenLine className="w-4 h-4" />
                        Share Your Story
                    </Button>
                </div>
            </div>

            {isSharing && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Quote className="w-32 h-32 rotate-12" />
                    </div>

                    <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                        Share Your Reflection
                    </h3>
                    
                    <form onSubmit={handleShareStory} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Headline</label>
                                <input 
                                    className="w-full bg-white/50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-2 ring-primary/30"
                                    placeholder="e.g., How I managed exam anxiety"
                                    value={newStory.title}
                                    onChange={e => setNewStory({...newStory, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Focus Area</label>
                                <select 
                                    className="w-full bg-white/50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-2 ring-primary/30 cursor-pointer"
                                    value={newStory.category}
                                    onChange={e => setNewStory({...newStory, category: e.target.value})}
                                >
                                    {CATEGORIES.filter(c => c.value !== 'ALL').map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Your Story</label>
                            <textarea 
                                className="w-full h-40 bg-white/50 border-none rounded-3xl px-6 py-5 text-sm leading-relaxed focus:ring-2 ring-primary/30 resize-none placeholder:text-muted-foreground"
                                placeholder="Your words might be exactly what someone else needs to hear today..."
                                value={newStory.content}
                                onChange={e => setNewStory({...newStory, content: e.target.value})}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                                Your contribution is anonymous and secure.
                            </p>
                            <div className="flex gap-3">
                                <Button type="button" variant="ghost" className="font-bold h-11 px-6 rounded-full" onClick={() => setIsSharing(false)}>
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    disabled={status !== 'idle'}
                                    className="bg-primary hover:bg-primary/90 text-white font-black h-11 px-10 rounded-full shadow-lg shadow-primary/20"
                                >
                                    {status === 'submitting' ? 'Sharing...' : status === 'success' ? 'Story Shared!' : 'Publish Story'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            )}

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                <AnimatePresence>
                    {filteredStories.map((story) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            className="break-inside-avoid"
                        >
                            <Card className="p-8 border-primary/5 bg-card hover:border-primary/20 transition-all rounded-[1.5rem] relative group cursor-default shadow-sm hover:shadow-md">
                                <Quote className="absolute top-6 right-6 w-10 h-10 opacity-5 text-primary group-hover:opacity-10 transition-opacity" />
                                
                                <Badge className="mb-4 bg-primary/5 text-primary border-primary/10 uppercase text-[9px] tracking-widest font-black py-0.5">
                                    {story.category.replace('_', ' ')}
                                </Badge>

                                <h3 className="text-xl font-black mb-4 leading-tight group-hover:text-primary transition-colors">
                                    {story.title}
                                </h3>

                                <div className="relative">
                                    <p className="text-sm leading-relaxed text-muted-foreground font-medium line-clamp-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {story.content}
                                    </p>
                                    <div className="h-12 w-full absolute bottom-0 bg-gradient-to-t from-card to-transparent pointer-events-none group-hover:opacity-0 transition-opacity" />
                                </div>

                                <div className="mt-8 flex items-center justify-between pt-4 border-t border-primary/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[8px]">
                                            AP
                                        </div>
                                        <span className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-wider">
                                            Anonymous Peer
                                        </span>
                                    </div>
                                    <span className="text-[9px] font-bold text-muted-foreground/40 italic">
                                        {new Date(story.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredStories.length === 0 && !loading && (
                <div className="py-20 text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-10 text-primary" />
                    <h3 className="text-xl font-bold opacity-50">No stories yet in this category.</h3>
                    <p className="text-muted-foreground mt-2">Be the first to share your journey of resilience.</p>
                </div>
            )}
        </div>
    );
}
