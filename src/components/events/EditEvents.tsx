"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PencilSparkles } from "lucide-react";
import { toast } from "../ui/toast";

interface IEvents {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  description: string;
}

export function EditEvent({ event, onUpdateSuccess }: { event: IEvents; onUpdateSuccess?: () => void }) {
  const [eventData, setEventData] = useState<IEvents>(event);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof IEvents, value: string) =>
    setEventData((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { _id, ...updatedData } = eventData;

      const res = await fetch(`http://localhost:5000/events/${event._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();
      console.log("Updated successfully:", result);

      if (res.ok) {
        setIsOpen(false); 
        toast.add({
          title: "Event updated successfully! 🎉",
          type: 'success',
        });
        if (onUpdateSuccess) 
            onUpdateSuccess(); 
      } else {
        alert("Failed to update event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger >
        <Button variant={"outline"} className="gap-1.5  cursor-pointer">
          <PencilSparkles className="h-4 w-4 text-cyan-400" /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-black border border-slate-800 text-white shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Event</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Make changes to your community event here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {/* Title */}
            <Field>
              <Label htmlFor="title" className="text-xs font-semibold text-slate-300">Title</Label>
              <Input
                id="title"
                value={eventData.title}
                onChange={(e) => update("title", e.target.value)}
                required
                className="bg-slate-950 border-slate-800 text-white text-xs mt-1"
              />
            </Field>

            {/* Event Type */}
            <Field>
              <Label htmlFor="eventType" className="text-xs font-semibold text-slate-300">Event Type</Label>
              <Input
                id="eventType"
                value={eventData.eventType}
                onChange={(e) => update("eventType", e.target.value)}
                required
                className="bg-slate-950 border-slate-800 text-white text-xs mt-1"
              />
            </Field>

            {/* Event Date */}
            <Field>
              <Label htmlFor="eventDate" className="text-xs font-semibold text-slate-300">Event Date</Label>
              <Input
                id="eventDate"
                type="date"
                value={eventData.eventDate}
                onChange={(e) => update("eventDate", e.target.value)}
                required
                className="bg-slate-950 border-slate-800 text-white text-xs mt-1"
              />
            </Field>

            {/* Location */}
            <Field>
              <Label htmlFor="location" className="text-xs font-semibold text-slate-300">Location</Label>
              <Input
                id="location"
                value={eventData.location}
                onChange={(e) => update("location", e.target.value)}
                required
                className="bg-slate-950 border-slate-800 text-white text-xs mt-1"
              />
            </Field>

            {/* Thumbnail URL */}
            <Field>
              <Label htmlFor="thumbnail" className="text-xs font-semibold text-slate-300">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                type="url"
                value={eventData.thumbnail}
                onChange={(e) => update("thumbnail", e.target.value)}
                required
                className="bg-slate-950 border-slate-800 text-white text-xs mt-1"
              />
            </Field>

            {/* Description */}
            <Field>
              <Label htmlFor="description" className="text-xs font-semibold text-slate-300">Description</Label>
              <Input
                id="description"
                value={eventData.description}
                onChange={(e) => update("description", e.target.value)}
                required
                className="bg-slate-950 border-slate-800 text-white text-xs mt-1"
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-4 border-t border-slate-800 flex gap-2">
            <DialogClose>
              <Button type="button" variant="outline" className="border-slate-700 cursor-pointer bg-slate-900 text-slate-200 hover:bg-slate-800">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading} className="bg-cyan-500 cursor-pointer text-slate-950 font-bold hover:bg-cyan-400">
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}