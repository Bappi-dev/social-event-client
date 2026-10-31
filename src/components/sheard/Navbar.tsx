"use client";

import Link from "next/link";
import {
  Calendar,
  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



export default function Navbar() {
  //

  

  return (
    <nav className="sticky border-b border-b-cyan-400  top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md ">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* App Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 ring-2 ring-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-transform group-hover:scale-105">
            {/* Snowflake Icon representing the winter logo */}
            <svg
              className="h-6 w-6 text-cyan-400 animate-pulse"
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
          <span className="tracking-wide text-white">
            <p className="text-xl">
              {" "}
              Good<span className="text-cyan-400">Gather</span>{" "}
            </p>
          </span>
        </Link>
        <Link
          href="/allEvents"
          className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors flex items-center gap-1.5"
        >
          <Calendar className="h-4 w-4" /> Upcoming Events
        </Link>
        {/* Navigation Links */}
        <div className=" items-center gap-6">
          {/* Conditional Auth Section */}

          <Button
            className="bg-cyan-500 px-4  text-slate-950 font-semibold hover:bg-cyan-200"
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
