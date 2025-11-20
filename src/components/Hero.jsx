import { motion } from 'framer-motion';
import { useEffect, useMemo, useState, Suspense } from 'react';

// Lazy-load Spline only when we actually intend to render it
const LazySpline = ({ scene }) => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    let mounted = true;
    import('@splinetool/react-spline')
      .then((mod) => {
        if (mounted) setComponent(() => mod.default);
      })
      .catch(() => {
        // If Spline fails to load, silently fall back
        if (mounted) setComponent(null);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (!Component) return null;
  return <Component scene={scene} />;
};

export default function Hero() {
  const [shouldUseSpline, setShouldUseSpline] = useState(false);

  // Read Spline scene URL from env; if not present, we disable Spline to avoid runtime errors
  const splineScene = useMemo(() => import.meta.env.VITE_SPLINE_SCENE?.trim() || '', []);

  useEffect(() => {
    // Respect reduced motion and avoid on very low-end devices
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;

    // Only enable Spline if a valid scene URL is provided
    const hasScene = Boolean(splineScene && /^https?:\/\//.test(splineScene));
    setShouldUseSpline(!mq.matches && !isLowEnd && hasScene);
  }, [splineScene]);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(220,20,60,0.08),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(220,20,60,0.06),transparent_40%)]" />

      {shouldUseSpline ? (
        <div className="absolute inset-0 opacity-80">
          <Suspense fallback={null}>
            <LazySpline scene={splineScene} />
          </Suspense>
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
