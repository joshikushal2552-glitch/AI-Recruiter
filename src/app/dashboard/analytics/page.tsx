'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, Sparkles, CheckCircle2, TrendingUp, BarChart2, Shield, Lock, ArrowRight, DollarSign } from 'lucide-react'

export default function CandidateAnalyticsPage() {
  const [profileData, setProfileData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cachedMetrics = localStorage.getItem('active_resume_metrics')
    if (cachedMetrics) {
      setProfileData(JSON.parse(cachedMetrics))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  /* 🔒 Locked State: Intercept view if no data exists yet */
  if (!profileData) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mx-auto shadow-sm text-neutral-400">
          <Lock size={24} className="animate-pulse text-brand-purple" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-base font-black uppercase tracking-wider text-neutral-950 dark:text-white">Analytics Metrics Locked</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            No resume parsing telemetry was detected for this session. Analytics tracking is compiled dynamically based on the specific technical profile track you choose during upload.
          </p>
        </div>
        <div className="pt-2">
          <Link 
            href="/dashboard/analyzer" 
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:opacity-95 transition-opacity"
          >
            Upload Resume Matrix <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    )
  }

  /* 🔓 Unlocked State: Render fully customized domain attributes */
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">Domain Analytics Hub</h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">Review skill densities and target-role parameters extracted directly from your parsed resume tracking matrix.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { title: 'Target Mapped Profile Track', value: profileData.role, status: 'Adaptive Domain Selected', icon: Sparkles, color: 'text-cyan-500 bg-cyan-500/5' },
          { title: 'Global Alignment Match Factor', value: `${profileData.score}%`, status: 'ATS Evaluation Index', icon: Brain, color: 'text-pink-500 bg-pink-500/5' },
          { title: 'Calculated Market Value', value: profileData.salary, status: 'AI Estimated Capacity', icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/5' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800/60 p-6 rounded-2xl shadow-sm flex items-center justify-between gap-4">
            <div className="space-y-1.5 min-w-0 flex-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block truncate">{stat.title}</span>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white tracking-tight truncate">{stat.value}</h3>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide block truncate">{stat.status}</p>
            </div>
            <div className={`p-3 rounded-xl shrink-0 ${stat.color}`}>
              <stat.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Dynamic Skill Densities Bar Graph */}
        <div className="bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800/60 p-6 rounded-2xl shadow-sm lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-900 pb-3">
            <BarChart2 size={16} className="text-brand-cyan" />
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-950 dark:text-white">Target Competency Analysis for: {profileData.role}</h3>
          </div>

          <div className="space-y-5">
            {profileData.skills?.map((item: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-end text-xs font-semibold">
                  <span className="text-neutral-800 dark:text-neutral-200 tracking-tight">{item.skill}</span>
                  <div className="text-right space-x-2">
                    <span className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-neutral-100 dark:bg-neutral-950 text-neutral-400">{item.label}</span>
                    <span className="text-brand-cyan font-black">{item.density}%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 overflow-hidden border border-neutral-200/20">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink transition-all duration-500"
                    style={{ width: `${item.density}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mapped Compliance Metrics */}
        <div className="bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800/60 p-6 rounded-2xl shadow-sm space-y-6 lg:col-span-1">
          <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-900 pb-3">
            <TrendingUp size={16} className="text-brand-pink" />
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400">Profile Architecture Factors</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {profileData.compliance?.map((item: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/20 text-center space-y-1">
                <span className="text-2xl font-black text-brand-pink tracking-tight">{item.factor}%</span>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wide leading-tight line-clamp-2">{item.category}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-brand-purple/5 to-brand-pink/5 border border-brand-purple/20 p-4 rounded-xl text-[11px] text-neutral-400 leading-relaxed flex gap-2 items-start">
            <Shield size={16} className="text-brand-purple shrink-0 mt-0.5" />
            <span>Telemetry metrics update automatically during document scanning to benchmark structural compliance rules relative to current industry trends.</span>
          </div>
        </div>

      </div>
    </div>
  )
}