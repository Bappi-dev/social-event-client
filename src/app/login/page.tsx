"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Link as LinkIcon, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const eventData = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      email: eventData.email,
      password: eventData.password,
    });
    if (data) {
      console.log(data);
      redirect('/allEvents')
    }
    if (error) {
      console.log(error);
    }

    setError("");
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-950 px-4 py-12">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <Card className="relative w-full max-w-md border-slate-800/80 bg-slate-900/80 text-slate-100 shadow-2xl backdrop-blur-xl">
        <CardHeader className="text-center space-y-2">
          {/* Logo Brand Header */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 ring-2 ring-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.35)]">
            <svg
              className="h-7 w-7 text-cyan-400 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v18m9-9H3m15.364-6.364L6.364 18.364M18.364 17.636L6.364 5.636"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl font-extrabold text-white">
            Join Good<span className="text-cyan-400">Gather</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-400">
            Create an account to organize & participate in winter drives
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Toast / Alert Box */}
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-950/40 p-3 text-xs font-semibold text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1">
                <Mail className="h-3.5 w-3.5 text-cyan-400" /> Email Address
              </label>
              <Input
                required
                type="email"
                name="email"
                placeholder="john@example.com"
                className="border-slate-800 bg-slate-950 text-xs text-white placeholder:text-slate-500 focus:ring-cyan-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1">
                <Lock className="h-3.5 w-3.5 text-cyan-400" /> Password
              </label>
              <Input
                required
                type="password"
                name="password"
                placeholder="••••••••"
                className="border-slate-800 bg-slate-950 text-xs text-white placeholder:text-slate-500 focus:ring-cyan-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Must contain at least 6 characters, 1 uppercase, & 1 lowercase
                letter.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
            >
              Login
            </Button>

            <div>
              <Button className=" w-full rounded-xl border-gray-200 bg-white font-semibold text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50">
                <FcGoogle className="text-xl" />
                login with Google
              </Button>
            </div>
          </form>

          {/* Redirect Link to Login */}
          <div className="mt-6 border-t border-slate-800/80 pt-4 text-center">
            <p className="text-xs text-slate-400">
              have an account?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-cyan-400 hover:underline"
              >
                RegisterPage
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
