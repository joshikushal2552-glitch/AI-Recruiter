'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, GraduationCap, ArrowUpRight, PlusCircle, BookOpen, Loader2 } from 'lucide-react'

export default function UpskillingCoursesPage() {
  const [targetRole, setTargetRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [courses, setCourses] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const handleFetchCourses = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!targetRole.trim()) return
    setLoading(true)
    setCurrentPage(1)

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole: targetRole.trim(), offsetPage: 1 })
      })
      if (response.ok) {
        const data = await response.json()
        setCourses(data.courses || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMoreCourses = async () => {
    if (loadingMore || !targetRole.trim()) return
    setLoadingMore(true)
    const nextPage = currentPage + 1

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole: targetRole.trim(), offsetPage: nextPage })
      })
      if (response.ok) {
        const data = await response.json()
        const newBatch = data.courses || []
        setCourses((prev) => [...prev, ...newBatch])
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
        <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">Curriculum & Upskilling Hub</h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">Discover and launch targeted high-fidelity online training course catalogs on external directories like Coursera.</p>
      </div>

      <form onSubmit={handleFetchCourses} className="bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800/60 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1.5">Specify Mapped Career Track</label>
          <div className="relative">
            <GraduationCap size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              required
              placeholder="e.g. AIML Engineer"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none text-neutral-900 dark:text-white"
            />
          </div>
        </div>
        <button type="submit" disabled={loading} className="px-6 py-2 bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm flex items-center gap-2 cursor-pointer h-[34px] whitespace-nowrap">
          {loading ? <Loader2 size={12} className="animate-spin" /> : 'Identify Training Matrix'}
        </button>
      </form>

      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="h-64 flex flex-col justify-center items-center text-center">
              <Loader2 size={32} className="animate-spin text-brand-pink mb-2" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">Compiling Mapped Curriculums...</h4>
            </div>
          ) : courses.length > 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Available Learning Pathways</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((course, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 flex flex-col justify-between h-48 hover:border-brand-purple/30 transition-colors shadow-sm">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-brand-purple/10 text-brand-pink text-[9px] font-black uppercase tracking-wider">{course.provider}</span>
                      <h3 className="text-sm font-black text-neutral-950 dark:text-white uppercase tracking-tight mt-2 line-clamp-2">{course.title}</h3>
                    </div>
                    <a 
                      href={course.courseUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full text-center py-2 border border-neutral-200 dark:border-neutral-800 rounded-xl text-[10px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-200 flex items-center justify-center gap-1.5 bg-neutral-50 dark:bg-neutral-950 transition-all"
                    >
                      See Courses on Website <ArrowUpRight size={12} />
                    </a>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleLoadMoreCourses}
                  disabled={loadingMore}
                  className="px-6 py-2.5 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0e0e24] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer text-neutral-700 dark:text-neutral-200 shadow-sm transition-all"
                >
                  {loadingMore ? <Loader2 size={14} className="animate-spin text-brand-cyan" /> : <PlusCircle size={14} className="text-brand-cyan" />}
                  Load More Courses
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-44 flex flex-col justify-center items-center text-center text-neutral-400 opacity-60">
              <BookOpen size={32} className="mb-2 text-neutral-300 dark:text-neutral-700" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">Curriculum Streams Staged</h4>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}