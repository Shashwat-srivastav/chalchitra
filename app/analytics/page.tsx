'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const viewData = [
  { name: 'Jan', views: 4000 },
  { name: 'Feb', views: 3000 },
  { name: 'Mar', views: 2000 },
  { name: 'Apr', views: 2780 },
  { name: 'May', views: 1890 },
  { name: 'Jun', views: 2390 },
]

const likeData = [
  { name: 'Jan', likes: 2400 },
  { name: 'Feb', likes: 1398 },
  { name: 'Mar', likes: 9800 },
  { name: 'Apr', likes: 3908 },
  { name: 'May', likes: 4800 },
  { name: 'Jun', likes: 3800 },
]

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('6m')

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard title="Total Views" value="13,670" trend="+5.2%" />
        <MetricCard title="Total Likes" value="22,306" trend="+3.1%" />
        <MetricCard title="Videos Created" value="5" trend="0%" />
        <MetricCard title="Avg. Watch Time" value="2:45" trend="+0:15" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>View Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Like Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={likeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likes" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MetricCard({ title, value, trend }) {
  const trendColor = trend.startsWith('+') ? 'text-green-500' : trend.startsWith('-') ? 'text-red-500' : 'text-gray-500'

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trendColor}`}>{trend}</p>
      </CardContent>
    </Card>
  )
}

