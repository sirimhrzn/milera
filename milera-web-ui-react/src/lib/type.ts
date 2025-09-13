export type Discussion = {
    id: string;
    slug: string;
    title: string;
    description: string;
    uploadTime: Date;
    postCount: number;
    author: string;
    category: string;
};

export type Post = {
    id: string;
    discussionId: string;
    user: {
        name: string;
        username: string;
        avatar: string;
        verified?: boolean;
    };
    content: string;
    timestamp: string;
    likes: number;
    retweets: number;
    replies: number;
    views: number;
    image?: string;
};

export type ChatMessage = {
    id: string;
    discussionId: string;
    author: string;
    verified: boolean;
    message: string;
    timestamp: Date;
};
