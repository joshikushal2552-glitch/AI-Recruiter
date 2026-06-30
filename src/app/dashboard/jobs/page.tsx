'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Briefcase, ArrowUpRight, DollarSign, AlertCircle, PlusCircle, Loader2, Globe } from 'lucide-react'

export default function JobSearchPage() {
  const [jobTitle, setJobTitle] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [noAvailability, setNoAvailability] = useState(false)

  const handleProcessSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!jobTitle.trim()) return
    setLoading(true)
    setNoAvailability(false)
    setCurrentPage(1)

    const normalLocation = location.trim().toLowerCase()
    if (normalLocation === 'none' || normalLocation === 'nowhere' || normalLocation === 'empty') {
      setResults([])
      setNoAvailability(true)
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: jobTitle.trim(), location: location.trim(), offsetPage: 1 })
      })
      if (response.ok) {
        const data = await response.json()
        setResults(data.jobs || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMoreJobs = async () => {
    if (loadingMore || !jobTitle.trim() || noAvailability) return
    setLoadingMore(true)
    const nextPage = currentPage + 1

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: jobTitle.trim(), location: location.trim(), offsetPage: nextPage })
      })
      if (response.ok) {
        const data = await response.json()
        const newBatch = data.jobs || []
        setResults((prev) => [...prev, ...newBatch])
        setCurrentPage(nextPage)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">Aggregate Job Search Platform</h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">Query high-volume aggregate boards like Indeed and LinkedIn natively to stream deep-linked listings.</p>
      </div>

      <form onSubmit={handleProcessSearch} className="bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800/60 p-5 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1.5">Target Job Designation</label>
          <input
            type="text"
            required
            placeholder="e.g. AIML Engineer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1.5">Target Location Space</label>
          <input
            type="text"
            placeholder="e.g. San Francisco, Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none"
          />
        </div>
        <button type="submit" disabled={loading} className="w-full py-2 bg-gradient-to-r from-brand-cyan to-brand-purple text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center h-[34px] cursor-pointer">
          {loading ? <Loader2 size={12} className="animate-spin" /> : 'Compile Opening Paths'}
        </button>
      </form>

      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="h-64 flex flex-col justify-center items-center text-center">
              <Loader2 size={32} className="animate-spin text-brand-cyan mb-2" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">Crawling Aggregate Openings...</h4>
            </div>
          ) : noAvailability ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-red-500/20 bg-red-500/5 text-red-500 p-6 rounded-2xl flex items-start gap-3">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">No Active Allocations Located</h4>
                <p className="text-xs font-medium mt-1">This area has no availability of jobs for this particular role.</p>
              </div>
            </motion.div>
          ) : results.length > 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Discovered Opportunities Matrix ({results.length} Loaded)</h3>
              
              {results.map((job, idx) => (
                <div key={idx} className="bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800/60 rounded-2xl p-6 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan text-[10px] font-bold uppercase tracking-wider">{job.location}</span>
                      <h2 className="text-base font-black text-neutral-950 dark:text-white uppercase tracking-tight mt-1.5">{job.title}</h2>
                      <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mt-0.5"><Globe size={12} /> {job.companyName}</p>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{job.jobDescription}</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-900 p-5 rounded-2xl flex flex-col justify-between h-28">
                    <div>
                      <span className="text-[10px] font-bold text-brand-pink uppercase tracking-wider flex items-center gap-1"><DollarSign size={13} /> Expected Salary Range</span>
                      <div className="text-lg font-black text-neutral-950 dark:text-white mt-1">{job.expectedSalaryUSD}</div>
                    </div>
                    <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer" className="w-full text-center py-2 bg-brand-cyan text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-xl hover:opacity-90">
                      View Position Online <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              ))}

              <div className="pt-4 flex justify-center">
                <button 
                  onClick={handleLoadMoreJobs}
                  disabled={loadingMore}
                  className="px-6 py-2.5 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0e0e24] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer text-neutral-700 dark:text-neutral-200 shadow-sm transition-all"
                >
                  {loadingMore ? <Loader2 size={14} className="animate-spin text-brand-pink" /> : <PlusCircle size={14} className="text-brand-pink" />}
                  Load More Openings & Roles
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-44 flex flex-col justify-center items-center text-center text-neutral-400 opacity-60">
              <Briefcase size={32} className="mb-2 text-neutral-300 dark:text-neutral-700" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">Aggregate Staging Core</h4>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}