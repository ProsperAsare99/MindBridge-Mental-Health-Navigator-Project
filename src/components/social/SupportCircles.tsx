'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageSquare, Heart, Shield, ChevronRight, Lock, Plus, Info } from 'lucide-react';
import api from '@/lib/axios-config';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Circle {
    id: string;
    name: string;
    description: string | null;
    category: string;
    _count: {
        members: number;
        posts: number;
    };
}

interface Post {
    id: string;
    content: string;
    isAnonymous: boolean;
    createdAt: string;
    author: {
        displayName: string;
        image: string | null;
    };
    _count: {
        encouragements: number;
    };
}

export function SupportCircles() {
    const [circles, setCircles] = useState<Circle[]>([]);
    const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        fetchCircles();
    }, []);

    const fetchCircles = async () => {
        try {
            const res = await api.get('/social/circles');
            setCircles(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch circles:', error);
            setLoading(false);
        }
    };

    const fetchPosts = async (circleId: string) => {
        try {
            const res = await api.get(`/social/circles/${circleId}/posts`);
            setPosts(res.data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    const handleJoinCircle = async (circleId: string) => {
        try {
            await api.post(`/social/circles/${circleId}/join`);
            // Refresh to update counts or show joined state
            fetchCircles();
        } catch (error) {
            console.error('Failed to join circle:', error);
        }
    };

    const handleCreatePost = async () => {
        if (!selectedCircle || !newPost.trim()) return;
        setIsPosting(true);
        try {
            await api.post(`/social/circles/${selectedCircle.id}/posts`, {
                content: newPost,
                isAnonymous: true
            });
            setNewPost('');
            fetchPosts(selectedCircle.id);
        } catch (error) {
            console.error('Failed to create post:', error);
        } finally {
            setIsPosting(false);
        }
    };

    if (loading) return <div className="h-40 flex items-center justify-center">Loading circles...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
                        <Users className="w-6 h-6 text-primary" />
                        Support Circles
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium">Safe, moderated spaces for peer connection.</p>
                </div>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 gap-1 px-3 py-1">
                    <Shield className="w-3 h-3" />
                    Secure & Anonymous
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {circles.map((circle) => (
                        <motion.div
                            key={circle.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <Card className={cn(
                                "group p-6 h-full border-primary/10 bg-card hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden",
                                selectedCircle?.id === circle.id && "ring-2 ring-primary border-transparent"
                            )}
                            onClick={() => {
                                setSelectedCircle(circle);
                                fetchPosts(circle.id);
                            }}>
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Users className="w-20 h-20" />
                                </div>
                                
                                <Badge className="mb-4 bg-primary/10 text-primary border-none uppercase text-[10px] tracking-widest font-black">
                                    {circle.category.replace('_', ' ')}
                                </Badge>
                                
                                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{circle.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-6 min-h-[40px]">
                                    {circle.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-primary/5">
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                                            <Users className="w-3.5 h-3.5" />
                                            {circle._count.members}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                                            <MessageSquare className="w-3.5 h-3.5" />
                                            {circle._count.posts}
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-primary/10 hover:text-primary">
                                        <ChevronRight className="w-5 h-5" />
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {selectedCircle && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-primary/10"
                >
                    {/* Circle Interaction Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
                            <h4 className="font-black text-sm uppercase tracking-wider text-primary">Your Safe Space</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                You are viewing <span className="font-bold text-foreground">{selectedCircle.name}</span>. 
                                Everything shared here is anonymous by default. Supportive interactions are encouraged!
                            </p>
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold" onClick={() => handleJoinCircle(selectedCircle.id)}>
                                Join Circle
                            </Button>
                        </div>

                        <div className="p-6 rounded-2xl border border-primary/10 space-y-4 bg-white/50 backdrop-blur-sm">
                            <h4 className="font-black text-sm uppercase tracking-wider">Guidelines</h4>
                            <ul className="space-y-3">
                                {[
                                    'Respect privacy & anonymity',
                                    'Offer kindness & encouragement',
                                    'No professional medical advice',
                                    'Report concerning behavior'
                                ].map((rule, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                        <div className="w-1 h-1 rounded-full bg-primary mt-1.5" />
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Posts Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Create Post */}
                        <Card className="p-6 border-primary/20 shadow-sm">
                            <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                                <Plus className="w-4 h-4 text-primary" />
                                Share an anonymous reflection
                            </h4>
                            <textarea
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="What's on your mind? Pay it forward with a supportive thought..."
                                className="w-full h-24 p-4 rounded-xl bg-muted/30 border-none focus:ring-1 ring-primary/30 resize-none text-sm placeholder:text-muted-foreground"
                            />
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                                    <Lock className="w-3 h-3" />
                                    Posting as Anonymous Peer
                                </span>
                                <Button 
                                    className="px-6 font-bold" 
                                    size="sm" 
                                    disabled={isPosting || !newPost.trim()}
                                    onClick={handleCreatePost}
                                >
                                    {isPosting ? 'Sharing...' : 'Post Message'}
                                </Button>
                            </div>
                        </Card>

                        {/* Feed */}
                        <div className="space-y-4">
                            {posts.length === 0 ? (
                                <div className="p-12 text-center text-muted-foreground bg-muted/10 rounded-3xl border-2 border-dashed border-primary/5">
                                    <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-20" />
                                    <p className="text-sm font-medium">No posts here yet. Be the first to share!</p>
                                </div>
                            ) : (
                                posts.map((post) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <Card className="p-6 border-primary/5 hover:border-primary/20 transition-all bg-white/80">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                                                        {post.author.displayName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h5 className="text-xs font-black">{post.author.displayName}</h5>
                                                        <p className="text-[10px] text-muted-foreground font-bold">{new Date(post.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-primary hover:bg-primary/10 rounded-full font-bold">
                                                    <Heart className="w-4 h-4" />
                                                    <span className="text-xs">{post._count.encouragements}</span>
                                                </Button>
                                            </div>
                                            <p className="text-sm leading-relaxed text-foreground/80">
                                                {post.content}
                                            </p>
                                        </Card>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

// Helper utility (if locally defined for missing imports)
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
