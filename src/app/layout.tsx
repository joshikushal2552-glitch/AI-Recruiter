import type { ReactNode } from 'react'
import '@/app/globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata = {
  title: 'ATS Intelligent Agent Platform',
  description: 'AI-powered recruitment analysis, roadmaps, and career insights.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}