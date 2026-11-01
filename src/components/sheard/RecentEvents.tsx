import { Sparkles } from "lucide-react";

const RecentEvents = () => {
  return (
    <div className="bg-slate-950">
      <div className="container mx-auto p-10">
          <span className="flex text-cyan-400 items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-cyan-400" /> Winter Social Drive 2026</span>
          <h1 className="text-4xl text-white font-bold">
            Recent Upcoming Events
          </h1>
        
      </div>
    </div>
  );
};

export default RecentEvents;
