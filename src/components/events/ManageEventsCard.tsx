"use client";

import { useState } from "react";
import { Calendar, MapPin, Tag, Trash2, Loader2 } from "lucide-react";
import Image from "next/image";
import { EditEvent } from "./EditEvents";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";

interface IEvent {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  description: string;
}

export default function ManageEventsCard({ event }: { event: IEvent }) {
    console.log('evevt',event);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();


  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.add({
          description: "Event deleted successfully! 🗑️",
          type:'success'
        });
        router.refresh(); 
      } 
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="group flex flex-col sm:flex-row  items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition-all hover:border-slate-700 hover:shadow-lg">
      
      {/* Event Image & Core Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-950">
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded-md border border-cyan-500/20">
            <Tag className="h-3 w-3" />
            {event.eventType}
          </div>

          <h3 className="text-base font-bold text-white line-clamp-1">
            {event.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-500" />
              {event.eventDate}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-slate-500" />
              <span className="line-clamp-1">{event.location}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Actions (Edit & Delete) */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
        {/* Edit Component */}
        <EditEvent event={event} onUpdateSuccess={() => router.refresh()} />

        {/* Delete Button */}
        <Button
          variant="outline"
          onClick={() => handleDelete(event._id)}
          disabled={deleting}
          className="border-slate-800 bg-slate-950 text-red-400 hover:bg-red-950/30 hover:text-red-300 hover:border-red-900/50 gap-1.5 cursor-pointer h-9 px-3 text-xs"
        >
          {deleting ? (
            <Loader2 className="h-4 w-4 animate-spin text-red-400" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          <span>Delete</span>
        </Button>
      </div>

    </div>
  );
}