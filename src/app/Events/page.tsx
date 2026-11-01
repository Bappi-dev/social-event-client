import CreateEventForm from "@/components/events/CreateEventForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function CreateEventPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user?.email) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Please login first to create an event.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4">
      <CreateEventForm userEmail={user.email} />
    </div>
  );
}