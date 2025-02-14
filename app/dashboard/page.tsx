'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, Video, BarChart2, Calendar, Settings, HelpCircle } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to FacelessVideo!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <QuickActionCard
          title="Create Video"
          description="Start a new video project"
          icon={<PlusCircle className="w-8 h-8" />}
          href="/create"
        />
        <QuickActionCard
          title="Schedule Post"
          description="Plan your content calendar"
          icon={<Calendar className="w-8 h-8" />}
          href="/schedule"
        />
        <QuickActionCard
          title="View Analytics"
          description="Check your video performance"
          icon={<BarChart2 className="w-8 h-8" />}
          href="/analytics"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivityList
              items={[
                { title: 'How to Make Pancakes', type: 'draft' },
                { title: 'Top 10 Travel Tips', type: 'draft' },
                { title: '5 Minute Workout', type: 'scheduled', date: 'Tomorrow, 9:00 AM' },
                { title: 'Book Review', type: 'scheduled', date: 'Friday, 3:00 PM' },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Total Views" value="13,670" />
              <Stat label="Total Likes" value="22,306" />
              <Stat label="Videos Created" value="5" />
              <Stat label="Avg. Watch Time" value="2:45" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function QuickActionCard({ title, description, icon, href }: QuickActionCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button className="w-full" asChild>
          <Link href={href}>Get Started</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

interface ActivityItem {
  title: string;
  type: 'draft' | 'scheduled';
  date?: string;
}

function RecentActivityList({ items }: { items: ActivityItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex justify-between items-center p-2 rounded hover:bg-accent">
          <span className="font-medium">{item.title}</span>
          <span className="text-sm text-muted-foreground">
            {item.type === 'draft' ? 'Draft' : item.date}
          </span>
        </li>
      ))}
    </ul>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

