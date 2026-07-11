'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Sparkles, Mail, Lock, User, ArrowLeft, Chrome, Loader2, MailCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,20}$/

function SignupFormContent() {
  const searchParams = useSearchParams()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmationSent, setConfirmationSent] = useState(false)

  // Automatically parse and fill structural entry allocations from your landing page form
  useEffect(() => {
    const contextEmail = searchParams.get('email')
    if (contextEmail) {
      setEmail(decodeURIComponent(contextEmail))
    }
  }, [searchParams])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !email || !password) return

    const normalizedUsername = username.trim().toLowerCase()
    if (!USERNAME_PATTERN.test(normalizedUsername)) {
      setError('Username must be 3-20 characters: letters, numbers, and underscores only.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const supabase = createClient()

      const { data: isTaken, error: checkError } = await supabase.rpc('is_username_taken', {
        check_username: normalizedUsername,
      })

      if (checkError) {
        setError('Could not verify username availability. Please try again.')
        setLoading(false)
        return
      }
      if (isTaken) {
        setError('That username is already taken.')
        setLoading(false)
        return
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { username: normalizedUsername },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      if (data.session) {
        // Hard navigation: guarantees middleware sees the freshly-set session
        // cookie on this request instead of racing a soft client transition.
        window.location.href = '/dashboard'
      } else {
        // Email confirmation is required before this account can sign in
        setConfirmationSent(true)
        setLoading(false)
      }
    } catch {
      setError('Registration failed. Please try again.')
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
      },
    })
    if (oauthError) {
      setError('Google sign-in is not fully configured yet.')
      setLoading(false)
    }
  }

  if (confirmationSent) {
    return (
      <div className="bg-white dark:bg-[#0b0b1e] border border-neutral-200 dark:border-neutral-900 rounded-2xl p-8 shadow-xl space-y-4 text-center">
        <div className="w-12 h-12 rounded-full bg-brand-cyan/10 flex items-center justify-center mx-auto">
          <MailCheck className="text-brand-cyan" size={22} />
        </div>
        <h2 className="text-xl font-black tracking-tight text-neutral-950 dark:text-white uppercase">Check your email</h2>
        <p className="text-xs text-neutral-400 max-w-xs mx-auto">
          We sent a confirmation link to <span className="font-semibold text-neutral-700 dark:text-neutral-200">{email}</span>. Confirm your address to activate your account, then log in.
        </p>
        <Link href="/login" className="inline-block text-xs font-bold text-brand-cyan hover:underline">
          Go to login
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-[#0b0b1e] border border-neutral-200 dark:border-neutral-900 rounded-2xl p-8 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-purple/10 text-[10px] text-brand-pink font-bold uppercase tracking-wider">
          <Sparkles size={10} /> Registry Gateway
        </div>
        <h2 className="text-2xl font-black tracking-tight text-neutral-950 dark:text-white uppercase">Instantiate Account</h2>
        <p className="text-xs text-neutral-400 max-w-xs mx-auto">Provision secure tracking parameters to evaluate candidates.</p>
      </div>

      {error && (
        <div className="text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20 p-3 rounded-xl text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">Username</label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              required
              disabled={loading}
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-purple text-neutral-950 dark:text-white transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">Communication Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="email"
              required
              disabled={loading}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-purple text-neutral-950 dark:text-white transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">Secure Token Phrase</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="password"
              required
              disabled={loading}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-purple text-neutral-950 dark:text-white transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : 'Provision Pipeline'}
        </button>
      </form>

      <div className="flex items-center justify-between gap-3 my-4">
        <div className="h-[1px] bg-neutral-200 dark:bg-neutral-800 flex-1" />
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest whitespace-nowrap">Or identity synchronization</span>
        <div className="h-[1px] bg-neutral-200 dark:bg-neutral-800 flex-1" />
      </div>

      <button
        onClick={handleGoogleSignUp}
        disabled={loading}
        className="w-full py-2.5 border border-neutral-300 dark:border-neutral-800 hover:border-brand-cyan bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-200 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        <Chrome size={14} className="text-brand-cyan" /> Synchronize via Google Account
      </button>

      <div className="text-center pt-2">
        <p className="text-xs text-neutral-400">
          Already active profile?{' '}
          <Link href="/login" className="text-brand-cyan font-bold hover:underline transition-all">
            Access Terminal
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#060612] flex flex-col justify-center items-center p-6 relative transition-colors duration-200">
      <div className="max-w-md w-full space-y-4 z-10">

        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-brand-cyan transition-colors mb-2 select-none">
          <ArrowLeft size={14} /> Back to landing page
        </Link>

        {/* Suspense wrapper block isolates search parameters fallback boundaries cleanly during SSR builds */}
        <Suspense fallback={
          <div className="w-full h-[400px] bg-white dark:bg-[#0b0b1e] rounded-2xl border border-neutral-200 dark:border-neutral-900 flex items-center justify-center">
            <Loader2 className="animate-spin text-brand-purple" size={24} />
          </div>
        }>
          <SignupFormContent />
        </Suspense>

      </div>
    </div>
  )
}
