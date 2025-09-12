import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const trendingTopics = [
  { topic: "React", tweets: "125K Tweets" },
  { topic: "Next.js", tweets: "89K Tweets" },
  { topic: "TypeScript", tweets: "67K Tweets" },
  { topic: "Tailwind CSS", tweets: "45K Tweets" },
  { topic: "Web Development", tweets: "234K Tweets" },
]

const whoToFollow = [
  { name: "Vercel", username: "vercel", description: "Develop. Preview. Ship." },
  { name: "React", username: "reactjs", description: "The library for web and native user interfaces" },
  { name: "Tailwind CSS", username: "tailwindcss", description: "A utility-first CSS framework" },
]

export function RightSidebar() {
  return (
    <div className="w-80 p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          placeholder="Search Twitter"
          className="pl-12 bg-muted border-0 rounded-full focus-visible:ring-1 focus-visible:ring-primary"
        />
      </div>

      {/* Trending */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">What's happening</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((trend, index) => (
            <div key={index} className="hover:bg-muted/50 p-2 rounded cursor-pointer">
              <p className="text-sm text-muted-foreground">Trending in Technology</p>
              <p className="font-bold">{trend.topic}</p>
              <p className="text-sm text-muted-foreground">{trend.tweets}</p>
            </div>
          ))}
          <Button variant="ghost" className="w-full justify-start text-primary p-2">
            Show more
          </Button>
        </CardContent>
      </Card>

      {/* Who to follow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Who to follow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {whoToFollow.map((user, index) => (
            <div key={index} className="flex items-start justify-between">
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">{user.name[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{user.name}</p>
                  <p className="text-muted-foreground text-sm">@{user.username}</p>
                  <p className="text-muted-foreground text-xs mt-1">{user.description}</p>
                </div>
              </div>
              <Button size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                Follow
              </Button>
            </div>
          ))}
          <Button variant="ghost" className="w-full justify-start text-primary p-2">
            Show more
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
