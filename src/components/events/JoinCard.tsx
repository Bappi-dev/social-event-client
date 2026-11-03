'use client'
import { HeartHandshake, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";
import { getTokenFormClient } from "@/lib/getTokenFormClinet";

interface IEventJoin {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  description: string;
}

const JoinCard = ({ event }: { event: IEventJoin }) => {

  const handleJoined = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ...event,
      JoinDate: new Date(),
    };
 
    const token = await getTokenFormClient()
      
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events-join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
           authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);
       toast.add({
        description:"Successfully joined the event!",
        type:'success'
       })
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-b border-b-gray-500">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
            <HeartHandshake className="size-6" />
          </div>
          <div>
            <h3 className="font-bold">
              Volunteers Joined
            </h3>
            <p className="text-xs">
              Sign up to join hands for this drive
            </p>
          </div>
        </div>
        <form onSubmit={handleJoined}>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-xl size-11"
            >
              <Share2 className="size-4" />
            </Button>
            <Button
              type="submit"
              className="rounded-xl cursor-pointer bg-teal-600 hover:bg-teal-700 text-white px-6 h-11 font-semibold shadow-lg shadow-teal-600/20"
            >
              Join Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinCard;