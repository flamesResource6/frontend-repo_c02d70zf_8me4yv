export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-zinc-300 via-zinc-100 to-zinc-400 shadow-inner mb-3" />
          <p className="text-zinc-400 text-sm max-w-sm">Exotic & luxury car rental in Phoenix, Scottsdale, and Tempe. White-glove delivery. Self-drive and chauffeur.</p>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Service Areas</h4>
          <ul className="space-y-2 text-zinc-400 text-sm">
            <li>Phoenix</li>
            <li>Scottsdale</li>
            <li>Tempe</li>
            <li>PHX Airport Delivery</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-zinc-400 text-sm">
            <li>WhatsApp: +1 (555) 555-5555</li>
            <li>Phone: +1 (480) 555-0123</li>
            <li>Email: concierge@blacklabel.example</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-zinc-500">© {new Date().getFullYear()} Black Label Luxury Rentals</div>
    </footer>
  );
}
