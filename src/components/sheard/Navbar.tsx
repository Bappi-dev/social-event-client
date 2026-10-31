"use client";

import Link from "next/link";
import { Calendar, CheckCircle, CircleUserRound, LogOut, Mail, PlusCircle, Settings, SunDim } from "lucide-react";
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
      description: 'SignOut Successfully!!',
      type:'success'
    })
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
          <p><SunDim className="text-white" size={20} /></p>
          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image as string}
                    />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                }
              ></PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle className="border text-2xl p-2 rounded-2xl">
                    <p className="text-md flex items-center gap-1"><CircleUserRound className="text-cyan-300" size={15}/> {user?.name}</p>
                    <p className="text-sm flex items-center gap-1"> <Mail className="text-red-300" size={10} /> {user?.email}</p>
                  </PopoverTitle>
                  <PopoverDescription>
                    <div className="text-md border-b border-t mb-4">
                     <Link href={'/Events'}> <p className="font-bold  hover:text-gray-400 rounded flex items-center"> <PlusCircle className="h-4 w-4 text-cyan-400"  size={10}/> Create Event </p></Link>
                     <Link href={'/Events'}> <p className="font-bold  hover:text-gray-400 rounded flex items-center"> <Settings className="h-4 w-4 text-red-400" size={10}/> Manage Event </p></Link>
                     <Link href={'/Events'}> <p className="font-bold  hover:text-gray-400 rounded flex items-center"> <CheckCircle className="h-4 w-4 text-cyan-400" size={10}/> Joined Event </p></Link>
                    </div>

                    <Button  onClick={handleSignout} variant={"destructive"}>
                    <LogOut />  Signout
                    </Button>
                  </PopoverDescription>
                </PopoverHeader>
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
