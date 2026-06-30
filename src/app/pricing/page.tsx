'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, ArrowLeft, Sparkles, Brain, Mic, ShieldCheck } from 'lucide-react'

export default function PricingPage() {
  const router = useRouter()

  const handleSelectPlan = (planName: string) => {
    router.push(`/checkout?plan=${encodeURIComponent(planName)}`)
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#050510] flex flex-col justify-between py-16 px-6 text-neutral-900 dark:text-white transition-colors duration-200">
      <div className="max-w-5xl w-full mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-brand-cyan transition-colors mb-2 select-none">
          <ArrowLeft size={14} /> Back to home
        </Link>

        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-cyan/10 text-[10px] text-brand-cyan font-extrabold uppercase tracking-wider">
            <Sparkles size={10} /> Scalable Access Vector Frameworks
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">Premium Sourcing Allocation Tiers</h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">Choose your deployment cycle to unlock next-generation deep recruitment simulation workflows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-[#0c0c1e] border border-neutral-200 dark:border-neutral-900 rounded-2xl p-6 shadow-md max-w-4xl mx-auto">
          <div className="flex gap-4 items-start">
            <div className="p-2.5 rounded-xl bg-brand-cyan/10 text-brand-cyan shrink-0"><Brain size={18} /></div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950 dark:text-white">Corporate Question Generator</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">Provide any active company identifier combined with a targeted job description. The specialized AI models will instantly synthesize high-probability interview question sets.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="p-2.5 rounded-xl bg-brand-pink/10 text-brand-pink shrink-0"><Mic size={18} /></div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950 dark:text-white">AI Interview Simulation Agent</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">Practice in an active custom mock interview simulator. The agent speaks questions directly over a voice stream. The system scores performance and tracks direct advice markers.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4">
          {[
            { name: '1 Month Core', cost: '$19', savings: 'Standard Entry Tier', flag: null },
            { name: '6 Month Power', cost: '$89', savings: 'Save 20% Core Value Matrix', flag: 'Most Selected' },
            { name: '1 Year Premium', cost: '$149', savings: 'Save 35% Continuous Access', flag: 'Best Yield Plan' },
          ].map((tier) => (
            <div key={tier.name} className={`bg-white dark:bg-[#0c0c1e] border rounded-2xl p-6 shadow-lg flex flex-col justify-between relative transition-all ${tier.flag ? 'border-brand-purple border-2 scale-[1.02]' : 'border-neutral-200 dark:border-neutral-900'}`}>
              {tier.flag && <div className="absolute top-0 right-6 transform -translate-y-1/2 px-2.5 py-0.5 rounded-full bg-brand-pink text-[9px] uppercase font-black tracking-widest text-white">{tier.flag}</div>}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-neutral-950 dark:text-white mb-1">{tier.name}</h3>
                <p className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wide mb-4">{tier.savings}</p>
                <div className="my-4 flex items-baseline gap-0.5 border-b border-neutral-100 dark:border-neutral-900 pb-4">
                  <span className="text-4xl font-black text-neutral-950 dark:text-white">{tier.cost}</span>
                  <span className="text-xs text-neutral-400">/ term link</span>
                </div>
                <ul className="space-y-3 text-left my-6 text-[11px] text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-brand-cyan shrink-0" /> Unlimited Dual-Provider Failover LLM Scans</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-brand-cyan shrink-0" /> Full US Market Direct Job Scraping Pipeline</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-brand-cyan shrink-0" /> Targeted Company Question Generation Models</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-brand-cyan shrink-0" /> Immersive Voice & Text AI Interview Simulators</li>
                </ul>
              </div>
              <button 
                onClick={() => handleSelectPlan(tier.name)}
                className="w-full block text-center py-2.5 bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm cursor-pointer hover:opacity-95 transition-opacity mt-4"
              >
                Buy Subscription
              </button>
            </div>
          ))}
        </div>
      </div>
      <footer className="w-full text-center py-6 text-[10px] text-neutral-400 uppercase tracking-widest border-t border-neutral-200 dark:border-neutral-900 mt-16">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-6">
          <span>&copy; 2026 ATS Analyzer. Secure Core Node Active.</span>
          <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-brand-cyan" /> AES-256 Cloud Token Standards Enforced</span>
        </div>
      </footer>
    </div>
  )
}