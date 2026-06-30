'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Target, TrendingUp, Clock, FileCheck, ArrowRight, Sparkles } from 'lucide-react'

export default function DashboardPage() {
  const [cachedProfile, setCachedProfile] = useState<any>(null)

  useEffect(() => {
    const metrics = localStorage.getItem('active_resume_metrics')
    if (metrics) setCachedProfile(JSON.parse(metrics))
  }, [])

  return (
    <div className="space-y-8">
      {/* Dynamic Welcome Header Banner */}
      <div className="bg-gradient-to-r from-brand-purple/10 via-brand-cyan/5 to-transparent border border-neutral-200 dark:border-neutral-900 rounded-2xl p-6 relative overflow-hidden">
        <div className="max-w-xl space-y-2">
          <h2 className="text-xl font-black uppercase tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
            <Sparkles size={18} className="text-brand-pink" /> Unified Command Center Node
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Welcome to your career pipeline engine workspace. Upload your profile inside the lab terminal to compile market compensation targets and extract job opening links.
          </p>
        </div>
      </div>

      {/* Primary Analytics Grid Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: 'Staged Record Profile', value: cachedProfile ? '1 File Active' : '0 Files', label: cachedProfile ? 'Resume Loaded' : 'Awaiting Upload', icon: FileText, color: 'text-purple-500' },
          { title: 'Target Designation', value: cachedProfile ? cachedProfile.role : 'None Staged', label: cachedProfile ? 'Adaptive Track Active' : 'Configure Parameters', icon: Target, color: 'text-cyan-500' },
          { title: 'Calculated Match Index', value: cachedProfile ? `${cachedProfile.score}%` : '0%', label: 'ATS Target Benchmark', icon: TrendingUp, color: 'text-brand-pink' },
          { title: 'Calculated Valuation', value: cachedProfile ? cachedProfile.salary.split(' ')[0] : 'N/A', label: 'Est. Annual Base', icon: Clock, color: 'text-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800/60 p-5 rounded-xl shadow-sm flex items-center justify-between">
            <div className="space-y-1 min-w-0">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block truncate">{stat.title}</p>
              <h3 className="text-xl font-black text-neutral-900 dark:text-white truncate">{stat.value}</h3>
              <p className="text-[10px] text-neutral-400 font-medium block truncate">{stat.label}</p>
            </div>
            <div className={`p-3 rounded-lg bg-neutral-50 dark:bg-neutral-950 ${stat.color} shrink-0`}>
              <stat.icon size={18} />
            </div>
          </div>
        ))}
      </div>

      {/* Central Navigation Directives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800/60 p-6 rounded-2xl flex flex-col justify-between h-44">
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-950 dark:text-white">Resume Evaluation Node</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">Run multi-provider failover keywords scanning pipelines against specified application categories to compute formatting vulnerabilities.</p>
          </div>
          <Link href="/dashboard/analyzer" className="inline-flex items-center gap-1 text-xs font-bold text-brand-cyan hover:text-brand-pink transition-colors">
            Launch Processing Lab <ArrowRight size={14} />
          </Link>
        </div>

        <div className="bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800/60 p-6 rounded-2xl flex flex-col justify-between h-44">
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-950 dark:text-white">Active Market Discovery Scraper</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">Query extensive live directories across Indeed and LinkedIn to generate functional absolute application links matching your career track.</p>
          </div>
          <Link href="/dashboard/jobs" className="inline-flex items-center gap-1 text-xs font-bold text-brand-purple hover:text-brand-pink transition-colors">
            Query Job Openings <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}