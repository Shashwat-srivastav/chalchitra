import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Video, BarChart2, PlusCircle, Calendar, Settings, HelpCircle, Menu } from 'lucide-react'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <header className="border-b sticky top-0 z-50 bg-background">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                  <Link href="/" className="text-2xl font-bold">FacelessVideo</Link>
                  <nav className="hidden md:flex space-x-4">
                    <NavButton href="/dashboard" icon={<Video className="w-4 h-4 mr-2" />} label="Dashboard" />
                    <NavButton href="/create" icon={<PlusCircle className="w-4 h-4 mr-2" />} label="Create" />
                    <NavButton href="/schedule" icon={<Calendar className="w-4 h-4 mr-2" />} label="Schedule" />
                    <NavButton href="/analytics" icon={<BarChart2 className="w-4 h-4 mr-2" />} label="Analytics" />
                    <NavButton href="/settings" icon={<Settings className="w-4 h-4 mr-2" />} label="Settings" />
                    <NavButton href="/help" icon={<HelpCircle className="w-4 h-4 mr-2" />} label="Help" />
                  </nav>
                  <div className="flex items-center space-x-4">
                    <ModeToggle />
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-grow bg-background">
              {children}
            </main>
            <footer className="border-t">
              <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
                © 2024 FacelessVideo. All rights reserved.
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

function NavButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Button variant="ghost" asChild>
      <Link href={href} className="flex items-center">
        {icon}
        <span className="sr-only md:not-sr-only">{label}</span>
      </Link>
    </Button>
  )
}

