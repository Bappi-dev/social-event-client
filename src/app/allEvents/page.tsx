"use client";
import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import EventCard from "@/components/events/EventCard";


const AllEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = `${process.env.NEXT_PUBLIC_API_URL}/events`;
        const response = await fetch(res, {
          cache: "no-store",
        });
        const result = await response.json();
        
  
        if (Array.isArray(result)) {
          setEvents(result);
        } else if (result && Array.isArray(result.data)) {
          setEvents(result.data);
        } else if (result && Array.isArray(result.events)) {
          setEvents(result.events);
        } else {
          setEvents([]); 
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const safeEvents = Array.isArray(events) ? events : [];

  const upcomingEvents = safeEvents.filter((event) => {
    if (!event || (!event.eventDate && !event.date)) return false;
    const eventDate = new Date(event.eventDate || event.date);
    return eventDate >= currentDate;
  });

  const sortedEvents = [...upcomingEvents].sort((a, b) => {
    if (sortBy === "latest") {
      return (
        new Date(b.eventDate || 0).getTime() -
        new Date(a.eventDate || 0).getTime()
      );
    } else if (sortBy === "oldest") {
      return (
        new Date(a.eventDate || 0).getTime() -
        new Date(b.eventDate || 0).getTime()
      );
    } else if (sortBy === "title-asc") {
      return (a.title || "").localeCompare(b.title || "");
    } else if (sortBy === "title-desc") {
      return (b.title || "").localeCompare(a.title || "");
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Upcoming Events</h1>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            Sort By:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex h-10 w-full md:w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="latest">Latest Date</option>
            <option value="oldest">Oldest Date</option>
            <option value="title-asc">Title (A - Z)</option>
            <option value="title-desc">Title (Z - A)</option>
          </select>
        </div>
      </div>

      {sortedEvents.length === 0 ? (
        <p className="text-center text-muted-foreground py-10">
          No upcoming events found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <EventCard key={event._id || event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEvents;