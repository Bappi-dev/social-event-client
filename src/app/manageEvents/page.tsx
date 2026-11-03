import ManageEventsCard from "@/components/events/ManageEventsCard";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getTokenFormServer } from "@/lib/getTokenFormServer";
import { CirclePlus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

interface IEvent {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  description: string;
}

const ManageEventsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const token = await getTokenFormServer();
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${user?.email}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return (
      <div className="text-center py-10 text-red-400">
        Failed to load events.
      </div>
    );
  }

  const manageEvents: IEvent[] = await res.json();
  console.log("evnets", manageEvents);

  return (
    <div className="container mx-auto my-8 px-4 max-w-6xl">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-slate-800 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Manage My Events
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-md">
            View, edit, and manage the social drives you have published.
          </p>
        </div>

        <Button className="bg-teal-600 text-white font-semibold hover:bg-teal-500 rounded-xl gap-2">
          <Link className="flex items-center gap-1" href="/Events">
            <CirclePlus className="h-4 w-4" /> Create New Event
          </Link>
        </Button>
      </header>

      {/* Events Container */}
      <div className="grid grid-cols-1 gap-4">
        {Array.isArray(manageEvents) && manageEvents.length > 0 ? (
          manageEvents.map((event) => (
            <ManageEventsCard key={event._id} event={event} />
          ))
        ) : (
          <div className="rounded-2xl  p-12 text-center my-8">
            <p className="text-slate-400 text-sm">
              You have not created any events yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEventsPage;
