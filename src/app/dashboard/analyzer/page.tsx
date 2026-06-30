'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, CheckCircle2, AlertTriangle, Sparkles, ArrowRight, Loader2, DollarSign, TrendingUp } from 'lucide-react'

export default function AnalyzerPage() {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState('')
  const [analysis, setAnalysis] = useState<any>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    else if (e.type === "dragleave") setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === 'application/pdf') setFile(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === 'application/pdf') setFile(selectedFile)
    }
  }

  const runAnalysisPipeline = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !role) return
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('targetRole', role)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        const data = await response.json()
        setAnalysis(data.analysis)
        
        localStorage.setItem('active_resume_metrics', JSON.stringify({
          role: role.trim(),
          score: data.analysis.matchScore,
          salary: data.analysis.estimatedSalaryUSD,
          skills: data.analysis.jobSpecificSkills,
          compliance: data.analysis.complianceFactors
        }))
      }
    } catch (error) {
      console.error("Pipeline processing failure:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">AI Resume Optimization Engine</h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">Upload candidate metrics to parse structural keyword alignment gaps instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800/60 p-6 rounded-2xl shadow-sm h-fit">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-neutral-900 dark:text-white">Target Criteria Parameters</h3>
          <form onSubmit={runAnalysisPipeline} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Target Role Designation</label>
              <input
                type="text"
                required
                placeholder="e.g. AIML Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-purple text-neutral-900 dark:text-white"
              />
            </div>

            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-6 text-center relative transition-all ${
                dragActive ? "border-brand-pink bg-brand-purple/5" : "border-neutral-200 dark:border-neutral-800 hover:border-brand-cyan"
              }`}
            >
              <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Upload className="mx-auto text-neutral-400 mb-2" size={24} />
              <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 truncate max-w-full">
                {file ? file.name : "Staging Vector Array"}
              </p>
              <p className="text-[10px] text-neutral-400 mt-1">Accepts standard binary PDF files</p>
            </div>

            <button
              type="submit"
              disabled={loading || !file || !role}
              className="w-full py-3 bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : 'Run Extraction Node'}
              <ArrowRight size={14} />
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-[#0e0e24] border border-neutral-200 dark:border-neutral-800/60 p-6 rounded-2xl shadow-sm lg:col-span-2 min-h-[450px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {analysis ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-900 pb-4">
                  <div>
                    <h2 className="text-lg font-black uppercase text-neutral-900 dark:text-white">Analysis Matrix Output</h2>
                    <p className="text-[11px] text-neutral-400">Target Track Alignment Index successfully calculated</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="bg-neutral-50 dark:bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-right">
                      {/* Fixed Double Dollar Sign Vector Typo Here */}
                      <span className="text-sm font-black text-brand-pink flex items-center justify-end"><DollarSign size={13} />{analysis.estimatedSalaryUSD}</span>
                      <p className="text-[8px] font-bold uppercase tracking-wider text-neutral-400">Calculated Valuation</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-brand-cyan">{analysis.matchScore}%</span>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Match Factor</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase text-emerald-500 tracking-wide flex items-center gap-1.5">
                      <CheckCircle2 size={14} /> Current Structural Strengths
                    </h4>
                    <div className="space-y-2">
                      {analysis.strongPoints.map((item: string, i: number) => (
                        <p key={i} className="text-xs bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 p-2.5 rounded-xl border border-emerald-500/10 leading-relaxed">{item}</p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase text-brand-pink tracking-wide flex items-center gap-1.5">
                      <TrendingUp size={14} /> High-Growth Blueprint Gaps
                    </h4>
                    <div className="space-y-2">
                      {analysis.improvements.map((item: string, i: number) => (
                        <p key={i} className="text-xs bg-pink-500/5 text-brand-pink p-2.5 rounded-xl border border-brand-pink/10 leading-relaxed">{item}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-950/40 p-4 rounded-xl border border-neutral-200 dark:border-neutral-900/60">
                  <h4 className="text-xs font-bold uppercase text-brand-purple tracking-wide flex items-center gap-1.5 mb-2">
                    <Sparkles size={12} /> Strategic Alignment Advice
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{analysis.structuralAdvice}</p>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-50">
                <FileText size={48} className="text-neutral-300 dark:text-neutral-700 mb-3 animate-pulse" />
                <h4 className="font-bold text-sm text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">Awaiting Document Upload</h4>
                <p className="text-xs text-neutral-400 max-w-xs mt-1">Provide an engineering target profile allocation to run live keywords validation diagnostics.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}