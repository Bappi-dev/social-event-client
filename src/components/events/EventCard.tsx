"use client";
import { Calendar, MapPin, ArrowRight, CalendarDays } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export type EventCardProps = {
  _id: string;
  title: string;
  eventDate: string;
  date: string;
  location: string;
  description: string;
  organizer: string;
  thumbnail: string;
};

export default function EventCard({ event }: { event: EventCardProps }) {
  const { _id } = event;
  return (
    <Card className="group overflow-hidden rounded-2xl border bg-card p-0 shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          width={400}
          height={400}
          src={event.thumbnail}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Date chip */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
          <Calendar className="size-3 text-teal-300" />
          {event.date}
        </div>
      </div>

      {/* Body */}
      <CardContent className="space-y-2 px-4 pb-0 pt-4">
        <h3 className="line-clamp-1 text-base font-bold tracking-tight text-foreground">
          {event.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-teal-600" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5 text-teal-600" />
          <span className="line-clamp-1">{event.eventDate}</span>
        </div>

        <p className="line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-muted-foreground">
          {event.description}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-4 pb-4 pt-2">
        <Link href={`/allEvents/${_id}`}>
          <Button className="w-full gap-2 bg-teal-600 text-white hover:bg-teal-700">
            View Event <ArrowRight className="size-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

/* ---------- Usage ----------
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <EventCard
    id="1"
    title="Winter Clothes Distribution"
    category="Donation"
    date="Sun, Nov 15, 2026"
    location="Mirpur 10, Dhaka"
    description="Collecting and distributing warm clothes, jackets, sweaters, and shawls to underprivileged families."
    organizer="Mirpur Youth Volunteers"
    image="/images/winter.jpg"
    href="/events/1"
  />
</div>
*/
