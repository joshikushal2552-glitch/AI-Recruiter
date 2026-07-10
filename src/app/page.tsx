'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import { 
  ArrowRight, 
  Sparkles, 
  Brain, 
  Briefcase, 
  Compass, 
  Users, 
  ChevronDown, 
  CheckCircle2, 
  FileText, 
  Award, 
  Search, 
  TrendingUp 
} from 'lucide-react'
import logo from './logo.png'

export default function LandingPage() {
  const router = useRouter()
  const [emailInput, setEmailInput] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput.trim()) return
    router.push(`/signup?email=${encodeURIComponent(emailInput.trim())}`)
  }

  const faqItems = [
    { 
      q: "How does Get Placed work?", 
      a: "Upload your resume to receive personalized insights, interview preparation resources, and recommendations tailored to your goals." 
    },
    { 
      q: "Is my data secure?", 
      a: "Your information is processed securely and is never shared without your permission." 
    },
    { 
      q: "Who is Get Placed for?", 
      a: "Get Placed is designed for students, recent graduates, and professionals looking to advance their careers." 
    },
    { 
      q: "Do I need technical experience?", 
      a: "No. The platform is designed to provide clear and actionable guidance regardless of your background." 
    }
  ]

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-100 selection:bg-[#4555d4]/10 transition-colors duration-200 font-sans antialiased">
      {/* Inject Mona Sans typography overrides */}
      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/mona-sans');
        body {
          font-family: 'Mona Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
      `}</style>

      {/* Navigation Header */}
      <header className="w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 select-none">
            <img src={logo.src || (logo as any)} alt="Get Placed Logo" className="h-6 w-auto object-contain" />
            <span className="font-semibold text-lg tracking-tight text-zinc-950 dark:text-white">Get Placed</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a href="#features" className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">FAQ</a>
          </nav>
          
          <div className="flex items-center gap-4">
         
            <Link href="/login" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">Login</Link>
            <Link href="/signup" className="px-4 py-2 text-sm font-medium bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 rounded-lg shadow-sm hover:opacity-90 transition-opacity">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero Content Section */}
      <main className="flex-1 w-full mx-auto z-10 relative">
        
        {/* Full-width Hero Section */}
        <section className="w-full bg-[#4555d4] text-white pt-24 pb-40 px-6 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Badge */}
            

            {/* Headline */}
            <h1 className="text-6xl md:text-7xl font-semibold tracking-[-0.06em] leading-[0.95] mb-6 max-w-3xl">
              Everything you need to land your next opportunity.
            </h1>

            {/* Subheadline */}
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Analyze your resume, identify skill gaps, prepare for interviews, and discover opportunities tailored to your experience.
            </p>

            {/* CTA Intake Form & Buttons */}
            <div className="w-full max-w-md mx-auto mb-4">
              <form onSubmit={handleIntakeSubmit} className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-xl bg-white shadow-xl">
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email to analyze resume" 
                  value={emailInput} 
                  onChange={(e) => setEmailInput(e.target.value)} 
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm focus:outline-none text-zinc-950 placeholder-zinc-400" 
                />
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-[#4555d4] hover:bg-[#3846b8] text-white text-sm font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  Analyze My Resume
                </button>
              </form>
            </div>
            
            <a 
              href="#how-it-works" 
              className="text-sm font-medium text-white/80 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
            >
              See How It Works 
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </section>

        {/* Product Mockup Container (Overlapping Section) */}
        <section className="w-full px-6 -mt-24 relative z-20 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[24px] shadow-2xl p-6 md:p-8 text-left grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Mockup Left Panel */}
            <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800 pb-6 md:pb-0 md:pr-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">Resume Core Analysis</h4>
                    <p className="text-xs text-zinc-500">Updated 2m ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[#4555d4]">92</span>
                  <span className="text-xs text-zinc-400 block font-medium">Score</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl">
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Missing Skills</div>
                  <ul className="space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4555d4]" /> SQL
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4555d4]" /> Tableau
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4555d4]" /> Product Analytics
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mockup Right Panel */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
                      <Award size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">Interview Readiness</h4>
                      <p className="text-xs text-zinc-500">Based on target metrics</p>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold">
                    84% Complete
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl">
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Recommended Roles</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {['Product Analyst', 'Business Analyst', 'Operations Associate'].map((role) => (
                      <div key={role} className="p-2.5 bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 rounded-lg shadow-2xs text-xs font-medium text-zinc-800 dark:text-zinc-200">
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                <span>Verification ID: GP-8842X</span>
                <span className="flex items-center gap-1 text-[#4555d4] font-medium"><CheckCircle2 size={12} /> Ready to apply</span>
              </div>
            </div>

          </div>
        </section>

        {/* Trust Bar Section */}
        <section className="w-full max-w-5xl mx-auto px-6 mt-16">
          <div className="border-y border-zinc-200 dark:border-zinc-800 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Resume Analysis', icon: FileText },
              { label: 'Interview Preparation', icon: Brain },
              { label: 'Career Insights', icon: TrendingUp },
              { label: 'Job Discovery', icon: Search }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400">
                <item.icon size={16} className="text-zinc-400" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-5xl mx-auto px-6 py-28 scroll-mt-20">
          <div className="text-left mb-16 max-w-3xl">
            <span className="text-sm font-semibold text-[#4555d4] tracking-wide block mb-3">One platform. Every step of your journey.</span>
            <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white mb-4">Designed for modern job seekers.</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              From resume reviews to interview preparation, Get Placed helps you make smarter career decisions with personalized guidance at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              { 
                title: 'Resume Intelligence', 
                icon: FileText, 
                desc: 'Understand how recruiters see your resume. Receive instant feedback, uncover missing skills, and improve your chances before you apply.' 
              },
              { 
                title: 'Interview Preparation', 
                icon: Brain, 
                desc: 'Practice with realistic interview questions tailored to your target role and gain confidence before important conversations.' 
              },
              { 
                title: 'Skill Gap Analysis', 
                icon: Compass, 
                desc: 'Discover the skills employers expect and receive personalized recommendations on what to learn next.' 
              },
              { 
                title: 'Opportunity Discovery', 
                icon: Briefcase, 
                desc: 'Find relevant openings, explore career paths, and uncover opportunities that align with your goals.' 
              }
            ].map((feat) => (
              <div 
                key={feat.title} 
                className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-2xs group bg-white dark:bg-zinc-900/50"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-5 text-[#4555d4] transition-colors">
                  <feat.icon size={20} />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-zinc-950 dark:text-white">{feat.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800 py-24 px-6 scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white mb-16 text-left">Simple from start to finish.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative text-left">
              {[
                { step: '01', title: 'Upload your resume', desc: 'Share your current resume and career goals.' },
                { step: '02', title: 'Receive personalized insights', desc: 'Identify strengths, weaknesses, and opportunities for improvement.' },
                { step: '03', title: 'Prepare and apply', desc: 'Build confidence through interview practice and targeted recommendations.' }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#4555d4]/10 dark:bg-[#4555d4]/20 flex items-center justify-center text-[#4555d4] font-bold text-sm">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-lg text-zinc-950 dark:text-white">{step.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section className="w-full max-w-5xl mx-auto px-6 py-28 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">Built around real career decisions.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
                Whether you&apos;re applying for internships, your first full-time role, or planning your next career move, Get Placed provides clarity when it matters most.
              </p>
            </div>
            
            {/* Charts and Dashboard Visualization using standard Tailwind divs */}
            <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Application Health Over Time</span>
                  <span className="text-xs text-zinc-500 font-medium">This month</span>
                </div>
                <div className="h-24 flex items-end gap-2 pt-4 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="bg-zinc-100 dark:bg-zinc-800 h-[30%] w-full rounded-t-sm" />
                  <div className="bg-zinc-100 dark:bg-zinc-800 h-[45%] w-full rounded-t-sm" />
                  <div className="bg-[#4555d4]/40 h-[60%] w-full rounded-t-sm" />
                  <div className="bg-[#4555d4]/60 h-[55%] w-full rounded-t-sm" />
                  <div className="bg-[#4555d4] h-[85%] w-full rounded-t-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl">
                  <span className="text-xs text-zinc-500 block mb-1">Response Rate</span>
                  <span className="text-xl font-bold text-zinc-950 dark:text-white">+24%</span>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl">
                  <span className="text-xs text-zinc-500 block mb-1">Time Saved</span>
                  <span className="text-xl font-bold text-zinc-950 dark:text-white">12 hrs/wk</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="w-full bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800 py-24 px-6 text-left">
          <div className="max-w-5xl mx-auto">
            <div className="mb-14">
              <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white mb-3">Trusted by ambitious professionals.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-xl">
                Professionals use Get Placed to improve applications, prepare for interviews, and make informed career decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "Get Placed helped me identify gaps in my resume that I had overlooked. The feedback was immediate and actionable." },
                { quote: "The interview preparation tools made me significantly more confident before applying." },
                { quote: "I finally had a clear understanding of what skills employers were actually looking for." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic mb-6">
                    &quot;{item.quote}&quot;
                  </p>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full max-w-3xl mx-auto px-6 py-28 text-left scroll-mt-20">
          <div className="text-center md:text-left mb-12">
            <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = expandedFaq === idx
              return (
                <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xs transition-all">
                  <button 
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-medium text-zinc-900 dark:text-white cursor-pointer bg-transparent border-none focus:outline-none"
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#4555d4]' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 pt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full max-w-5xl mx-auto px-6 mb-24">
          <div className="bg-[#4555d4] text-white rounded-3xl p-12 md:p-16 text-center space-y-6 relative overflow-hidden shadow-xl">
            <h2 className="text-4xl font-semibold tracking-tight">Take the next step in your career.</h2>
            <p className="text-white/80 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
              Get personalized guidance, strengthen your applications, and approach every opportunity with confidence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/signup" className="px-6 py-3 bg-white text-[#4555d4] font-medium text-sm rounded-xl hover:bg-zinc-50 transition-colors w-full sm:w-auto text-center">
                Get Started Free
              </Link>
              <a href="#features" className="px-6 py-3 bg-white/10 text-white font-medium text-sm rounded-xl hover:bg-white/20 transition-colors w-full sm:w-auto text-center">
                View Features
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Element */}
      <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-2 select-none">
            <img src={logo.src || (logo as any)} alt="Get Placed Logo" className="h-5 w-auto opacity-80" />
            <span className="font-medium text-zinc-900 dark:text-white">Get Placed</span>
          </div>
          <div className="flex items-center gap-6 text-zinc-500 dark:text-zinc-400 font-medium">
            <a href="#features" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">FAQ</a>
          </div>
          <p className="text-zinc-400 dark:text-zinc-500 text-xs">&copy; 2026 Get Placed Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}