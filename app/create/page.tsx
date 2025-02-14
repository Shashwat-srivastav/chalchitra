'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Play, Pause, RotateCcw, ImageIcon, Type, Music, Upload } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export default function CreateVideo() {
  const [previewPlaying, setPreviewPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleCreateVideo = () => {
    // Simulating video creation process
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Your Video</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Video Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
              </TabsList>
              <TabsContent value="text" className="space-y-4">
                <Textarea placeholder="Enter your script here..." className="min-h-[200px]" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Voice Selection</span>
                  <select className="p-2 rounded border">
                    <option>Natural Voice 1</option>
                    <option>Natural Voice 2</option>
                    <option>Robot Voice</option>
                  </select>
                </div>
                <Button className="w-full">Generate Voice</Button>
              </TabsContent>
              <TabsContent value="media" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button><ImageIcon className="mr-2" /> Add Image</Button>
                  <Button><Type className="mr-2" /> Add Text</Button>
                </div>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <Upload className="mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Drag and drop files here or click to upload</p>
                </div>
              </TabsContent>
              <TabsContent value="audio" className="space-y-4">
                <Button className="w-full"><Music className="mr-2" /> Add Background Music</Button>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Volume</label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black mb-4 flex items-center justify-center rounded-lg overflow-hidden">
              <span className="text-white">Video Preview</span>
            </div>
            <div className="flex justify-center space-x-2">
              <Button onClick={() => setPreviewPlaying(!previewPlaying)}>
                {previewPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                {previewPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button variant="outline">
                <RotateCcw className="mr-2" /> Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <Button size="lg" className="w-full" onClick={handleCreateVideo}>Create Video</Button>
          {progress > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Creating video...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

