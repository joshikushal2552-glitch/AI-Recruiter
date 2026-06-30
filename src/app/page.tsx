'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion' // Fixed missing import wrapper parameter
import { ThemeToggle } from '@/components/theme-toggle'
import { ArrowRight, Sparkles, Brain, Briefcase, Compass, Users, ChevronDown, ShieldCheck } from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()
  const [emailInput, setEmailInput] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput.trim()) return
    router.push(`/signup?email=${encodeURIComponent(emailInput.trim())}`)
  }

  const faqItems = [
    { q: "How do Autonomous AI Resume Agents optimize my application score?", a: "The processing layers dynamically match your selectable text against real enterprise aggregate keywords parameters to uncover alignment gaps instantly." },
    { q: "Does the Market Scraper view point to live open aggregate postings?", a: "Yes, it pulls data directly from high-volume sites like Indeed and LinkedIn, providing absolute destination URLs alongside expected USD salary metrics." },
    { q: "Can I try out the custom AI Mock Interview Simulators completely free?", a: "Our baseline dev tier is free forever. To unlock interactive mock interview simulators and custom question generation models, simply activate an entitlement plan." }
  ]

  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-neutral-50 dark:bg-[#060612] text-neutral-900 dark:text-white transition-colors duration-200">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-brand-purple/5 to-transparent pointer-events-none z-0" />

      {/* Navigation Header */}
      <header className="w-full bg-white/80 dark:bg-[#060612]/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-lg tracking-tight select-none">
            <span className="bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent">ATS ANALYZER</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            <a href="#features" className="hover:text-brand-pink transition-colors">Features</a>
            <Link href="/pricing" className="hover:text-brand-pink transition-colors">Pricing</Link>
            <a href="#faq" className="hover:text-brand-pink transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login" className="text-xs font-bold uppercase tracking-wider hover:text-brand-cyan transition-colors">Login</Link>
            <Link href="/signup" className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-lg shadow-md hover:opacity-90 transition-opacity">Try started</Link>
          </div>
        </div>
      </header>

      {/* Hero Content Section */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 flex flex-col items-center justify-center text-center py-20 z-10 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-purple/20 bg-brand-purple/5 text-[10px] text-brand-pink font-bold tracking-widest uppercase mb-6"><Sparkles size={10} /> Next-Generation AI Recruiting Engine</div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-[1.15] text-neutral-950 dark:text-white">
          Optimize Your Placement with <br />
          <span className="bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent">Autonomous AI Resume Agents.</span>
        </h1>

        <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl mb-10 leading-relaxed">Upload your resume for real-time target optimization, extract dynamic career upskilling roadmaps with direct-link training courses, and scrape premium US-based jobs with executive contact profiles instantly.</p>

        <form onSubmit={handleIntakeSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-2 p-1.5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 backdrop-blur-md shadow-lg mb-24">
          <input type="email" required placeholder="Enter your email to analyze resume" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="flex-1 bg-transparent px-4 py-2.5 text-sm focus:outline-none text-neutral-950 dark:text-white placeholder-neutral-400" />
          <button type="submit" className="px-5 py-2.5 bg-brand-cyan hover:bg-brand-cyan/90 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap">Try it now <ArrowRight size={14} /></button>
        </form>

        <section id="features" className="w-full pt-16 border-t border-neutral-200 dark:border-neutral-900 scroll-mt-20">
          <h2 className="text-xl font-bold tracking-wider uppercase text-center mb-10 text-neutral-950 dark:text-white">Engineered Feature Architecture</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            {[
              { title: 'Deep Resume Parsing', icon: Brain, desc: 'Analyze structural gaps, benchmark strong skill profiles, and generate real-time metrics optimization instantly.' },
              { title: 'Interactive Roadmaps', icon: Compass, desc: 'Unlock targeted career trajectories mapped with precise external deep-links to active upskilling programs.' },
              { title: 'US Market Scraping', icon: Briefcase, desc: 'Locate relevant job openings across the US matching your specific target criteria and desired salary brackets.' },
              { title: 'Executive Outreach', icon: Users, desc: 'Extract key corporate decision makers complete with corporate emails and LinkedIn profiles for direct networking.' }
            ].map((feat) => (
              <div key={feat.title} className="glass-panel p-5 rounded-xl hover:border-brand-purple/30 transition-colors shadow-sm group">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-4 text-brand-cyan group-hover:text-brand-pink transition-colors"><feat.icon size={18} /></div>
                <h3 className="font-bold text-xs uppercase tracking-wider mb-2 text-neutral-950 dark:text-white">{feat.title}</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="w-full pt-28 pb-12 border-t border-neutral-200 dark:border-neutral-900 mt-28 max-w-3xl mx-auto text-left scroll-mt-20">
          <div className="text-center space-y-2 mb-12">
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">Knowledge Base Support</h3>
            <h2 className="text-2xl font-black uppercase text-neutral-950 dark:text-white tracking-tight">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = expandedFaq === idx
              return (
                <div key={idx} className="bg-white dark:bg-[#0b0b1e] border border-neutral-200 dark:border-neutral-900/60 rounded-xl overflow-hidden shadow-sm transition-all">
                  <button 
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white cursor-pointer bg-transparent border-none"
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={14} className={`text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-pink' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="px-5 pb-5 pt-1 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed border-t border-neutral-50 dark:border-neutral-950/60">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="w-full text-center py-6 border-t border-neutral-200 dark:border-neutral-900 text-xs text-neutral-400 bg-white/50 dark:bg-transparent z-10">&copy; 2026 ATS Analyzer Inc. All rights reserved.</footer>
    </div>
  )
}