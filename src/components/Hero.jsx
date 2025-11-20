import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [canRenderSpline, setCanRenderSpline] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    setCanRenderSpline(!mq.matches && !isLowEnd);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(220,20,60,0.08),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(220,20,60,0.06),transparent_40%)]" />

      {canRenderSpline ? (
        <div className="absolute inset-0 opacity-80">
          {/* Replace the URL below with the provided Spline scene URL */}
          <Spline scene="https://prod.spline.design/placeholder/scene.splinecode" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[url('/hero-fallback.jpg')] bg-cover bg-center opacity-60" />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.6, 0, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs tracking-[0.35em] text-zinc-400 uppercase mb-5">Phoenix • Scottsdale • Tempe</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[0.95]">
            Arrivals Only
          </h1>
          <p className="mt-6 text-zinc-300 text-lg max-w-2xl">
            Select from a curated fleet of statement vehicles, delivered to your door.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#quote" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-[#C7A341] via-[#E7C65B] to-[#B8902C] shadow hover:opacity-95 transition">
              Request a Quote
            </a>
            <a href="/fleet" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-zinc-100 border border-white/20 hover:bg-white/5 transition">
              Explore the Fleet
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-500 text-xs">Scroll</div>
    </section>
  );
}
