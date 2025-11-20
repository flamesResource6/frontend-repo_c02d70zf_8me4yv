import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function FeaturedFleet() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/vehicles`)
      .then((r) => r.json())
      .then((d) => setItems(d.slice(0, 6)))
      .catch(() => setItems([]));
  }, []);

  return (
    <section className="bg-[#0A0A0A] py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl text-white font-semibold">Featured Fleet</h2>
          <Link to="/fleet" className="text-sm text-zinc-300 hover:text-white">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((v, idx) => (
            <motion.div key={v.slug || idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="group relative rounded-xl overflow-hidden bg-[#0E0E0F] border border-white/10">
              <div className="aspect-[16/10] bg-black/40">
                {v.images?.[0] ? (
                  <img src={v.images[0]} alt={`${v.make} ${v.model}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-t from-zinc-900 to-zinc-800" />
                )}
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">{v.year} {v.make} {v.model}</h3>
                  <p className="text-zinc-400 text-sm">{v.type?.toUpperCase()}</p>
                </div>
                {typeof v.price_per_day === 'number' && (
                  <div className="text-right">
                    <p className="text-white font-semibold">${v.price_per_day.toLocaleString()}/day</p>
                    <p className="text-zinc-400 text-xs">+ deposit</p>
                  </div>
                )}
              </div>
              <div className="p-4 pt-0 flex gap-3">
                <Link to={`/fleet/${v.slug}`} className="px-3 py-2 rounded-full text-xs font-medium text-black bg-gradient-to-r from-[#C7A341] via-[#E7C65B] to-[#B8902C]">View Details</Link>
                <a href={`/contact?vehicle=${encodeURIComponent(v.slug)}`} className="px-3 py-2 rounded-full text-xs font-medium text-zinc-100 border border-white/20">Request Quote</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
