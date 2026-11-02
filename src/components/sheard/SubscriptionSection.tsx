"use client";

import { useState } from "react";
import { Send, Sparkles, Mail, CheckCircle2 } from "lucide-react";
import { toast } from "../ui/toast";


export default function SubscriptionSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSubscribed(true);
      toast.add({
         description:"Successfully subscribed to GoodGather updates! ❄️",
         type:'success'
      });
      setEmail("");
    }, 1000);
  };

  return (
    <section className="relative overflow-hidden  border-y border-slate-800/80 py-16 px-4 ">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 sm:p-12 shadow-2xl backdrop-blur-xl text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-400 mb-4">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>Stay Connected</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Spread Warmth, Never Miss an Event
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Subscribe to our newsletter to get instant updates about upcoming winter relief drives, community cleanups, and social campaigns near you.
          </p>

          {/* Form or Success State */}
          {isSubscribed ? (
            <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-teal-500/40 bg-teal-950/30 py-4 px-6 text-teal-300 text-xs font-semibold animate-fade-in">
              <CheckCircle2 className="h-5 w-5 text-teal-400" />
              <span>Thank you for subscribing! We'll keep you updated.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <div className="relative w-full">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full rounded-xl border border-cyan-200 bg-slate-900 py-3.5 pl-10 pr-4 text-xs text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto shrink-0 rounded-xl bg-cyan-500 px-6 py-3.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg shadow-cyan-500/20"
              >
                <span>{loading ? "Subscribing..." : "Subscribe"}</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          )}

          <p className="mt-4 text-[10px] text-slate-500">
            We respect your privacy. Unsubscribe at any time with one click.
          </p>

        </div>
      </div>
    </section>
  );
}