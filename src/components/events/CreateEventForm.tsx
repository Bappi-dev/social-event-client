"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Type, Tag, MapPin, Image as ImageIcon, Send, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/toast";

export default function CreateEventForm({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePresetClick = (url: string) => {
    setThumbnailUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const Data = Object.fromEntries(formData.entries());
    
    const selectedDate = new Date(Data.eventDate as string);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError("Event date must be in the future (today or later).");
      return;
    }

    const finalEventPayload = {
      ...Data,
      email: userEmail, 
      createdAt: new Date().toISOString(),
    };

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalEventPayload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.add({
          description: "Event Created Successfully! 🎉",
          type: 'success'
        });
        router.push("/allEvents");
        router.refresh();
      } else {
        setError(data.message || "Failed to create event.");
      }
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Server error. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
      <div className="max-w-2xl mx-auto mb-6">
        <Link href="/allEvents" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-teal-400 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Events
        </Link>
      </div>

      <h1 className="text-3xl font-extrabold text-white tracking-tight">Create a Community Event</h1>
      <p className="mt-1.5 text-xs text-slate-400">Organize a local relief effort, environmental cleanup, or community support drive.</p>

      {error && (
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-red-500/50 bg-red-950/40 p-3.5 text-xs font-medium text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="text-xs font-bold text-slate-300">Event Title *</label>
          <input required type="text" name="title" placeholder="Event Title" className="w-full mt-1.5 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300">Event Type *</label>
            <select name="eventType" className="w-full mt-1.5 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white">
              <option value="Donation">Donation</option>
              <option value="Cleanup">Cleanup</option>
              <option value="Plantation">Plantation</option>
              <option value="Health Camp">Health Camp</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-300">Event Date *</label>
            <input required type="date" name="eventDate" className="w-full mt-1.5 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white" />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300">Location *</label>
          <input required type="text" name="location" placeholder="Location" className="w-full mt-1.5 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white" />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300">Thumbnail URL *</label>
          <input required type="url" name="thumbnail" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} placeholder="Image URL" className="w-full mt-1.5 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white" />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300">Description *</label>
          <textarea required rows={4} name="description" placeholder="Description..." className="w-full mt-1.5 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white" />
        </div>

        {/* Organizer Email Attached Display */}
        <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 px-4 text-xs">
          <span className="text-slate-500 font-medium">Organizer Email attached:</span>
          <span className="font-bold text-teal-400">{userEmail}</span>
        </div>

        <button type="submit" disabled={loading} className="w-full rounded-xl bg-teal-600 py-3.5 text-xs font-bold text-white hover:bg-teal-500 transition-all flex items-center justify-center gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          <span>Publish Event</span>
        </button>
      </form>
    </div>
  );
}