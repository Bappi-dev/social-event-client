"use client";

import Link from "next/link";
import {
  Calendar,
  CheckCircle,
  CircleUserRound,
  LogOut,
  Mail,
  PlusCircle,
  Settings,
  SunDim,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover";

import { toast } from "../ui/toast";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignout = () => {
    authClient.signOut();
    toast.add({
      description: "SignOut Successfully!!",
      type: "success",
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-400 bg-slate-900/80 backdrop-blur-md">
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
              Good<span className="text-cyan-400">Gather</span>
            </p>
          </span>
        </Link>

        {/* Upcoming Events Link */}
        <Link
          href="/allEvents"
          className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors flex items-center gap-1.5"
        >
          <Calendar className="h-4 w-4" /> Upcoming Events
        </Link>

        {/* Navigation / Auth Section */}

        <div className="flex items-center gap-6">
          <div className="cursor-pointer">
            <SunDim className="text-white" size={20} />
          </div>
          {user ? (
            <Popover>
              {/* Trigger Button with Avatar */}
              <PopoverTrigger>
                <button className="rounded-full outline-none ring-offset-background transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <Avatar className="h-10 w-10 border border-slate-700/50 shadow-sm">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image || undefined}
                      alt={user?.name || "User Avatar"}
                    />
                    <AvatarFallback className="bg-teal-600 font-bold text-white uppercase">
                      {user?.name ? user.name.charAt(0) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>

              {/* Popover Content */}
              <PopoverContent
                align="end"
                className="w-64 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-slate-100 shadow-2xl backdrop-blur-md"
              >
                {/* User Info Header Section */}
                <div className="flex items-center gap-3 rounded-xl bg-slate-900/80 p-3 border border-slate-800/80">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-teal-400">
                    <CircleUserRound className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="truncate text-sm font-bold text-slate-100">
                      {user?.name || "Anonymous User"}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-slate-400 truncate mt-0.5">
                      <Mail className="h-3 w-3 text-red-400 shrink-0" />
                      <span className="truncate">
                        {user?.email || "user@example.com"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-3 h-[1px] bg-slate-800/80" />

                {/* Navigation Links List */}
                <div className="space-y-1">
                  <Link
                    href="/Events"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-900 hover:text-teal-400"
                  >
                    <PlusCircle className="h-4 w-4 text-teal-400" />
                    <span>Create Event</span>
                  </Link>

                  <Link
                    href="/Events"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-900 hover:text-teal-400"
                  >
                    <Settings className="h-4 w-4 text-amber-400" />
                    <span>Manage Event</span>
                  </Link>

                  <Link
                    href="/Events"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-900 hover:text-teal-400"
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span>Joined Event</span>
                  </Link>
                </div>

                {/* Divider */}
                <div className="my-3 h-[1px] bg-slate-800/80" />

                {/* Signout Action */}
                <Button
                  onClick={handleSignout}
                  variant="destructive"
                  className="w-full justify-center gap-2 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/30 text-xs font-bold h-9 transition-all"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Button className="bg-cyan-500 px-4 text-slate-950 font-semibold hover:bg-cyan-200">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
