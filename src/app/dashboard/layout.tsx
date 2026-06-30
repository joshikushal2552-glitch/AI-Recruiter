'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { ThemeToggle } from '@/components/theme-toggle'
import { LayoutDashboard, FileText, Briefcase, BarChart3, Settings, LogOut, Sparkles, User, Loader2, BookOpen } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Resume Analyzer', href: '/dashboard/analyzer', icon: FileText },
    { name: 'Job Search', href: '/dashboard/jobs', icon: Briefcase },
    { name: 'Upskilling Courses', href: '/dashboard/roadmap', icon: BookOpen },
    { name: 'Skill Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  const getUserInitial = () => {
    if (session?.user?.name) return session.user.name[0].toUpperCase()
    if (session?.user?.email) return session.user.email[0].toUpperCase()
    return 'O'
  }

  return (
    <div className="min-h-screen flex bg-neutral-50 dark:bg-background-dark text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <aside className="w-64 bg-white dark:bg-[#0e0e24] border-r border-neutral-200 dark:border-neutral-800/60 flex flex-col justify-between p-5 shrink-0 z-20">
        <div className="space-y-8">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-purple to-brand-pink flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-500/20">
              ATS
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-neutral-950 dark:text-white">ATS Analyzer</h1>
              <p className="text-[10px] text-neutral-400 font-medium tracking-wide">AI Recruitment Agent</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-cyan/10 to-brand-purple/10 text-brand-cyan border border-brand-cyan/20 shadow-sm'
                      : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon size={16} className={`transition-colors ${isActive ? 'text-brand-cyan' : 'text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300'}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-900">
          <div className="px-1">
            {status === 'loading' ? (
              <div className="flex items-center gap-3 p-2 animate-pulse">
                <Loader2 size={16} className="animate-spin text-neutral-400" />
                <span className="text-[11px] text-neutral-400 font-medium">Resolving credentials...</span>
              </div>
            ) : session?.user ? (
              <div className="flex items-center gap-3 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/40 max-w-full overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-purple to-brand-cyan text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                  {getUserInitial()}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-neutral-950 dark:text-white truncate">{session.user.name || 'Active Operator'}</h4>
                  <p className="text-[10px] text-neutral-400 font-medium truncate">{session.user.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/40 text-neutral-400">
                <User size={14} />
                <span className="text-[11px] font-medium">Anonymous Session</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Interface Theme</span>
            <ThemeToggle />
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-red-500 dark:text-red-400 hover:bg-red-500/5 dark:hover:bg-red-500/10 transition-colors border-none bg-transparent cursor-pointer text-left"
          >
            <LogOut size={16} /> Disconnect Session
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white dark:bg-[#0e0e24] border-b border-neutral-200 dark:border-neutral-800/60 flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-brand-pink animate-pulse" />
            <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">Automated Operator Space Node</span>
          </div>
          <div className="flex items-center gap-4">
            {session?.user && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Profile Auth: <span className="text-neutral-950 dark:text-white tracking-normal font-semibold lowercase">{session.user.email}</span>
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Database Core Online</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-neutral-50 dark:bg-background-dark p-8">
          {children}
        </main>
      </div>
    </div>
  )
}