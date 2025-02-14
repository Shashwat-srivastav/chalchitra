'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Clock, CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function SchedulePage() {
  const [date, setDate] = useState<Date>()
  const [scheduledContent, setScheduledContent] = useState([
    { id: 1, title: "5 Minute Workout", date: "Tomorrow, 9:00 AM", platform: "YouTube" },
    { id: 2, title: "Healthy Breakfast Ideas", date: "Friday, 3:00 PM", platform: "Instagram" },
    { id: 3, title: "Travel Tips", date: "Next Monday, 11:00 AM", platform: "TikTok" },
  ])
  const { toast } = useToast()

  const handleSchedule = (event: React.FormEvent) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const title = (form.elements.namedItem('title') as HTMLInputElement).value
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value
    const platform = (form.elements.namedItem('platform') as HTMLSelectElement).value
    const time = (form.elements.namedItem('time') as HTMLInputElement).value

    if (!date || !title || !platform || !time) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const newContent = {
      id: scheduledContent.length + 1,
      title,
      date: `${format(date, 'PPP')}, ${time}`,
      platform,
    }

    setScheduledContent(prev => [newContent, ...prev])
    form.reset()
    setDate(undefined)

    toast({
      title: "Success",
      description: "Content scheduled successfully",
    })
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Schedule Your Content</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Content</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSchedule} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Enter content title" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Enter content description" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select name="platform" required>
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input type="time" id="time" name="time" className="pl-10" required />
                </div>
              </div>
              
              <Button type="submit" className="w-full">Schedule Content</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Scheduled Content</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence>
              {scheduledContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mb-4 last:mb-0"
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                        <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                          {item.platform}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

