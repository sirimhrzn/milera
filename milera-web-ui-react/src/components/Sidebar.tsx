"use client"

import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  currentPage: "home" | "discussion"
  onHomeClick: () => void
}

export function Sidebar({ currentPage, onHomeClick }: SidebarProps) {
  const navigationItems = [
    { icon: Home, label: "Home", active: currentPage === "home", onClick: onHomeClick },
    { icon: Search, label: "Explore" },
    { icon: Bell, label: "Notifications" },
    { icon: Mail, label: "Messages" },
    { icon: Bookmark, label: "Bookmarks" },
    { icon: User, label: "Profile" },
    { icon: MoreHorizontal, label: "More" },
  ]

  return (
    <div className="w-56 h-screen sticky top-0 p-3 border-r border-border">
      <div className="flex flex-col h-full">
        <div className="mb-6 p-1">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-base">M</span>
            </div>
            <span className="text-lg font-bold text-primary">Milera</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-base py-3 px-4 rounded-full",
                item.active && "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
              onClick={item.onClick}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>

        <div className="flex items-center p-2 rounded-full hover:bg-muted cursor-pointer">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <div className="ml-2">
            <p className="font-semibold text-sm">John Doe</p>
            <p className="text-xs text-muted-foreground">@johndoe</p>
          </div>
        </div>
      </div>
    </div>
  )
}
