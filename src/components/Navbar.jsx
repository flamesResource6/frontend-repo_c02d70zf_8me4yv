import { useMemo } from "react";
import { Menu, Phone, MessageCircle } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/fleet", label: "Fleet" },
  { to: "/services", label: "Services" },
  { to: "/experiences", label: "Experiences" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact / Book" },
];

export default function Navbar() {
  const whatsappHref = useMemo(() => {
    const text = encodeURIComponent("Hello Black Label – I'd like a quote.");
    return `https://wa.me/15555555555?text=${text}`;
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-zinc-300 via-zinc-100 to-zinc-400 shadow-inner" />
          <span className="text-sm tracking-widest uppercase text-zinc-200 group-hover:text-white transition">Black Label</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) => `text-sm text-zinc-300 hover:text-white transition ${isActive ? 'text-white' : ''}`}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium text-black bg-gradient-to-r from-[#C7A341] via-[#E7C65B] to-[#B8902C] shadow hover:opacity-95 transition">
            <MessageCircle size={16} /> WhatsApp
          </a>
          <a href="tel:+14805550123" className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium text-zinc-100 border border-white/20 hover:bg-white/5 transition">
            <Phone size={16} /> Call
          </a>
        </div>
        <button className="md:hidden p-2 text-zinc-200" aria-label="Open menu">
          <Menu />
        </button>
      </div>
    </header>
  );
}
