import {
  ShieldCheck,
  HeartHandshake,
  Zap,
  Users,
  Sparkles,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-cyan-400" />,
      title: "Verified Community Initiatives",
      description:
        "Every event and winter drive is thoroughly checked to ensure real-world social impact and authenticity.",
    },
    {
      icon: <Zap className="h-6 w-6 text-orange-400" />,
      title: "Instant One-Click Participation",
      description:
        "No complex steps. Join any local relief drive or volunteer campaign with a single click.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-emerald-400" />,
      title: "Direct Grassroots Action",
      description:
        "Connect directly with local campaign organizers without middleman friction or delay.",
    },
    {
      icon: <Users className="h-6 w-6 text-sky-400" />,
      title: "Active Volunteer Network",
      description:
        "Be part of thousands of compassionate citizens bringing relief and warmth during emergency cold waves.",
    },
  ];

  return (
    <section className="relative overflow-hidden  py-10 border-t">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full  border-gray-200 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur-md mb-4">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Why Choose GoodGather</span>
          </div>
          <h2 className="text-3xl font-extrabold  sm:text-4xl">
            Empowering You to Make a Difference
          </h2>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            We bridge the gap between passionate volunteers and local community
            needs through a transparent, efficient, and user-centric platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border   p-6 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl  group-hover:border-cyan-500/40 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-base font-bold group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
