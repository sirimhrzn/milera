import { discussions } from "@/lib/data";
import { DiscussionCard } from "./DiscussionCard";
import { TweetComposer } from "./TweetComposer";

export function MainFeed() {
    return (
        <div className="flex-1 max-w-3xl border-r border-border">
            <TweetComposer />

            <div className="divide-y divide-border">
                {discussions.map((discussion) => (
                    <DiscussionCard
                        key={discussion.id}
                        discussion={discussion}
                    />
                ))}
            </div>
        </div>
    );
}
