"use client"

import { MainContent } from "@/components/MainContent"
import { Sidebar } from "@/components/Sidebar"
import type { Discussion } from "@/lib/data"
import { useState } from "react"


export function Home() {
  const [currentPage, setCurrentPage] = useState<"home" | "discussion">("home")
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null)

  const handleDiscussionClick = (discussion: Discussion) => {
    setSelectedDiscussion(discussion)
    setCurrentPage("discussion")
  }

  const handleHomeClick = () => {
    setCurrentPage("home")
    setSelectedDiscussion(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto flex">
        <Sidebar currentPage={currentPage} onHomeClick={handleHomeClick} />
        <MainContent
          currentPage={currentPage}
          selectedDiscussion={selectedDiscussion}
          onDiscussionClick={handleDiscussionClick}
          showRightSidebar={true}
        />
      </div>
    </div>
  )
}

