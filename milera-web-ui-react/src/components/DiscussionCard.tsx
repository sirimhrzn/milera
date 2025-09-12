"use client"

import { MessageCircle, Clock } from "lucide-react"

interface Discussion {
  id: string
  title: string
  description: string
  uploadTime: Date
  postCount: number
  author: string
  category: string // Added category field to interface
}

interface DiscussionCardProps {
  discussion: Discussion
  onDiscussionClick: (discussion: Discussion) => void
}

function formatTime(date: Date): string {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)

  if (diffInHours < 24) {
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    }
    return `${diffInHours}h ago`
  } else {
    const month = date.toLocaleDateString("en-US", { month: "short" })
    const day = date.getDate()
    return `${month} ${day}`
  }
}

// function getCategoryColor(category: string): string {
//   const colors: { [key: string]: string } = {
//     Technology: "bg-blue-100 text-blue-800 border-blue-200",
//     Business: "bg-green-100 text-green-800 border-green-200",
//     Environment: "bg-emerald-100 text-emerald-800 border-emerald-200",
//     Education: "bg-purple-100 text-purple-800 border-purple-200",
//     Health: "bg-pink-100 text-pink-800 border-pink-200",
//     Sports: "bg-orange-100 text-orange-800 border-orange-200",
//     News: "bg-red-100 text-red-800 border-red-200",
//   }
//   return colors[category] || "bg-gray-100 text-gray-800 border-gray-200"
// }

export function DiscussionCard({ discussion, onDiscussionClick }: DiscussionCardProps) {
  const handleTitleClick = () => {
    onDiscussionClick(discussion)
  }

  return (
    <div className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
      <div className="space-y-3">
        {/* Discussion Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3
              className="font-semibold text-lg leading-tight mb-1 cursor-pointer hover:text-primary transition-colors"
              onClick={handleTitleClick}
            >
              {discussion.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>by {discussion.author}</span>
              <span>•</span>
              <span>{discussion.category}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{formatTime(discussion.uploadTime)} </span>
              </div>
            </div>
          </div>
        </div>

        {/* Discussion Stats */}
        <div className="flex items-center space-x-4 pt-2">
          <div className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">{discussion.postCount} posts</span>
          </div>
        </div>
      </div>
    </div>
  )
}
