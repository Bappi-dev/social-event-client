import Link from "next/link";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Logo & Brand Summary */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 ring-2 ring-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.35)]">
                <svg
                  className="h-6 w-6 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v18m9-9H3m15.364-6.364L6.364 18.364M18.364 17.636L6.364 5.636"
                  />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-wide text-white">
                Good<span className="text-cyan-400">Gather</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              A community-driven social platform connecting volunteers with
              grassroots winter drives, food distribution, and emergency relief
              programs.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span>support@goodgather.org</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-cyan-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Volunteer Routes */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Get Involved</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/events/create"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Organize Event
                </Link>
              </li>
              <li>
                <Link
                  href="/events/joined"
                  className="hover:text-cyan-400 transition-colors"
                >
                  My Joined Drives
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Volunteer Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Stay Connected</h4>
            <p className="text-xs text-slate-400">
              Follow us on social channels to get immediate campaign alerts.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {/* Updated X Logo */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-800/80 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} GoodGather. Built for Grassroots
            Action.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-orange-400 fill-orange-400" />
            <span>for community service.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
