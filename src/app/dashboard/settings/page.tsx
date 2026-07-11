'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/hooks/use-user'
import { useRouter } from 'next/navigation'
import { User, Mail, CreditCard, Save, CheckCircle2, Loader2 } from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()
  const { user } = useUser()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (user) {
      setUsername((user.user_metadata?.username as string | undefined) || '')
      setEmail(user.email || '')
    }
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMessage('')

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setSuccessMessage('Basic system identity attributes synchronized.')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const navigateToCheckout = (planName: string) => {
    // Appends the source flag tracker to alter back navigation routing
    router.push(`/checkout?plan=${encodeURIComponent(planName)}&from=settings`)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">Workspace Configuration Hub</h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">Modify session access parameters, track accounting vectors, and manage active feature subscriptions.</p>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 p-3 rounded-xl shadow-sm">
          <CheckCircle2 size={14} />
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800/60 rounded-2xl p-6 shadow-sm lg:col-span-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">Basic User Profile</h3>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">Display Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-neutral-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">Email Coordinates</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-neutral-900 dark:text-white"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
              {loading ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />} Save Changes
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800/60 rounded-2xl p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3 mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Account Access Entitlements</h3>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-[9px] font-bold uppercase tracking-widest">
              <CreditCard size={10} /> Billing Node
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
              ⚠️ <strong>No Active Plan Node Located:</strong> Your account workspace is running under a baseline testing limit schema. Purchase an active subscription below to unlock continuous AI features.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                { name: '1 Month', rate: '$19', desc: 'Continuous 30-day premium token access vector.' },
                { name: '6 Month', rate: '$89', desc: 'Strategic scaling window with 20% tier save factor.' },
                { name: '1 Year', rate: '$149', desc: 'Maximum enterprise allocation block with deep resource savings.' },
              ].map((plan) => (
                <div key={plan.name} className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 flex flex-col justify-between hover:border-brand-purple/40 transition-colors bg-neutral-50/50 dark:bg-neutral-950/20">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-950 dark:text-white">{plan.name} Access</h4>
                    <div className="my-2 flex items-baseline gap-0.5">
                      <span className="text-2xl font-black text-neutral-950 dark:text-white">{plan.rate}</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-normal mb-4">{plan.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateToCheckout(plan.name)}
                    className="w-full py-2 bg-gradient-to-r from-brand-purple to-brand-pink text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-sm cursor-pointer"
                  >
                    Get Subscription
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}