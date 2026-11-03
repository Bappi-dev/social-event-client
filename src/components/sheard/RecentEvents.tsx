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
import { getTokenFormServer } from "@/lib/getTokenFormServer";

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

  const token = await getTokenFormServer()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resent-events`, {
    cache: "no-store",
    headers:{
       authorization: `Bearer ${token}`,
    }
  });
  const resentData: IEvent[] = await res.json();
  // console.log(resentData);

  return (
    <div className="">
      <div className="container mx-auto p-10">
        <div className="flex justify-between items-center">
          <div>
            <span className="flex text-cyan-500 items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> Upcoming Initiatives  
            </span>
            <h1 className="text-4xl  font-bold mb-2">
              Recent Upcoming Events
            </h1>
            <p className="mb-8 text-slate-400">Latest 6 community drives scheduled in your city. Get involved today.</p>
          </div>
          <div>
            <Link href={'/allEvents'}><p className=" flex items-center gap-1 text-amber-200">View All Events <ArrowRight size={15} /></p></Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resentData.map((event) => (
            <div key={event._id}>
              <Card className="group overflow-hidden rounded-2xl   p-0 shadow-lg transition-all hover:border-teal-500/50 hover:shadow-xl">
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
                <CardContent className="space-y-2 px-4 pb-0 pt-4 ">
                  <h3 className="line-clamp-1 text-base font-bold tracking-tight  group-hover:text-teal-300 transition-colors">
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
                    <Button className="w-full gap-2 cursor-pointer bg-teal-600 text-green-400 hover:bg-teal-700">
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
