import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedFleet from './components/FeaturedFleet'
import Footer from './components/Footer'

function HomePage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      <Hero />
      <TrustStrip />
      <FeaturedFleet />
      <CTA />
    </main>
  )
}

function TrustStrip() {
  const items = [
    'PHX Delivery',
    '24/7 Concierge',
    'Fully Insured',
    'Curated Fleet'
  ]
  return (
    <section className="bg-[#0A0A0A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((t) => (
          <div key={t} className="text-center text-zinc-300 text-sm">{t}</div>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="bg-[#0A0A0A] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold">Phoenix. Scottsdale. Tempe.</h3>
        <p className="text-zinc-400 mt-3">Request a quote now. A concierge will reply in minutes during operating hours.</p>
        <a href="/contact" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-[#C7A341] via-[#E7C65B] to-[#B8902C]">Request a Quote</a>
      </div>
    </section>
  )
}

function FleetPage() {
  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen">
      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold">The Fleet</h1>
        <p className="text-zinc-400 mt-2">Supercars and executive SUVs, tailored to the occasion.</p>
        <FeaturedFleet />
      </div>
    </main>
  )
}

function VehicleDetailPage() {
  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen">
      <div className="pt-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold">Vehicle</h1>
        <p className="text-zinc-400 mt-2">Details coming soon.</p>
      </div>
    </main>
  )
}

function ContactPage() {
  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen">
      <div className="pt-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold">Book Your Arrival</h1>
        <p className="text-zinc-400 mt-2">A concierge will respond within minutes during operating hours.</p>
        <QuoteForm />
      </div>
    </main>
  )
}

import { useState } from 'react'
const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function QuoteForm() {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(null)
  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setOk(null)
    const form = new FormData(e.currentTarget)
    const payload = {
      first_name: form.get('first_name'),
      last_name: form.get('last_name'),
      email: form.get('email'),
      phone: form.get('phone'),
      preferred_contact: form.get('preferred_contact'),
      payload: {
        vehicle_slug: form.get('vehicle_slug') || undefined,
        drive_mode: form.get('drive_mode') || undefined,
        start_date: form.get('start_date') || undefined,
        end_date: form.get('end_date') || undefined,
        delivery_location: form.get('delivery_location') || undefined,
        occasion: form.get('occasion') || undefined,
      }
    }
    const res = await fetch(`${API_BASE}/api/lead`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    setOk(data.ok)
    setLoading(false)
    if (data.ok) e.currentTarget.reset()
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 gap-4" id="quote">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="first_name" required placeholder="First name" className="bg-[#0E0E0F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-zinc-400" />
        <input name="last_name" required placeholder="Last name" className="bg-[#0E0E0F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-zinc-400" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="email" type="email" required placeholder="Email" className="bg-[#0E0E0F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-zinc-400" />
        <input name="phone" required placeholder="Phone" className="bg-[#0E0E0F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-zinc-400" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input name="vehicle_slug" placeholder="Vehicle (optional)" className="bg-[#0E0E0F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-zinc-400" />
        <select name="drive_mode" className="bg-[#0E0E0F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-zinc-400">
          <option value="">Drive mode</option>
          <option value="self-drive">Self-Drive</option>
          <option value="chauffeur">Chauffeur</option>
        </select>
        <select name="preferred_contact" className="bg-[#0E0E0F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-zinc-400">
          <option value="whatsapp">WhatsApp</option>
          <option value="phone">Phone</option>
          <option value="email">Email</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="start_date" type="date" className="bg-[#0E0E0F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-zinc-400" />
        <input name="end_date" type="date" className="bg-[#0E0E0F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-zinc-400" />
      </div>
      <input name="delivery_location" placeholder="Delivery location (PHX, Scottsdale, Tempe)" className="bg-[#0E0E0F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-zinc-400" />
      <select name="occasion" className="bg-[#0E0E0F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-zinc-400">
        <option value="">Occasion</option>
        <option>nightlife</option>
        <option>wedding</option>
        <option>corporate</option>
        <option>weekend</option>
        <option>other</option>
      </select>
      <button disabled={loading} className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-[#C7A341] via-[#E7C65B] to-[#B8902C] disabled:opacity-60">{loading ? 'Submitting…' : 'Request a Quote'}</button>
      {ok && <p className="text-emerald-400 text-sm">Thanks. A concierge will contact you shortly.</p>}
    </form>
  )
}

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <div className="pt-16">{children}</div>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/fleet/:slug" element={<VehicleDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}

export default App
