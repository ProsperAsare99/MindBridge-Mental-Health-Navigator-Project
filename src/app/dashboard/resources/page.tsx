"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
    Search,
    BookOpen,
    Brain,
    Heart,
    Sparkles,
    Moon,
    Users,
    Lightbulb,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Play,
    Smartphone,
    GraduationCap,
    Leaf,
    Timer,
    PenLine,
    Smile,
    Wind,
    Dumbbell,
    Download,
    FileText,
} from "lucide-react";

// ─── Categories ───
const CATEGORIES = ["All", "Self-Help", "Academic Stress", "Mindfulness", "Understanding Mental Health"] as const;
type Category = (typeof CATEGORIES)[number];

// ─── Featured Articles ───
const ARTICLES = [
    {
        title: "Understanding Anxiety & Depression",
        description:
            "Learn to recognise the signs of anxiety and depression, understand how they affect students, and discover evidence-based strategies to manage them effectively.",
        icon: Brain,
        category: "Understanding Mental Health" as Category,
        readTime: "7 min read",
        color: "from-purple-500/20 to-indigo-600/20",
        borderColor: "border-purple-400/20",
        content: [
            "Anxiety and depression are among the most common mental health challenges faced by university students worldwide. In Ghana, studies suggest up to 40% of tertiary students experience significant anxiety symptoms during their academic journey.",
            "Common signs include persistent worry, difficulty concentrating, changes in sleep patterns, loss of interest in activities you once enjoyed, and feelings of hopelessness. These symptoms can significantly impact academic performance and social relationships.",
            "Evidence-based strategies include Cognitive Behavioural Therapy (CBT) techniques, regular physical activity, maintaining social connections, practicing mindfulness, and seeking professional help when symptoms persist for more than two weeks.",
        ],
    },
    {
        title: "Managing Exam Stress",
        description:
            "Practical strategies to handle the pressure of exams, assignments, and academic expectations without burning out.",
        icon: GraduationCap,
        category: "Academic Stress" as Category,
        readTime: "5 min read",
        color: "from-amber-500/20 to-orange-600/20",
        borderColor: "border-amber-400/20",
        content: [
            "Exam stress is a universal experience for students, but when left unmanaged it can lead to anxiety, sleep disruption, and poor performance — the opposite of what you're working toward.",
            "Start by breaking your revision into smaller, manageable chunks. Use the Pomodoro Technique (25 minutes focused study, 5-minute breaks). Create a realistic study timetable that includes rest days.",
            "On exam day, arrive early, practice deep breathing, and read all questions before starting. Remember: one exam does not define your worth or your future.",
        ],
    },
    {
        title: "Building Healthy Sleep Habits",
        description:
            "Sleep is the foundation of mental health. Learn how to improve your sleep quality even with a busy student schedule.",
        icon: Moon,
        category: "Self-Help" as Category,
        readTime: "4 min read",
        color: "from-blue-500/20 to-cyan-600/20",
        borderColor: "border-blue-400/20",
        content: [
            "Research shows that university students who sleep fewer than 6 hours a night are significantly more likely to experience depression and anxiety. Quality sleep is not a luxury — it's essential.",
            "Create a consistent sleep schedule, even on weekends. Avoid screens 30 minutes before bed. Keep your room cool and dark. Limit caffeine after 2 PM.",
            "If racing thoughts keep you awake, try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, exhale for 8. Write down worries before bed to 'park' them for tomorrow.",
        ],
    },
    {
        title: "The Power of Social Connection",
        description:
            "Human connection is a powerful buffer against stress. Learn why isolation worsens mental health and how to build your support network.",
        icon: Users,
        category: "Understanding Mental Health" as Category,
        readTime: "5 min read",
        color: "from-teal-500/20 to-emerald-600/20",
        borderColor: "border-teal-400/20",
        content: [
            "Loneliness and social isolation are significant risk factors for depression, particularly among students who are away from home for the first time. A strong social network acts as a protective buffer.",
            "You don't need a large friend group — even one or two trusted connections can make a significant difference. Join a study group, a campus club, or a religious/community group.",
            "If you find it hard to reach out, start small. A simple greeting to a course mate, sitting with someone at the dining hall, or sending a message to a friend from home can be the first step.",
        ],
    },
    {
        title: "Mindfulness for Beginners",
        description:
            "A simple, practical introduction to mindfulness meditation — no experience needed. Just 5 minutes a day can reduce stress.",
        icon: Leaf,
        category: "Mindfulness" as Category,
        readTime: "6 min read",
        color: "from-green-500/20 to-lime-600/20",
        borderColor: "border-green-400/20",
        content: [
            "Mindfulness is the practice of paying attention to the present moment without judgement. Research consistently shows it reduces stress, anxiety, and depressive symptoms.",
            "Start with just 5 minutes daily: sit comfortably, close your eyes, and focus on your breath. When your mind wanders (it will!), gently bring your attention back. That 'bringing back' is the exercise.",
            "You can practice mindfulness anywhere — while eating (notice textures and flavours), walking to class (feel your feet on the ground), or even during lectures (fully focus on the speaker).",
        ],
    },
    {
        title: "Understanding Your Emotions",
        description:
            "Emotional literacy is a skill. Learn to name, understand, and work with your feelings rather than being overwhelmed by them.",
        icon: Heart,
        category: "Self-Help" as Category,
        readTime: "5 min read",
        color: "from-rose-500/20 to-pink-600/20",
        borderColor: "border-rose-400/20",
        content: [
            "Many of us were never taught how to identify and process our emotions. We might say 'I feel bad' without knowing whether that's sadness, frustration, disappointment, or loneliness.",
            "Try the 'Name it to Tame it' technique: when you notice a strong feeling, pause and try to label it specifically. Research shows this simple act activates the prefrontal cortex and reduces emotional intensity.",
            "All emotions are valid and carry information. Anger might signal a boundary has been crossed. Anxiety might signal something matters to you. Sadness might signal a loss that needs to be grieved.",
        ],
    },
];

// ─── Self-Help Toolkit ───
const SELF_HELP_TOOLS = [
    {
        title: "Progressive Muscle Relaxation",
        icon: Dumbbell,
        description: "A step-by-step body relaxation technique to release physical tension caused by stress.",
        steps: [
            "Find a quiet, comfortable place. Sit or lie down.",
            "Start with your feet — tense the muscles tightly for 5 seconds.",
            "Release and notice the contrast between tension and relaxation for 15 seconds.",
            "Move upward: calves → thighs → abdomen → chest → hands → arms → shoulders → face.",
            "Breathe slowly and deeply throughout. After completing all muscle groups, rest for a few minutes.",
        ],
    },
    {
        title: "Journaling Prompts for Mental Clarity",
        icon: PenLine,
        description: "Writing helps untangle thoughts. Use these prompts when your mind feels cluttered.",
        steps: [
            "What are three things I'm grateful for today? (even small things)",
            "What emotion am I feeling right now, and where do I feel it in my body?",
            "What is one thing I accomplished this week that I'm proud of?",
            "If I could tell my younger self one thing, what would it be?",
            "What is one boundary I need to set this week, and with whom?",
        ],
    },
    {
        title: "The Pomodoro Study Technique",
        icon: Timer,
        description: "A time management method that fights procrastination and prevents burnout.",
        steps: [
            "Choose one task to focus on (e.g., one chapter, one assignment section).",
            "Set a timer for 25 minutes. Work with full focus — no phone, no distractions.",
            "When the timer rings, take a 5-minute break. Stand up, stretch, drink water.",
            "After 4 Pomodoros (2 hours), take a longer break of 15–30 minutes.",
            "Track your Pomodoros to see how much focused work you actually complete each day.",
        ],
    },
    {
        title: "Daily Gratitude Practice",
        icon: Smile,
        description: "Gratitude rewires the brain for positivity. A 2-minute daily habit that shifts your perspective.",
        steps: [
            "Each evening, write down 3 things you're grateful for. Be specific — not just 'my friends' but 'Kofi checking on me after my tough exam'.",
            "Include at least one thing about yourself you appreciate (e.g., 'I showed up to lecture even though I was tired').",
            "Once a week, express gratitude to someone — a text, a call, or in person. This strengthens relationships and well-being.",
            "On hard days, look back at past entries for a reminder that good things exist alongside the difficult ones.",
        ],
    },
    {
        title: "Box Breathing for Calm",
        icon: Wind,
        description: "A simple breathing technique used by athletes and military to regain calm under pressure.",
        steps: [
            "Sit upright and exhale all the air from your lungs.",
            "Breathe IN slowly through your nose for 4 seconds.",
            "HOLD your breath for 4 seconds.",
            "Breathe OUT slowly through your mouth for 4 seconds.",
            "HOLD your breath (empty lungs) for 4 seconds.",
            "Repeat for 4 cycles. You should feel noticeably calmer.",
        ],
    },
];

// ─── Recommended Apps & Websites ───
const RECOMMENDED_APPS = [
    {
        name: "Headspace",
        description: "Guided meditation and mindfulness exercises. Free basics plan available for students.",
        url: "https://www.headspace.com/",
        icon: Sparkles,
        tag: "Meditation",
    },
    {
        name: "7 Cups",
        description: "Free online chat with trained listeners for emotional support. Available 24/7 worldwide.",
        url: "https://www.7cups.com/",
        icon: Heart,
        tag: "Chat Support",
    },
    {
        name: "Calm",
        description: "Sleep stories, breathing exercises, and relaxation music. Great for improving sleep quality.",
        url: "https://www.calm.com/",
        icon: Moon,
        tag: "Sleep & Relaxation",
    },
    {
        name: "Woebot",
        description: "An AI-powered chatbot that uses CBT techniques to help you manage your mood.",
        url: "https://woebothealth.com/",
        icon: Brain,
        tag: "AI Therapy",
    },
    {
        name: "MindShift CBT",
        description: "Designed for young adults. Tools for dealing with anxiety, worry, panic, and stress.",
        url: "https://www.anxietycanada.com/resources/mindshift-cbt/",
        icon: Lightbulb,
        tag: "Anxiety Tools",
    },
    {
        name: "Sanvello",
        description: "Clinically validated tools for stress, anxiety, and depression. Mood tracking and coping tools.",
        url: "https://www.sanvello.com/",
        icon: Leaf,
        tag: "Mood Tools",
    },
];

// ─── Video Resources ───
const VIDEO_RESOURCES = [
    {
        title: "How to Make Stress Your Friend",
        speaker: "Kelly McGonigal · TED",
        videoId: "RcGyVTAoXEU",
        duration: "14 min",
        description: "A paradigm-shifting talk on how changing your attitude toward stress can make you healthier and happier.",
    },
    {
        title: "The Happy Secret to Better Work",
        speaker: "Shawn Achor · TED",
        videoId: "fLJsdqxnZb0",
        duration: "12 min",
        description: "Why happiness fuels success, not the other way around — and how to reprogram your brain.",
    },
    {
        title: "All It Takes Is 10 Mindful Minutes",
        speaker: "Andy Puddicombe · TED",
        videoId: "qzR62JJCMBQ",
        duration: "10 min",
        description: "The founder of Headspace makes the case for taking just 10 minutes per day to be present.",
    },
    {
        title: "Why We All Need to Practice Emotional First Aid",
        speaker: "Guy Winch · TED",
        videoId: "F2hc2FLOdhI",
        duration: "17 min",
        description: "We sustain emotional injuries as often as physical ones — yet we don't treat them. Guy Winch explains why we should.",
    },
];

// ─── Free Books & Guides ───
const FREE_BOOKS = [
    {
        title: "Mind Over Mood",
        author: "Dennis Greenberger & Christine Padesky",
        description:
            "A practical CBT workbook that teaches you to identify and change the thought patterns behind emotional distress. Widely used in therapy worldwide.",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5537568/",
        category: "CBT & Self-Help",
        color: "from-purple-500/20 to-violet-600/20",
        borderColor: "border-purple-400/20",
    },
    {
        title: "The Feeling Good Handbook",
        author: "David D. Burns",
        description:
            "The classic guide to Cognitive Behavioural Therapy. Learn to defeat depression, overcome anxiety, and enjoy greater intimacy.",
        url: "https://archive.org/details/feelinggoodhandbook",
        category: "Depression & CBT",
        color: "from-blue-500/20 to-cyan-600/20",
        borderColor: "border-blue-400/20",
    },
    {
        title: "Stress Management — WHO Guide",
        author: "World Health Organization",
        description:
            "WHO's illustrated guide 'Doing What Matters in Times of Stress' — a free, evidence-based self-help book for managing stress.",
        url: "https://www.who.int/publications/i/item/9789240003927",
        category: "Stress Management",
        color: "from-teal-500/20 to-emerald-600/20",
        borderColor: "border-teal-400/20",
    },
    {
        title: "The Anxiety & Phobia Workbook",
        author: "Edmund J. Bourne",
        description:
            "A comprehensive resource covering relaxation, physical exercise, thought-stopping, and lifestyle changes to manage anxiety disorders.",
        url: "https://archive.org/details/anxietyphobiawor0000bour",
        category: "Anxiety",
        color: "from-amber-500/20 to-orange-600/20",
        borderColor: "border-amber-400/20",
    },
    {
        title: "Living Life to the Full",
        author: "Dr Chris Williams",
        description:
            "A free online CBT-based life skills course and guidebook. Helps with low mood, stress, worry, and building confidence.",
        url: "https://llttf.com/",
        category: "Life Skills & CBT",
        color: "from-green-500/20 to-lime-600/20",
        borderColor: "border-green-400/20",
    },
    {
        title: "Problem Management Plus (PM+)",
        author: "World Health Organization",
        description:
            "WHO's free manual for individual psychological help for adults impaired by distress. Includes managing stress, problems, and building social support.",
        url: "https://www.who.int/publications/i/item/WHO-MSD-MER-16.2",
        category: "Guided Self-Help",
        color: "from-indigo-500/20 to-blue-600/20",
        borderColor: "border-indigo-400/20",
    },
    {
        title: "Student Mental Health — Free Guide",
        author: "Mental Health Foundation",
        description:
            "A concise guide addressing common mental health challenges faced by students, with practical tips for coping and seeking support.",
        url: "https://www.mentalhealth.org.uk/explore-mental-health/publications/how-to-student-guide",
        category: "Student Wellness",
        color: "from-rose-500/20 to-pink-600/20",
        borderColor: "border-rose-400/20",
    },
    {
        title: "Self-Help for Anxiety Management (SAM)",
        author: "University of the West of England",
        description:
            "An open-access resource developed by university researchers to help young adults understand and manage anxiety through practical exercises.",
        url: "https://sam-app.org.uk/",
        category: "Anxiety & Self-Help",
        color: "from-sky-500/20 to-blue-600/20",
        borderColor: "border-sky-400/20",
    },
];

// ─── Quick Tips ───
const QUICK_TIPS = [
    "Drink a full glass of water right now. Dehydration worsens anxiety and fatigue.",
    "Step outside for 5 minutes. Sunlight boosts serotonin and improves mood.",
    "Send a kind message to someone you care about. Connection heals.",
    "Put your phone face-down for the next 30 minutes. Give your mind a break.",
    "Write down one thing you're looking forward to this week. Anticipation lifts mood.",
    "Take 3 slow, deep breaths right now. In through your nose, out through your mouth.",
    "Stretch your neck and shoulders. You're probably holding tension there right now.",
    "Name your current emotion. Just naming it reduces its intensity by up to 50%.",
    "Eat a piece of fruit or a handful of nuts. Blood sugar crashes worsen anxiety.",
    "Forgive yourself for one thing today. You're doing better than you think.",
];

// ─── Animation Variants ───
const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ResourcesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
    const [expandedTool, setExpandedTool] = useState<number | null>(null);
    const [tipIndex, setTipIndex] = useState(0);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    const handlePlayVideo = useCallback((videoId: string) => {
        setActiveVideo((prev) => (prev === videoId ? null : videoId));
    }, []);

    // Rotate tips
    useEffect(() => {
        setTipIndex(Math.floor(Math.random() * QUICK_TIPS.length));
        const interval = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % QUICK_TIPS.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Filter articles
    const filteredArticles = ARTICLES.filter((article) => {
        const matchesCategory = activeCategory === "All" || article.category === activeCategory;
        const matchesSearch =
            searchQuery === "" ||
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen relative font-sans text-white pb-20">
            <div className="relative z-10 space-y-10 p-6 md:p-10 max-w-6xl mx-auto">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-2"
                >
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-md flex items-center gap-3">
                        <BookOpen className="h-8 w-8 text-indigo-400" />
                        Mental Health Resources
                    </h1>
                    <p className="text-indigo-200/80 text-sm md:text-base leading-relaxed max-w-2xl">
                        Curated articles, self-help tools, and expert recommendations to support your mental well-being as a student.
                    </p>
                </motion.div>

                {/* ── Quick Tip Banner ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="rounded-2xl border border-indigo-400/20 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 backdrop-blur-xl p-5 shadow-xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <Lightbulb size={80} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5" />
                            Daily Tip
                        </p>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={tipIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="text-white/90 text-sm md:text-base leading-relaxed"
                            >
                                {QUICK_TIPS[tipIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* ── Search & Filter ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-4"
                >
                    {/* Search bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-300/60" />
                        <input
                            type="text"
                            placeholder="Search articles, tools, and resources..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md pl-11 pr-4 py-3 text-sm text-white placeholder:text-indigo-300/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 transition-all"
                        />
                    </div>

                    {/* Category tabs */}
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${activeCategory === cat
                                    ? "bg-indigo-500/20 text-indigo-200 border-indigo-400/30 shadow-sm"
                                    : "bg-white/5 text-indigo-300/60 border-white/10 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* ── Featured Articles ── */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-indigo-300" />
                        Featured Articles
                    </h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredArticles.map((article, index) => {
                                const Icon = article.icon;
                                const isExpanded = expandedArticle === index;
                                const originalIndex = ARTICLES.indexOf(article);
                                return (
                                    <motion.div
                                        key={article.title}
                                        variants={cardVariants}
                                        layout
                                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                                        className={`rounded-2xl border ${article.borderColor} bg-gradient-to-br ${article.color} backdrop-blur-md shadow-xl overflow-hidden transition-all duration-300 cursor-pointer group ${isExpanded ? "md:col-span-2 lg:col-span-3" : ""}`}
                                        onClick={() => setExpandedArticle(isExpanded ? null : originalIndex)}
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-start gap-3 flex-1">
                                                    <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
                                                        <Icon className="h-5 w-5 text-indigo-200" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-white text-sm group-hover:text-indigo-200 transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className="text-xs text-indigo-300/50">{article.readTime}</span>
                                                            <span className="text-xs text-indigo-300/40 bg-white/5 px-2 py-0.5 rounded-full">{article.category}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {isExpanded ? (
                                                    <ChevronUp className="h-4 w-4 text-indigo-300 flex-shrink-0 mt-1" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4 text-indigo-300 flex-shrink-0 mt-1" />
                                                )}
                                            </div>
                                            <p className="text-xs text-indigo-100/60 mt-3 leading-relaxed">
                                                {article.description}
                                            </p>

                                            {/* Expanded content */}
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="mt-4 space-y-3 border-t border-white/10 pt-4"
                                                    >
                                                        {article.content.map((paragraph, pIdx) => (
                                                            <p key={pIdx} className="text-sm text-indigo-100/80 leading-relaxed">
                                                                {paragraph}
                                                            </p>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {filteredArticles.length === 0 && (
                            <div className="col-span-full text-center py-12 text-indigo-300/50">
                                <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                                <p className="text-sm">No articles match your search. Try different keywords or clear filters.</p>
                            </div>
                        )}
                    </motion.div>
                </section>

                {/* ── Self-Help Toolkit ── */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-indigo-300" />
                        Self-Help Toolkit
                    </h2>
                    <p className="text-xs text-indigo-200/60 -mt-2">
                        Hands-on techniques you can practice right now. Tap any card to see the steps.
                    </p>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-3"
                    >
                        {SELF_HELP_TOOLS.map((tool, index) => {
                            const Icon = tool.icon;
                            const isExpanded = expandedTool === index;
                            return (
                                <motion.div
                                    key={tool.title}
                                    variants={cardVariants}
                                    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={() => setExpandedTool(isExpanded ? null : index)}
                                        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                                                <Icon className="h-4 w-4 text-indigo-300" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-white text-sm">{tool.title}</h3>
                                                <p className="text-xs text-indigo-300/50 mt-0.5">{tool.description}</p>
                                            </div>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronUp className="h-4 w-4 text-indigo-300 flex-shrink-0 ml-4" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4 text-indigo-300 flex-shrink-0 ml-4" />
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-5 pb-5 border-t border-white/5"
                                            >
                                                <ol className="pt-4 space-y-3">
                                                    {tool.steps.map((step, sIdx) => (
                                                        <li key={sIdx} className="flex items-start gap-3 text-sm text-indigo-100/80 leading-relaxed">
                                                            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-semibold text-indigo-300">
                                                                {sIdx + 1}
                                                            </span>
                                                            {step}
                                                        </li>
                                                    ))}
                                                </ol>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </section>

                {/* ── Recommended Apps & Websites ── */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-indigo-300" />
                        Recommended Apps & Websites
                    </h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {RECOMMENDED_APPS.map((app) => {
                            const Icon = app.icon;
                            return (
                                <motion.a
                                    key={app.name}
                                    variants={cardVariants}
                                    href={app.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-xl hover:bg-white/10 transition-all duration-300 block"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/25 transition-colors">
                                                <Icon className="h-5 w-5 text-indigo-300" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white group-hover:text-indigo-200 transition-colors text-sm">
                                                    {app.name}
                                                </h3>
                                                <span className="text-xs text-indigo-400/60 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                                                    {app.tag}
                                                </span>
                                            </div>
                                        </div>
                                        <ExternalLink className="h-4 w-4 text-indigo-300/40 group-hover:text-indigo-300 transition-colors flex-shrink-0" />
                                    </div>
                                    <p className="text-xs text-indigo-300/60 mt-3 leading-relaxed">{app.description}</p>
                                </motion.a>
                            );
                        })}
                    </motion.div>
                </section>

                {/* ── Video Resources ── */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Play className="h-5 w-5 text-indigo-300" />
                        Watch & Learn
                    </h2>
                    <p className="text-xs text-indigo-200/60 -mt-2">
                        Watch inspiring talks directly here — no need to leave the page.
                    </p>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-4 md:grid-cols-2"
                    >
                        {VIDEO_RESOURCES.map((video) => {
                            const isPlaying = activeVideo === video.videoId;
                            return (
                                <motion.div
                                    key={video.title}
                                    variants={cardVariants}
                                    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl overflow-hidden transition-all duration-300"
                                >
                                    {/* Video Player / Thumbnail */}
                                    <div className="relative w-full aspect-video bg-black/40">
                                        {isPlaying ? (
                                            <iframe
                                                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
                                                title={video.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="absolute inset-0 w-full h-full"
                                            />
                                        ) : (
                                            <button
                                                onClick={() => handlePlayVideo(video.videoId)}
                                                className="absolute inset-0 w-full h-full group cursor-pointer focus:outline-none"
                                                aria-label={`Play ${video.title}`}
                                            >
                                                {/* YouTube Thumbnail */}
                                                <img
                                                    src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                                                    }}
                                                />
                                                {/* Dark gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                                {/* Play button */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="h-16 w-16 rounded-full bg-red-600/90 border-2 border-white/20 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-red-500 transition-all duration-300">
                                                        <Play className="h-7 w-7 text-white ml-1" fill="white" />
                                                    </div>
                                                </div>
                                                {/* Duration badge */}
                                                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md">
                                                    {video.duration}
                                                </div>
                                            </button>
                                        )}
                                    </div>

                                    {/* Video Info */}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-white text-sm leading-snug">
                                            {video.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className="text-xs text-indigo-300/60">{video.speaker}</span>
                                            <span className="text-xs text-indigo-300/40">•</span>
                                            <span className="text-xs text-indigo-300/40">{video.duration}</span>
                                        </div>
                                        <p className="text-xs text-indigo-300/60 mt-2 leading-relaxed">
                                            {video.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </section>

                {/* ── Free Books & Guides ── */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Download className="h-5 w-5 text-indigo-300" />
                        Free Books & Guides
                    </h2>
                    <p className="text-xs text-indigo-200/60 -mt-2">
                        Curated free e-books, workbooks, and guides from trusted organisations. Read or download at no cost.
                    </p>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {FREE_BOOKS.map((book) => (
                            <motion.a
                                key={book.title}
                                variants={cardVariants}
                                href={book.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group rounded-2xl border ${book.borderColor} bg-gradient-to-br ${book.color} backdrop-blur-md p-5 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 block relative overflow-hidden`}
                            >
                                <div className="absolute top-3 right-3">
                                    <div className="h-9 w-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                        <FileText className="h-4 w-4 text-indigo-200" />
                                    </div>
                                </div>
                                <div className="pr-12">
                                    <h3 className="font-semibold text-white group-hover:text-indigo-200 transition-colors text-sm leading-snug">
                                        {book.title}
                                    </h3>
                                    <p className="text-xs text-indigo-300/60 mt-1">{book.author}</p>
                                </div>
                                <p className="text-xs text-indigo-100/60 mt-3 leading-relaxed">
                                    {book.description}
                                </p>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-xs text-indigo-400/60 bg-indigo-500/10 px-2.5 py-1 rounded-full">
                                        {book.category}
                                    </span>
                                    <span className="text-xs text-indigo-300/50 flex items-center gap-1 group-hover:text-indigo-200 transition-colors">
                                        Read Free
                                        <ExternalLink className="h-3 w-3" />
                                    </span>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                </section>

                {/* ── Footer ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center py-8"
                >
                    <p className="text-sm text-indigo-200/50 italic">
                        "The greatest glory in living lies not in never falling, but in rising every time we fall." — Nelson Mandela
                    </p>
                    <p className="text-xs text-indigo-300/30 mt-3">
                        These resources are for informational purposes. If you are in crisis, please visit the{" "}
                        <a href="/dashboard/crisis" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                            Crisis Support
                        </a>{" "}
                        page.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
