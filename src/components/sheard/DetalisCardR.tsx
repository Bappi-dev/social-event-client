'use client'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Mail, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";


const DetalisCardR = ({event}) => {
    const { data: session } = authClient.useSession();
  const user = session?.user;
  return (
    <div>
        {user ?  <div className="rounded-2xl border border-slate-200/80 p-5 space-y-4  shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Initiative Organizer
        </h4>

        <div className="flex items-center gap-3">
          <Avatar className="size-12 border">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-teal-100 text-teal-800 font-bold">
              {event.organizer ? event.organizer[0] : "O"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h5 className="font-bold text-sm">{user?.name}</h5>
            <p className="text-xs text-teal-500 flex items-center gap-1 mt-0.5">
              <Mail className="size-3" />
               {user?.email || "user@example.com"}
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-medium text-teal-600">
          <ShieldCheck className="size-4" />
          <span>Verified Platform Member</span>
        </div>
      </div> : ''
      }
      
    </div>
  );
};

export default DetalisCardR;
