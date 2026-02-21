"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Phone,
    MessageCircle,
    Globe,
    Heart,
    Shield,
    AlertTriangle,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    BookOpen,
    Users,
    Clock,
} from "lucide-react";

const EMERGENCY_LINES = [
    {
        name: "National Suicide Prevention Lifeline",
        number: "988",
        description: "Free, confidential 24/7 support for people in distress.",
        available: "24/7",
        type: "call",
    },
    {
        name: "Crisis Text Line",
        number: "741741",
        description: "Text HOME to 741741 to connect with a trained crisis counselor.",
        available: "24/7",
        type: "text",
    },
    {
        name: "SAMHSA National Helpline",
        number: "1-800-662-4357",
        description: "Free treatment referrals and information service for mental health and substance use disorders.",
        available: "24/7",
        type: "call",
    },
    {
        name: "The Trevor Project (LGBTQ+)",
        number: "1-866-488-7386",
        description: "Crisis intervention and suicide prevention for LGBTQ+ youth.",
        available: "24/7",
        type: "call",
    },
    {
        name: "NAMI Helpline",
        number: "1-800-950-NAMI (6264)",
        description: "Information, referrals, and support for individuals and families affected by mental illness.",
        available: "Mon-Fri 10am-10pm ET",
        type: "call",
    },
];

const ONLINE_RESOURCES = [
    {
        name: "International Association for Suicide Prevention",
        url: "https://www.iasp.info/resources/Crisis_Centres/",
        description: "Find crisis centers around the world.",
    },
    {
        name: "MentalHealth.gov",
        url: "https://www.mentalhealth.gov/",
        description: "U.S. government resource for mental health information.",
    },
    {
        name: "7 Cups",
        url: "https://www.7cups.com/",
        description: "Free online chat with trained listeners for emotional support.",
    },
    {
        name: "BetterHelp (Students)",
        url: "https://www.betterhelp.com/",
        description: "Online counseling and therapy services. Some institutions offer discounted access.",
    },
];

const SELF_HELP_TIPS = [
    {
        title: "Grounding Technique: 5-4-3-2-1",
        content:
            "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This helps bring you back to the present moment.",
    },
    {
        title: "Box Breathing",
        content:
            "Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds. Repeat 4 times. This activates your body's calm response.",
    },
    {
        title: "Reach Out to Someone",
        content:
            "Call or text a friend, family member, or someone you trust. You don't have to go through this alone. Even a brief conversation can help.",
    },
    {
        title: "Remove Yourself from the Situation",
        content:
            "If you're in an environment that's causing distress, move to a safe, quiet place. A change of scenery can help shift your mindset.",
    },
];

export default function CrisisPage() {
    const [expandedTip, setExpandedTip] = useState<number | null>(null);

    const handleCall = (number: string) => {
        window.open(`tel:${number.replace(/[^0-9]/g, "")}`, "_self");
    };

    const handleText = (number: string) => {
        window.open(`sms:${number.replace(/[^0-9]/g, "")}`, "_self");
    };

    return (
        <div className="min-h-screen relative font-sans text-white pb-20">
            <div className="relative z-10 space-y-8 p-6 md:p-10 max-w-4xl mx-auto">

                {/* Urgent Banner */}
                <div className="rounded-2xl border border-red-500/30 bg-red-900/30 backdrop-blur-md p-6 shadow-xl relative overflow-hidden animate-in fade-in zoom-in duration-500">
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-red-500/20 blur-3xl rounded-full pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="flex-shrink-0 h-14 w-14 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                            <AlertTriangle className="h-7 w-7 text-red-400 animate-pulse" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                                If you are in immediate danger, call 911
                            </h1>
                            <p className="text-red-200/80 text-sm mt-1">
                                Your safety is the priority. If you or someone you know is in a life-threatening situation, contact emergency services immediately.
                            </p>
                        </div>
                        <Button
                            onClick={() => handleCall("911")}
                            className="bg-red-600 hover:bg-red-500 text-white border-0 shadow-lg shadow-red-600/30 h-12 px-6 text-base font-semibold flex-shrink-0"
                        >
                            <Phone className="mr-2 h-5 w-5" />
                            Call 911
                        </Button>
                    </div>
                </div>

                {/* Header */}
                <div className="animate-in fade-in slide-in-from-top-5 duration-700">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Heart className="h-5 w-5 text-indigo-300" />
                        You are not alone. Help is available.
                    </h2>
                    <p className="text-indigo-200/80 mt-1 text-sm leading-relaxed">
                        Reaching out takes courage. Below are confidential resources available to you right now.
                    </p>
                </div>

                {/* Crisis Hotlines */}
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Phone className="h-5 w-5 text-indigo-300" />
                        Crisis Hotlines & Text Lines
                    </h3>

                    <div className="grid gap-4 md:grid-cols-2">
                        {EMERGENCY_LINES.map((line, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-xl hover:bg-white/10 transition-all duration-300 group"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-white group-hover:text-indigo-200 transition-colors">
                                            {line.name}
                                        </h4>
                                        <p className="text-xs text-indigo-300/60 mt-1 leading-relaxed">
                                            {line.description}
                                        </p>
                                        <div className="flex items-center gap-1 mt-2 text-xs text-indigo-200/50">
                                            <Clock className="h-3 w-3" />
                                            {line.available}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    {line.type === "call" ? (
                                        <Button
                                            size="sm"
                                            onClick={() => handleCall(line.number)}
                                            className="bg-indigo-500 hover:bg-indigo-400 text-white shadow-md shadow-indigo-500/20 border border-indigo-400/50 text-xs h-9"
                                        >
                                            <Phone className="mr-1.5 h-3.5 w-3.5" />
                                            Call {line.number}
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            onClick={() => handleText(line.number)}
                                            className="bg-indigo-500 hover:bg-indigo-400 text-white shadow-md shadow-indigo-500/20 border border-indigo-400/50 text-xs h-9"
                                        >
                                            <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                                            Text {line.number}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Immediate Self-Help */}
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Shield className="h-5 w-5 text-indigo-300" />
                        Immediate Coping Techniques
                    </h3>

                    <div className="space-y-3">
                        {SELF_HELP_TIPS.map((tip, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() =>
                                        setExpandedTip(expandedTip === index ? null : index)
                                    }
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-medium text-white text-sm">
                                        {tip.title}
                                    </span>
                                    {expandedTip === index ? (
                                        <ChevronUp className="h-4 w-4 text-indigo-300 flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-indigo-300 flex-shrink-0" />
                                    )}
                                </button>
                                {expandedTip === index && (
                                    <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <p className="text-sm text-indigo-100/80 leading-relaxed">
                                            {tip.content}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Online Resources */}
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Globe className="h-5 w-5 text-indigo-300" />
                        Online Support Resources
                    </h3>

                    <div className="grid gap-4 md:grid-cols-2">
                        {ONLINE_RESOURCES.map((resource, index) => (
                            <a
                                key={index}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-xl hover:bg-white/10 transition-all duration-300 cursor-pointer block"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <h4 className="font-semibold text-white group-hover:text-indigo-200 transition-colors text-sm">
                                        {resource.name}
                                    </h4>
                                    <ExternalLink className="h-4 w-4 text-indigo-300/50 group-hover:text-indigo-300 transition-colors flex-shrink-0" />
                                </div>
                                <p className="text-xs text-indigo-300/60 mt-2 leading-relaxed">
                                    {resource.description}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Campus Support Reminder */}
                <div className="rounded-2xl border border-indigo-500/20 bg-indigo-900/20 backdrop-blur-md p-6 shadow-xl flex items-start gap-4 animate-in fade-in duration-500">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                        <Users className="h-5 w-5 text-indigo-300" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-white">
                            Your Campus Counseling Center
                        </h4>
                        <p className="text-sm text-indigo-200/70 mt-1 leading-relaxed">
                            Most universities offer free, confidential counseling for students.
                            Check your institution's website or student affairs office for their
                            mental health services. Walk-in appointments are often available.
                        </p>
                    </div>
                </div>

                {/* Footer Reassurance */}
                <div className="text-center py-6 animate-in fade-in duration-700">
                    <p className="text-sm text-indigo-200/60 italic">
                        "It's okay to ask for help. Reaching out is a sign of strength, not weakness."
                    </p>
                </div>
            </div>
        </div>
    );
}
