import MyJoinCard from "@/components/events/MyJoinCard";
import { getTokenFormServer } from "@/lib/getTokenFormServer";
import React from "react";

const JoinEvent = async () => {
   const  token = await getTokenFormServer()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events-join`, {
    cache: "no-store",
    headers:{
       authorization: `Bearer ${token}`,
    }
  });
  
  const joinEvent = await res.json();

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
