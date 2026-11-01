import MyJoinCard from "@/components/events/MyJoinCard";
import React from "react";

const JoinEvent = async () => {
  const res = await fetch("http://localhost:5000/events-join", {
    cache: "no-store"
  });
  const joinEvent = await res.json();
  console.log(joinEvent);

  return (
    <div className="container mx-auto p-5">
      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight">Joined Events</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(joinEvent) && joinEvent.length > 0 ? (
            joinEvent.map((event) => (
              <MyJoinCard key={event._id} event={event} />
            ))
          ) : (
            <p className="text-slate-500">No joined events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinEvent;
