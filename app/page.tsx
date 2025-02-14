import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, BarChart2, Calendar } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-b from-background to-secondary/10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
          Create Faceless Videos in Minutes
        </h1>
        <p className="text-xl mb-8 max-w-2xl text-muted-foreground">
          Transform your ideas into engaging videos without showing your face. Perfect for content creators, educators, and marketers.
        </p>
        <Button size="lg" asChild className="animate-pulse">
          <Link href="/dashboard">
            Go to Dashboard <ArrowRight className="ml-2" />
          </Link>
        </Button>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <FeatureCard
            icon={<Play className="w-10 h-10" />}
            title="Easy Creation"
            description="Intuitive drag-and-drop interface for quick video assembly"
          />
          <FeatureCard
            icon={<Calendar className="w-10 h-10" />}
            title="Smart Scheduling"
            description="Plan and automate your content across multiple platforms"
          />
          <FeatureCard
            icon={<BarChart2 className="w-10 h-10" />}
            title="Insightful Analytics"
            description="Track performance and optimize your content strategy"
          />
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-lg transition-all hover:shadow-md bg-card">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

