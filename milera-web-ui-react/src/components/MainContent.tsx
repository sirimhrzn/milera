"use client"

import type { Discussion } from "@/lib/data"
import { MainFeed } from "./MainFeed"
import { LivestreamChat } from "./LiveStreamChat"
import { RightSidebar } from "./RightSideBar"



interface MainContentProps {
  currentPage: "home" | "discussion"
  selectedDiscussion: Discussion | null
  onDiscussionClick: (discussion: Discussion) => void
  showRightSidebar?: boolean
}

export function MainContent({
  currentPage,
  selectedDiscussion,
  onDiscussionClick,
  showRightSidebar = true,
}: MainContentProps) {
  return (
    <div className="flex flex-1">
      <MainFeed
        currentPage={currentPage}
        selectedDiscussion={selectedDiscussion}
        onDiscussionClick={onDiscussionClick}
      />
      {currentPage === "discussion" && selectedDiscussion ? (
        <LivestreamChat discussionId={selectedDiscussion.id} />
      ) : (
        showRightSidebar && <RightSidebar />
      )}
    </div>
  )
}
