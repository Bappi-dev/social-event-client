"use client";

import Link from "next/link";
import { ArrowRight, HeartHandshake, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative overflow-hidden  py-15 lg:py-28">
      <div className="absolute -top-32 -left-20 h-[420px] w-200 rounded-full bg-cyan-500/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 -right-20 h-[450px] w-200 rounded-full bg-amber-500/15 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-1/4 h-[350px] w-200 rounded-full bg-emerald-500/20 blur-[130px] pointer-events-none" />

      <div className="container relative mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur-md mb-6">
              <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
              <span>Winter Social Drive 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight  sm:text-5xl lg:text-6xl leading-tight">
              Spread Warmth This Winter with{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
                GoodGather
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-6 text-base text-gray-400 sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Empowering communities to organize blanket drives, healthcare
              camps, and food relief. Join thousands of volunteers bringing hope
              and comfort to those in need.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 shadow-lg shadow-cyan-500/20"
              >
                <Link href="/allEvents" className="flex items-center gap-2">
                  Explore Events <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-800  backdrop-blur-md"
              >
                <Link href="/Events" className="flex  items-center gap-2">
                  Create Event
                </Link>
              </Button>
            </div>

            {/* Live Quick Stats Bar */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-8 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-cyan-400">12,400+</p>
                <p className="text-xs text-slate-400 font-medium">
                  Blankets Distributed
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-400">180+</p>
                <p className="text-xs text-slate-400 font-medium">
                  Drive Campaigns
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400">3,500+</p>
                <p className="text-xs text-slate-400 font-medium">
                  Active Volunteers
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Glass Card Display */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl shadow-2xl">
              {/* Event Image Banner */}
              <div className="relative h-56 w-full overflow-hidden rounded-xl">
                <Image
                  width={400}
                  height={400}
                  src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800"
                  alt="Winter Relief Campaign"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3 rounded-md bg-slate-950/80 px-3 py-1 text-xs font-semibold text-cyan-300 border border-slate-800">
                  Featured Drive
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <HeartHandshake className="h-3.5 w-3.5 text-orange-400" />{" "}
                    Winter Blanket Drive
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-cyan-400" /> 142
                    Volunteers Joined
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">
                  Warmth for Northern Rural Villages
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  Distribution drive targeting over 500 low-income families
                  suffering from cold waves. Join us in making a real impact.
                </p>

                {/* Progress Indicator */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-400">Raised Goal</span>
                    <span className="text-cyan-400">82%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800">
                    <div className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-orange-400 w-[82%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
