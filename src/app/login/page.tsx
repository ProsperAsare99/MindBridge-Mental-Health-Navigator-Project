import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-50">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-slate-600">Sign in to your account</p>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input id="email" name="email" type="email" required className="relative block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" required className="relative block w-full rounded-md border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password" />
                        </div>
                    </div>

                    <div>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-500">Sign in</Button>
                    </div>
                </form>
                <div className="text-center text-sm">
                    <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Don't have an account? Sign up</Link>
                </div>
            </div>
        </div>
    );
}
