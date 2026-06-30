'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CreditCard, ShieldCheck, Sparkles, Loader2, CheckCircle2 } from 'lucide-react'

function CheckoutFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedPlan, setSelectedPlan] = useState('Professional Tier')
  const [backRoute, setBackRoute] = useState('/pricing') // Default fallback backpath URL
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  const [fullName, setFullName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  useEffect(() => {
    const planParam = searchParams.get('plan')
    const sourceParam = searchParams.get('from')
    
    if (planParam) setSelectedPlan(decodeURIComponent(planParam))
    
    // Dynamic rerouting adjustment logic context
    if (sourceParam === 'settings') {
      setBackRoute('/dashboard/settings')
    } else {
      setBackRoute('/pricing')
    }
  }, [searchParams])

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setCompleted(true)
      setTimeout(() => {
        router.push('/dashboard/settings')
      }, 1500)
    }, 1800)
  }

  if (completed) {
    return (
      <div className="bg-white dark:bg-[#0b0b1e] border border-neutral-200 dark:border-neutral-900 rounded-2xl p-8 shadow-xl text-center space-y-4 max-w-md w-full mx-auto">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle2 size={24} className="animate-bounce" />
        </div>
        <h2 className="text-xl font-black text-neutral-950 dark:text-white uppercase tracking-tight">Payment Approved</h2>
        <p className="text-xs text-neutral-400 leading-relaxed">Your account subscription was successfully provisioned. Redirecting back to configuration dashboard...</p>
      </div>
    )
  }

  return (
    <div className="max-w-md w-full mx-auto space-y-4">
      <Link href={backRoute} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-brand-purple dark:hover:text-brand-cyan transition-colors mb-2 select-none">
        <ArrowLeft size={14} /> Back to dashboard console
      </Link>

      <div className="bg-white dark:bg-[#0b0b1e] border border-neutral-200 dark:border-neutral-900 rounded-2xl p-8 shadow-xl grid grid-cols-1 gap-6">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-cyan/10 text-[9px] text-brand-cyan font-black uppercase tracking-wider">
            <Sparkles size={10} /> Secure Encryption Node
          </div>
          <h2 className="text-xl font-black text-neutral-950 dark:text-white uppercase tracking-tight">Billing Transaction</h2>
          <p className="text-xs text-neutral-400">Allocating premium tokens for: <strong className="text-brand-pink">{selectedPlan}</strong></p>
        </div>

        <form onSubmit={handleProcessPayment} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">Cardholder Full Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none text-neutral-950 dark:text-white"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">Credit Card Number</label>
            <div className="relative">
              <CreditCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                required
                maxLength={16}
                placeholder="4111 2222 3333 4444"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\s+/g, ''))}
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none text-neutral-950 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">Expiration Date</label>
              <input
                type="text"
                required
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none text-neutral-950 dark:text-white text-center"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">Security Code (CVC)</label>
              <input
                type="password"
                required
                placeholder="•••"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none text-neutral-950 dark:text-white text-center"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:opacity-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <ShieldCheck size={14} />}
            Authorize Secure Charge
          </button>
        </form>

        <div className="text-center text-[10px] text-neutral-400 flex items-center justify-center gap-1">
          <ShieldCheck size={12} className="text-brand-cyan" /> Secure Bank Link Active (SSL Encrypted)
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#050510] flex flex-col justify-center items-center p-6 relative transition-colors duration-200">
      <Suspense fallback={
        <div className="max-w-md w-full h-[350px] bg-white dark:bg-[#0b0b1e] rounded-2xl border border-neutral-200 dark:border-neutral-900 flex items-center justify-center">
          <Loader2 className="animate-spin text-brand-purple" size={24} />
        </div>
      }>
        <CheckoutFormContent />
      </Suspense>
    </div>
  )
}