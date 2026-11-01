import {
  ArrowRight,
  Calendar,
  CalendarDays,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface IEvent {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  description: string;
}

const RecentEvents = async () => {
  const res = await fetch("http://localhost:5000/resent-events", {
    cache: "no-store",
  });
  const resentData: IEvent[] = await res.json();
  // console.log(resentData);

  return (
    <div className="bg-slate-950">
      <div className="container mx-auto p-10">
        <div className="flex justify-between items-center">
          <div>
            <span className="flex text-cyan-400 items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> Winter Social
              Drive 2026
            </span>
            <h1 className="text-4xl text-white font-bold mb-8">
              Recent Upcoming Events
            </h1>
          </div>
          <div>
            <Link href={'/allEvents'}><p className="text-cyan-400 flex items-center gap-1">View All Events <ArrowRight size={15} /></p></Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resentData.map((event) => (
            <div key={event._id}>
              <Card className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-0 shadow-lg transition-all hover:border-teal-500/50 hover:shadow-xl">
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <Image
                    width={400}
                    height={400}
                    src={event.thumbnail}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Date chip */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
                    <Calendar className="size-3 text-teal-300" />
                    {event.eventDate}
                  </div>
                </div>

                {/* Body */}
                <CardContent className="space-y-2 px-4 pb-0 pt-4 text-slate-200">
                  <h3 className="line-clamp-1 text-base font-bold tracking-tight text-white group-hover:text-teal-300 transition-colors">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="size-3.5 text-teal-400" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <CalendarDays className="size-3.5 text-teal-400" />
                    <span className="line-clamp-1">{event.eventDate}</span>
                  </div>

                  <p className="line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-slate-400">
                    {event.description}
                  </p>
                </CardContent>

                {/* Footer */}
                <CardFooter className="px-4 pb-4 pt-2">
                  <Link href={`/events/${event._id}`} className="w-full">
                    <Button className="w-full gap-2 cursor-pointer bg-teal-600 text-white hover:bg-teal-700">
                      View Event <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentEvents;
