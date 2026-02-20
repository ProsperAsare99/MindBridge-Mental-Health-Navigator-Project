"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, CheckCircle2, AlertTriangle, AlertCircle, Info } from "lucide-react";
import Link from "next/link";

// PHQ-9 Questions
const QUESTIONS = [
    {
        id: 1,
        text: "Little interest or pleasure in doing things",
    },
    {
        id: 2,
        text: "Feeling down, depressed, or hopeless",
    },
    {
        id: 3,
        text: "Trouble falling or staying asleep, or sleeping too much",
    },
    {
        id: 4,
        text: "Feeling tired or having little energy",
    },
    {
        id: 5,
        text: "Poor appetite or overeating",
    },
    {
        id: 6,
        text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    },
    {
        id: 7,
        text: "Trouble concentrating on things, such as reading the newspaper or watching television",
    },
    {
        id: 8,
        text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
    },
    {
        id: 9,
        text: "Thoughts that you would be better off dead or of hurting yourself in some way",
    },
];

const OPTIONS = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" },
];

export default function AssessmentPage() {
    const { user } = useAuth();
    const router = useRouter();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(-1));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [severity, setSeverity] = useState("");

    const handleOptionSelect = (value: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = value;
        setAnswers(newAnswers);

        // Auto-advance after short delay if not last question
        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 300);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const calculateResults = () => {
        const totalScore = answers.reduce((a, b) => a + (b === -1 ? 0 : b), 0);
        let severityLevel = "";

        if (totalScore <= 4) severityLevel = "None-minimal";
        else if (totalScore <= 9) severityLevel = "Mild";
        else if (totalScore <= 14) severityLevel = "Moderate";
        else if (totalScore <= 19) severityLevel = "Moderately Severe";
        else severityLevel = "Severe";

        return { totalScore, severityLevel };
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const { totalScore, severityLevel } = calculateResults();
        setScore(totalScore);
        setSeverity(severityLevel);

        try {
            if (user) {
                // Save to Firestore
                await addDoc(collection(db, `users/${user.uid}/assessments`), {
                    type: 'PHQ-9',
                    score: totalScore,
                    answers: answers,
                    severity: severityLevel,
                    timestamp: serverTimestamp(),
                });
            }
            setShowResults(true);
        } catch (error) {
            console.error("Error saving assessment:", error);
            // Show results anyway even if save fails
            setShowResults(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getProgress = () => {
        return ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;
    };

    if (showResults) {
        return (
            <div className="min-h-screen relative font-sans text-white pb-20 pt-10 px-4">
                {/* We assume ShaderBackground is in Layout or we can add it here if needed, keeping it clean for now */}

                <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-4 ring-1 ring-white/20 shadow-lg backdrop-blur-md">
                            <CheckCircle2 className="w-12 h-12 text-green-400" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Assessment Complete</h1>
                        <p className="text-indigo-200">Here is your wellness snapshot based on your responses.</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                        <div className="flex flex-col items-center justify-center text-center space-y-2 mb-8">
                            <span className="text-sm font-medium text-indigo-200 uppercase tracking-widest">Your Score</span>
                            <span className="text-6xl font-extrabold text-white drop-shadow-md">{score}</span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${severity === 'Severe' || severity === 'Moderately Severe' ? 'bg-red-500/20 text-red-200 border-red-500/30' :
                                    severity === 'Moderate' ? 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30' :
                                        'bg-green-500/20 text-green-200 border-green-500/30'
                                }`}>
                                {severity === 'Severe' || severity === 'Moderately Severe' ? <AlertTriangle className="w-3.5 h-3.5" /> :
                                    severity === 'Moderate' ? <Info className="w-3.5 h-3.5" /> :
                                        <CheckCircle2 className="w-3.5 h-3.5" />}
                                {severity} Depression Severity
                            </span>
                        </div>

                        <div className="space-y-4 text-center">
                            <p className="text-white/80 leading-relaxed">
                                {severity === 'None-minimal' && "Your responses suggest you're doing well, with few or no symptoms of depression. Keep practicing good self-care!"}
                                {severity === 'Mild' && "You may be experiencing some mild symptoms. It might be helpful to monitor your mood and practice stress-reduction techniques."}
                                {severity === 'Moderate' && "Your responses suggest moderate symptoms. Consider reaching out to a counselor or using our self-help resources to manage these feelings."}
                                {(severity === 'Moderately Severe' || severity === 'Severe') && "Your responses indicate significant symptoms. We strongly recommend speaking with a mental health professional for support."}
                            </p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-3">
                            <Link href="/dashboard" className="w-full">
                                <Button className="w-full bg-white text-indigo-950 hover:bg-indigo-50 font-bold h-12 rounded-xl">
                                    Return to Dashboard
                                </Button>
                            </Link>
                            {(severity === 'Moderately Severe' || severity === 'Severe' || severity === 'Moderate') && (
                                <Link href="/dashboard/crisis" className="w-full">
                                    <Button variant="outline" className="w-full border-red-400/50 text-red-200 hover:bg-red-950/30 hover:text-red-100 h-12 rounded-xl">
                                        Get Immediate Support
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-900/40 border border-indigo-500/30 backdrop-blur-sm flex gap-3 text-sm text-indigo-200/80">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 text-indigo-400" />
                        <p>This assessment is for screening purposes only and is not a medical diagnosis. Please consult a professional for a clinical evaluation.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative font-sans text-white pb-20 pt-10 px-4 flex flex-col items-center">

            <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-indigo-200 hover:text-white hover:bg-white/10">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Exit
                </Button>
                <span className="text-sm font-medium text-indigo-200">Question {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-2xl h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
                <div
                    className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: `${getProgress()}%` }}
                ></div>
            </div>

            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 key={currentQuestionIndex}">
                <h2 className="text-xl md:text-2xl font-medium leading-relaxed mb-2 text-white/90">
                    Over the last 2 weeks, how often have you been bothered by...
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 block min-h-[5rem]">
                    {QUESTIONS[currentQuestionIndex].text}?
                </h3>

                <div className="space-y-3">
                    {OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleOptionSelect(option.value)}
                            className={`w-full p-4 rounded-xl text-left transition-all duration-200 border flex items-center justify-between group
                        ${answers[currentQuestionIndex] === option.value
                                    ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-600/20 scale-[1.02]'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:pl-5'
                                }
                    `}
                        >
                            <span className={`font-medium text-lg ${answers[currentQuestionIndex] === option.value ? 'text-white' : 'text-indigo-100'}`}>
                                {option.label}
                            </span>
                            {answers[currentQuestionIndex] === option.value && (
                                <CheckCircle2 className="w-5 h-5 text-white animate-in zoom-in duration-300" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt-10 flex justify-between items-center">
                    <Button
                        variant="ghost"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className="text-indigo-200 hover:text-white hover:bg-white/5 disabled:opacity-30"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                    </Button>

                    {currentQuestionIndex === QUESTIONS.length - 1 ? (
                        <Button
                            onClick={handleSubmit}
                            disabled={answers.includes(-1) || isSubmitting}
                            className="bg-white text-indigo-950 hover:bg-indigo-50 font-bold px-8 shadow-lg shadow-indigo-900/20"
                        >
                            {isSubmitting ? "Processing..." : "Finish Assessment"}
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            disabled={answers[currentQuestionIndex] === -1}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 px-6 rounded-full"
                        >
                            Next <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                </div>
            </div>

        </div>
    );
}
