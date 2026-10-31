
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Share2,
  HeartHandshake,
  ShieldCheck,
  Mail,
  ArrowLeft,
 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notFound } from "next/navigation";
import Link from "next/link";
import { EditEvent } from "@/components/sheard/EditEvents";
import { DeleteEvent } from "@/components/sheard/DeleteEvent";

async function getEventDetails(id: string) {
  try {
    const res = await fetch(`http://localhost:5000/events/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventDetails(id);
  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex justify-between items-center mb-5">
          <Link href={"/allEvents"}>
            <p className="flex items-center gap-1 text-xl text-gray-400">
              <ArrowLeft size={15} /> Back to Events
            </p>
          </Link>
          <div className="lg:flex gap-2">
            <EditEvent event={event} />
            <DeleteEvent />
          </div>
        </div>

        {/* Main Card Wrapper */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl border border-slate-100">
          {/* 1. Hero Banner Section */}
          <div className="relative h-72 sm:h-96 w-full bg-slate-950">
            <Image
              src={event.thumbnail || "/placeholder.jpg"}
              alt={event.title || "Event Banner"}
              fill
              className="object-cover opacity-80"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Event Type Badge */}
            <div className="absolute top-6 left-6 rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-white border border-white/30 flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-teal-400"></span>
              {event.eventType || event.category || "Social Initiative"}
            </div>

            {/* Title & Meta Info */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg">
                  <MapPin className="size-4 text-teal-400" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg">
                  <Calendar className="size-4 text-teal-400" />
                  <span>{event.eventDate || event.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Action Bar (Volunteers & Join Button) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <HeartHandshake className="size-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">
                  0 Volunteers Joined
                </h3>
                <p className="text-xs text-slate-500">
                  Sign up to join hands for this drive
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl size-11"
              >
                <Share2 className="size-4 text-slate-600" />
              </Button>
              <Button className="rounded-xl bg-teal-600 hover:bg-teal-700 text-white px-6 h-11 font-semibold shadow-lg shadow-teal-600/20">
                Join Event
              </Button>
            </div>
          </div>

          {/* 3. Content & Organizer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-8">
            {/* Left: About & Guidelines */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">
                  About this Social Initiative
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {event.description}
                </p>
              </div>

              {/* Volunteer Guidelines */}
              <div className="space-y-4 rounded-2xl bg-slate-50 p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-teal-800">
                  Volunteer Guidelines
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <span className="size-2 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                    <span>
                      Please arrive 15 minutes before the scheduled time at the
                      designated location.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-2 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                    <span>
                      Wear comfortable clothing suitable for physical social
                      work and distribution.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-2 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                    <span>
                      Bring any pre-coordinated relief packages or distribution
                      items if requested.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Organizer Card */}
            <div>
              <div className="rounded-2xl border border-slate-200/80 p-5 space-y-4 bg-white shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Initiative Organizer
                </h4>

                <div className="flex items-center gap-3">
                  <Avatar className="size-12 border">
                    <AvatarImage src={event.organizerImage || ""} />
                    <AvatarFallback className="bg-teal-100 text-teal-800 font-bold">
                      {event.organizer ? event.organizer[0] : "O"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">
                      {event.organizer || "Mirpur Youth Volunteers"}
                    </h5>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Mail className="size-3" />
                      organizer@goodgather.org
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-medium text-teal-600">
                  <ShieldCheck className="size-4" />
                  <span>Verified Platform Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
