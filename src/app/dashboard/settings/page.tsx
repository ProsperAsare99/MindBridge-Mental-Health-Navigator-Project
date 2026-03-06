"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
    updateProfile,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
    User,
    Mail,
    School,
    BookHeart,
    IdCard,
    Lock,
    Save,
    CheckCircle2,
    AlertCircle,
    Eye,
    EyeOff,
} from "lucide-react";

export default function SettingsPage() {
    const { user } = useAuth();

    // Profile fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [institution, setInstitution] = useState("");
    const [studentId, setStudentId] = useState("");
    const [course, setCourse] = useState("");

    // Password fields
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // State
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState("");
    const [profileError, setProfileError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Check if user signed in with email/password (has password provider)
    const isPasswordUser = user?.providerData?.some(
        (p) => p.providerId === "password"
    );

    // Fetch existing profile
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.uid) return;
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setName(data.name || user.displayName || "");
                    setEmail(user.email || "");
                    setInstitution(data.institution || "");
                    setStudentId(data.studentId || "");
                    setCourse(data.course || "");
                } else {
                    setName(user.displayName || "");
                    setEmail(user.email || "");
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    // Save profile details
    const handleSaveProfile = async () => {
        if (!user?.uid) return;
        setSaving(true);
        setProfileError("");
        setProfileSuccess("");

        try {
            // Update Firestore
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                name,
                institution,
                studentId,
                course,
            });

            // Update Firebase Auth display name
            await updateProfile(user, { displayName: name });

            setProfileSuccess("Profile updated successfully!");
            setTimeout(() => setProfileSuccess(""), 4000);
        } catch (err: any) {
            console.error("Error updating profile:", err);
            setProfileError("Failed to update profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    // Change password
    const handleChangePassword = async () => {
        setPasswordError("");
        setPasswordSuccess("");

        if (newPassword.length < 6) {
            setPasswordError("New password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match.");
            return;
        }

        setChangingPassword(true);
        try {
            // Re-authenticate first
            const credential = EmailAuthProvider.credential(
                user!.email!,
                currentPassword
            );
            await reauthenticateWithCredential(user!, credential);

            // Update password
            await updatePassword(user!, newPassword);

            setPasswordSuccess("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => setPasswordSuccess(""), 4000);
        } catch (err: any) {
            console.error("Error changing password:", err);
            if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
                setPasswordError("Current password is incorrect.");
            } else if (err.code === "auth/weak-password") {
                setPasswordError("New password is too weak. Use at least 6 characters.");
            } else {
                setPasswordError("Failed to change password. Please try again.");
            }
        } finally {
            setChangingPassword(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
            </div>
        );
    }

    const inputClasses =
        "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all";

    return (
        <div className="min-h-screen relative font-sans text-white pb-20">
            <div className="relative z-10 space-y-8 p-6 md:p-10 max-w-3xl mx-auto">
                {/* Header */}
                <div className="animate-in fade-in slide-in-from-top-5 duration-700">
                    <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">
                        Settings
                    </h1>
                    <p className="text-indigo-200 mt-1">
                        Manage your profile and account preferences.
                    </p>
                </div>

                {/* Profile Section */}
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 shadow-xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                            <User className="h-5 w-5 text-indigo-300" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                Profile Details
                            </h2>
                            <p className="text-xs text-indigo-300/70">
                                Update your personal information
                            </p>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                            <User className="h-4 w-4" /> Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputClasses}
                            placeholder="Your full name"
                        />
                    </div>

                    {/* Email (read-only) */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                            <Mail className="h-4 w-4" /> Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className={`${inputClasses} opacity-60 cursor-not-allowed`}
                        />
                        <p className="text-xs text-indigo-300/50">
                            Email cannot be changed.
                        </p>
                    </div>

                    {/* Institution */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                            <School className="h-4 w-4" /> Institution
                        </label>
                        <input
                            type="text"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            className={inputClasses}
                            placeholder="Your institution"
                        />
                    </div>

                    {/* Student ID */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                            <IdCard className="h-4 w-4" /> Student ID
                        </label>
                        <input
                            type="text"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className={inputClasses}
                            placeholder="Your student ID"
                        />
                    </div>

                    {/* Course */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                            <BookHeart className="h-4 w-4" /> Course / Program
                        </label>
                        <input
                            type="text"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className={inputClasses}
                            placeholder="Your course or program"
                        />
                    </div>

                    {/* Success / Error Messages */}
                    {profileSuccess && (
                        <div className="flex items-center gap-2 text-green-300 text-sm bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 animate-in fade-in duration-300">
                            <CheckCircle2 className="h-4 w-4" />
                            {profileSuccess}
                        </div>
                    )}
                    {profileError && (
                        <div className="flex items-center gap-2 text-red-300 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 animate-in fade-in duration-300">
                            <AlertCircle className="h-4 w-4" />
                            {profileError}
                        </div>
                    )}

                    <Button
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/50 transition-all hover:scale-105 h-11"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>

                {/* Password Section — only for email/password users */}
                {isPasswordUser && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 shadow-xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                                <Lock className="h-5 w-5 text-indigo-300" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    Change Password
                                </h2>
                                <p className="text-xs text-indigo-300/70">
                                    Update your account password
                                </p>
                            </div>
                        </div>

                        {/* Current Password */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                                <Lock className="h-4 w-4" /> Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className={inputClasses}
                                    placeholder="Enter current password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                                <Lock className="h-4 w-4" /> New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={inputClasses}
                                    placeholder="Enter new password (min. 6 characters)"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                                <Lock className="h-4 w-4" /> Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={inputClasses}
                                placeholder="Re-enter new password"
                            />
                        </div>

                        {/* Success / Error Messages */}
                        {passwordSuccess && (
                            <div className="flex items-center gap-2 text-green-300 text-sm bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 animate-in fade-in duration-300">
                                <CheckCircle2 className="h-4 w-4" />
                                {passwordSuccess}
                            </div>
                        )}
                        {passwordError && (
                            <div className="flex items-center gap-2 text-red-300 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 animate-in fade-in duration-300">
                                <AlertCircle className="h-4 w-4" />
                                {passwordError}
                            </div>
                        )}

                        <Button
                            onClick={handleChangePassword}
                            disabled={
                                changingPassword ||
                                !currentPassword ||
                                !newPassword ||
                                !confirmPassword
                            }
                            className="bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/50 transition-all hover:scale-105 h-11"
                        >
                            <Lock className="mr-2 h-4 w-4" />
                            {changingPassword ? "Changing..." : "Change Password"}
                        </Button>
                    </div>
                )}

                {/* Info for social sign-in users */}
                {!isPasswordUser && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl flex items-start gap-3 animate-in fade-in duration-500">
                        <AlertCircle className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-indigo-200/80">
                            You signed in with a third-party provider (Google or Phone).
                            Password management is handled by your provider.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
