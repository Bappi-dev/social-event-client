"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Link as LinkIcon, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Google Login Handler
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.add({
        description: "Google sign-in failed. Please try again.",
        type: "error",
      });
    }
  };

  // Password Validation Rule Checker
  const validatePassword = (pwd: string) => {
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const isMinLength = pwd.length >= 6;

    if (!hasUpper) return "Password must contain at least one uppercase letter (A-Z).";
    if (!hasLower) return "Password must contain at least one lowercase letter (a-z).";
    if (!isMinLength) return "Password must be at least 6 characters long.";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. Password validation check
    const validationError = validatePassword(formData.password);
    if (validationError) {
      setError(validationError);
      toast.add({
        description: validationError,
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      // 2. BetterAuth Email Registration
      const { data, error: authError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.photoURL, // BetterAuth uses 'image' key for photo URL
      });

      if (data) {
        toast.add({
          description: "Sign Up successful!",
          type: "success",
        });
        router.push("/");
      }

      if (authError) {
        setError(authError.message || "Failed to create account. Please try again.");
        toast.add({
          description: authError.message || "Registration failed!",
          type: "error",
        });
      }
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <Card className="relative w-full max-w-md bg-slate-900/80 text-slate-100 shadow-2xl backdrop-blur-xl">
        <CardHeader className="text-center space-y-2">
          {/* Logo Brand Header */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 ring-2 ring-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.35)]">
            <svg
              className="h-7 w-7 text-cyan-400"
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

            {/* Name Input */}
            <div>
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1">
                <User className="h-3.5 w-3.5 text-cyan-400" /> Full Name
              </label>
              <Input
                required
                type="text"
                name="name"
                placeholder="John Doe"
                className="border-slate-800 bg-slate-950 text-xs text-white placeholder:text-slate-500 focus:ring-cyan-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

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

            {/* Photo URL Input */}
            <div>
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1">
                <LinkIcon className="h-3.5 w-3.5 text-cyan-400" /> Photo URL
              </label>
              <Input
                required
                type="url"
                name="photoURL"
                placeholder="https://images.unsplash.com/your-photo.jpg"
                className="border-slate-800 bg-slate-950 text-xs text-white placeholder:text-slate-500 focus:ring-cyan-500"
                value={formData.photoURL}
                onChange={(e) =>
                  setFormData({ ...formData, photoURL: e.target.value })
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
                Must contain at least 6 characters, 1 uppercase, & 1 lowercase letter.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          {/* Google Sign-in Button */}
          <div className="mt-4">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 font-semibold text-slate-200 hover:bg-slate-800 transition"
            >
              <FcGoogle className="text-xl" />
              Sign in with Google
            </Button>
          </div>

          {/* Redirect Link to Login */}
          <div className="mt-6 border-t border-slate-800/80 pt-4 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-cyan-400 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}