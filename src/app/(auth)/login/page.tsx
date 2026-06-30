'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Sparkles, Mail, Lock, ArrowLeft, Chrome, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: email.trim(),
        password: password,
        redirect: false,
      })

      if (result?.error) {
        setError('Authentication failure: Invalid token phrase matching matrix.')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('Critical channel interrupt occurred during verification.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#060612] flex flex-col justify-center items-center p-6 relative transition-colors duration-200">
      <div className="max-w-md w-full space-y-4 z-10">
        
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-brand-purple dark:hover:text-brand-cyan transition-colors mb-2 select-none">
          <ArrowLeft size={14} /> Back to landing page
        </Link>

        <div className="bg-white dark:bg-[#0b0b1e] border border-neutral-200 dark:border-neutral-900 rounded-2xl p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-cyan/10 text-[10px] text-brand-cyan font-extrabold uppercase tracking-wider">
              <Sparkles size={10} /> Secure Node Access
            </div>
            <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white uppercase">Welcome Back</h2>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto">Enter credentials to interface with your tracking modules.</p>
          </div>

          {error && (
            <div className="text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20 p-3 rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">Email Matrix Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  required
                  disabled={loading}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-purple text-neutral-900 dark:text-white placeholder-neutral-400 transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">Password Access Vector</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="password"
                  required
                  disabled={loading}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-purple text-neutral-900 dark:text-white placeholder-neutral-400 transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : 'Authenticate Session'}
            </button>
          </form>

          <div className="flex items-center justify-between gap-3 my-4">
            <div className="h-[1px] bg-neutral-200 dark:bg-neutral-800/60 flex-1" />
            <span className="text-[9px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest whitespace-nowrap">Or system synchronization</span>
            <div className="h-[1px] bg-neutral-200 dark:bg-neutral-800/60 flex-1" />
          </div>

          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 border border-neutral-200 dark:border-neutral-800 hover:border-brand-cyan bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Chrome size={14} className="text-brand-cyan" /> Sign in with Google Cloud Identity
          </button>

          <div className="text-center pt-2">
            <p className="text-xs text-neutral-400">
              New deployment pipeline?{' '}
              <Link href="/signup" className="text-brand-pink font-bold hover:underline transition-all">
                Initialize Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}