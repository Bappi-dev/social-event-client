"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Type,
  Tag,
  Calendar,
  MapPin,
  Image as ImageIcon,
  Send,
  AlertCircle,
} from "lucide-react";
import { toast } from "@/components/ui/toast";

export default function CreateEventPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const userEmail = "mypit@mailinator.com";

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
      creatorEmail: userEmail,
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
          type: "success",
        });
        router.push("/allEvents");
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
    <div className="min-h-screen py-12 px-4 flex justify-center items-center">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-950/40 px-3.5 py-1 text-xs font-semibold text-teal-400 mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Social Service Drive</span>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Create a Community Event
        </h1>
        <p className="mt-1.5 text-xs text-slate-400">
          Organize a local relief effort, environmental cleanup, or community
          support drive.
        </p>

        {/* Error Alert Box */}
        {error && (
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-red-500/50 bg-red-950/40 p-3.5 text-xs font-medium text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Event Title */}
          <div>
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
              Event Title <span className="text-red-400">*</span>
            </label>
            <div className="relative mt-1.5">
              <Type className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                required
                type="text"
                name="title"
                placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
                className="w-full  rounded-xl border border-teal-500/60 bg-slate-950 py-3 pl-10 pr-4 text-xs text-white placeholder:text-slate-600 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
              />
            </div>
          </div>

          {/* Event Type & Event Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Event Type Dropdown */}
            <div>
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                Event Type <span className="text-red-400">*</span>
              </label>
              <div className="relative mt-1.5">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <select
                  required
                  name="eventType"
                  defaultValue="Donation"
                  className="w-full appearance-none  rounded-xl border border-teal-500/60 bg-slate-950 py-3 pl-10 pr-4 text-xs text-white placeholder:text-slate-600 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
                >
                  <option value="Donation">Donation</option>
                  <option value="Cleanup">Cleanup</option>
                  <option value="Plantation">Plantation</option>
                  <option value="Health Camp">Health Camp</option>
                  <option value="Education Support">Education Support</option>
                </select>
              </div>
            </div>

            {/* Event Date Input */}
            <div>
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                Event Date <span className="text-red-400">*</span>
              </label>
              <div className="relative mt-1.5">
                <input
                  required
                  type="date"
                  name="eventDate"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full  rounded-xl border border-teal-500/60 bg-slate-950 py-3 pl-10 pr-4 text-xs text-white placeholder:text-slate-600 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
                />
              </div>
              <p className="mt-1 text-[10px] text-slate-500">
                Dates must be in the future (today or later)
              </p>
            </div>
          </div>

          {/* Location / Venue */}
          <div>
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
              Location / Venue <span className="text-red-400">*</span>
            </label>
            <div className="relative mt-1.5">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                required
                type="text"
                name="location"
                placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                className="w-full rounded-xl border border-teal-500/60 bg-slate-950 py-3 pl-10 pr-4 text-xs text-white placeholder:text-slate-600 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
              />
            </div>
          </div>

          {/* Thumbnail Image URL & Quick Presets */}
          <div>
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
              Thumbnail Image URL <span className="text-red-400">*</span>
            </label>
            <div className="relative mt-1.5">
              <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                required
                type="url"
                name="thumbnail"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full  rounded-xl border border-teal-500/60 bg-slate-950 py-3 pl-10 pr-4 text-xs text-white placeholder:text-slate-600 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
              />
            </div>

            {/* Quick Photo Presets */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <span className="text-slate-500 font-medium">
                Quick photo presets:
              </span>
              <button
                type="button"
                onClick={() =>
                  handlePresetClick(
                    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800",
                  )
                }
                className="hover:text-teal-400 hover:underline cursor-pointer"
              >
                Winter Clothes
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() =>
                  handlePresetClick(
                    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
                  )
                }
                className="hover:text-teal-400 hover:underline cursor-pointer"
              >
                Blanket Relief
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() =>
                  handlePresetClick(
                    "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
                  )
                }
                className="hover:text-teal-400 hover:underline cursor-pointer"
              >
                Cleanup
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() =>
                  handlePresetClick(
                    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
                  )
                }
                className="hover:text-teal-400 hover:underline cursor-pointer"
              >
                Tree Plantation
              </button>
            </div>
          </div>

          {/* Event Description */}
          <div>
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
              Event Description <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              rows={4}
              name="description"
              placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
              className="mt-1.5 w-full rounded-xl border border-teal-500/60 bg-slate-950 py-3 pl-10 pr-4 text-xs text-white placeholder:text-slate-600 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
            />
          </div>

          {/* Organizer Email Attached Display */}
          <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 px-4 text-xs">
            <span className="text-slate-500 font-medium">
              Organizer Email attached:
            </span>
            <span className="font-bold text-slate-200">{userEmail}</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl cursor-pointer bg-teal-600 py-3.5 text-xs font-bold text-white hover:bg-teal-500 transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            <span>{loading ? "Publishing..." : "Publish Event"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
