import type { ChatMessage, Discussion, Post } from "./type";

export const discussions: Discussion[] = [
    {
        id: "1",
        slug: "future-of-ai-in-web-development", // Added slug
        title: "The Future of AI in Web Development",
        description:
            "Discussing how artificial intelligence is reshaping the way we build and design websites. From automated code generation to intelligent UX optimization.",
        uploadTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        postCount: 47,
        author: "TechTalks",
        category: "Technology",
    },
    {
        id: "2",
        slug: "remote-work-best-practices-2024", // Added slug
        title: "Remote Work Best Practices 2024",
        description:
            "Share your tips and experiences about working remotely. What tools, strategies, and habits have made you more productive?",
        uploadTime: new Date(Date.now() - 8 * 60 * 60 * 1000),
        postCount: 123,
        author: "WorkLife",
        category: "Business",
    },
    {
        id: "3",
        slug: "premier-league-transfer-window-updates", // Added slug
        title: "Premier League Transfer Window Updates",
        description:
            "Latest news and rumors from the transfer market. Who's moving where and what impact will it have on the upcoming season?",
        uploadTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
        postCount: 234,
        author: "FootballNews",
        category: "Sports",
    },
    {
        id: "4",
        slug: "global-climate-summit-outcomes", // Added slug
        title: "Breaking: Global Climate Summit Outcomes",
        description:
            "World leaders reach new agreements on carbon emissions and renewable energy targets. What does this mean for the future?",
        uploadTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
        postCount: 189,
        author: "WorldNews",
        category: "News",
    },
    {
        id: "5",
        slug: "sustainable-living-tips", // Added slug
        title: "Sustainable Living Tips",
        description:
            "Small changes that make a big difference for our planet. Let's discuss practical ways to live more sustainably in our daily lives.",
        uploadTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        postCount: 89,
        author: "EcoFriendly",
        category: "Environment",
    },
    {
        id: "6",
        slug: "blockchain-in-finance-2025",
        title: "Blockchain in Finance: 2025 Outlook",
        description:
            "Exploring the impact of blockchain technology on financial systems, from decentralized finance (DeFi) to secure transactions.",
        uploadTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
        postCount: 62,
        author: "CryptoInsider",
        category: "Technology",
    },
    {
        id: "7",
        slug: "mental-health-in-the-workplace",
        title: "Mental Health in the Workplace",
        description:
            "How are companies supporting employee mental health? Share strategies and discuss the importance of well-being at work.",
        uploadTime: new Date(Date.now() - 12 * 60 * 60 * 1000),
        postCount: 95,
        author: "HealthyMinds",
        category: "Business",
    },
    {
        id: "8",
        slug: "olympics-2025-preparations",
        title: "Olympics 2025: Preparations and Expectations",
        description:
            "With the next Olympics approaching, what are the key storylines? Discuss athletes, events, and host city preparations.",
        uploadTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
        postCount: 178,
        author: "SportsUpdate",
        category: "Sports",
    },
    {
        id: "9",
        slug: "space-exploration-milestones",
        title: "Space Exploration: Upcoming Milestones",
        description:
            "From Mars missions to lunar bases, what's next for space exploration? Share the latest news and your predictions.",
        uploadTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        postCount: 134,
        author: "SpaceNerd",
        category: "Science",
    },
    {
        id: "10",
        slug: "urban-farming-innovations",
        title: "Urban Farming: Innovations and Impact",
        description:
            "How can urban farming transform cities? Discuss new technologies and sustainable practices for local food production.",
        uploadTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        postCount: 76,
        author: "GreenCity",
        category: "Environment",
    },
    {
        id: "11",
        slug: "cybersecurity-trends-2025",
        title: "Cybersecurity Trends for 2025",
        description:
            "With cyber threats evolving, what are the latest trends in cybersecurity? Share tools, strategies, and predictions.",
        uploadTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
        postCount: 53,
        author: "SecureTech",
        category: "Technology",
    },
    {
        id: "12",
        slug: "gig-economy-challenges",
        title: "Challenges in the Gig Economy",
        description:
            "The gig economy is growing, but what are the challenges for workers? Discuss fair pay, benefits, and job security.",
        uploadTime: new Date(Date.now() - 9 * 60 * 60 * 1000),
        postCount: 88,
        author: "FreelanceLife",
        category: "Business",
    },
    {
        id: "13",
        slug: "esports-growth-and-opportunities",
        title: "Esports: Growth and Opportunities",
        description:
            "Esports is booming! Discuss the rise of competitive gaming, new titles, and opportunities for players and sponsors.",
        uploadTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        postCount: 201,
        author: "GamingWorld",
        category: "Sports",
    },
    {
        id: "14",
        slug: "global-economic-outlook-2025",
        title: "Global Economic Outlook for 2025",
        description:
            "What's driving the global economy in 2025? Discuss inflation, trade, and emerging markets in this critical year.",
        uploadTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
        postCount: 112,
        author: "EconWatch",
        category: "News",
    },
    {
        id: "15",
        slug: "renewable-energy-innovations",
        title: "Renewable Energy Innovations",
        description:
            "From next-gen solar to wave energy, what's the future of renewables? Share breakthroughs and their potential impact.",
        uploadTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        postCount: 65,
        author: "CleanEnergy",
        category: "Environment",
    },
];

export const posts: Post[] = [
    // AI Discussion Posts
    {
        id: "ai-1",
        discussionId: "1",
        user: {
            name: "CodeWizard",
            username: "CodeWizard",
            avatar: "/developer-working.png",
            verified: true,
        },
        content:
            "AI-powered code completion has increased my productivity by 40%. GitHub Copilot and similar tools are game changers for developers.",
        timestamp: "2h",
        replies: 45,
        retweets: 123,
        likes: 890,
        views: 12000,
    },
    {
        id: "ai-2",
        discussionId: "1",
        user: {
            name: "UXDesigner",
            username: "UXDesigner",
            avatar: "/diverse-designers-brainstorming.png",
            verified: false,
        },
        content:
            "AI is revolutionizing user research. We can now analyze user behavior patterns at scale and generate insights that would take weeks manually.",
        timestamp: "1h",
        replies: 23,
        retweets: 67,
        likes: 456,
        views: 8500,
    },
    {
        id: "ai-3",
        discussionId: "1",
        user: {
            name: "TechStartup",
            username: "TechStartup",
            avatar: "/vibrant-startup-office.png",
            verified: true,
        },
        content:
            "Just launched our AI-powered website builder. Users can describe their vision and get a fully functional site in minutes. The future is here! 🚀",
        timestamp: "30m",
        replies: 78,
        retweets: 234,
        likes: 1200,
        views: 15000,
    },

    // Remote Work Posts
    {
        id: "remote-1",
        discussionId: "2",
        user: {
            name: "RemoteWorker",
            username: "RemoteWorker",
            avatar: "/remote-worker.png",
            verified: false,
        },
        content:
            "My top 3 remote work tools:\n1. Notion for project management\n2. Loom for async communication\n3. Focus app for deep work sessions\n\nWhat are yours?",
        timestamp: "4h",
        replies: 156,
        retweets: 89,
        likes: 567,
        views: 9800,
    },
    {
        id: "remote-2",
        discussionId: "2",
        user: {
            name: "ProductivityGuru",
            username: "ProductivityGuru",
            avatar: "/productivity-expert.png",
            verified: true,
        },
        content:
            "The Pomodoro Technique has been a lifesaver for remote work. 25 minutes of focused work, 5-minute break. Repeat. Simple but effective.",
        timestamp: "2h",
        replies: 34,
        retweets: 145,
        likes: 789,
        views: 11200,
    },

    // Football Posts
    {
        id: "football-1",
        discussionId: "3",
        user: {
            name: "TransferExpert",
            username: "TransferExpert",
            avatar: "/football-expert.jpg",
            verified: true,
        },
        content:
            "🚨 BREAKING: Manchester United close to signing Joao Felix on loan from Atletico Madrid. Medical scheduled for tomorrow! #MUFC",
        timestamp: "1h",
        replies: 289,
        retweets: 567,
        likes: 2340,
        views: 45000,
    },
    {
        id: "football-2",
        discussionId: "3",
        user: {
            name: "FootballAnalyst",
            username: "FootballAnalyst",
            avatar: "/football-analyst.jpg",
            verified: true,
        },
        content:
            "Arsenal's midfield transformation this summer has been impressive. Rice, Havertz, and Ødegaard could be the best midfield trio in the league.",
        timestamp: "45m",
        replies: 123,
        retweets: 234,
        likes: 1567,
        views: 23000,
    },

    // Climate Posts
    {
        id: "climate-1",
        discussionId: "4",
        user: {
            name: "ClimateReporter",
            username: "ClimateReporter",
            avatar: "/news-reporter.jpg",
            verified: true,
        },
        content:
            "Historic agreement reached: 195 countries commit to 50% carbon reduction by 2030. This is the most ambitious climate target ever set globally.",
        timestamp: "30m",
        replies: 445,
        retweets: 1200,
        likes: 3400,
        views: 67000,
    },
    {
        id: "climate-2",
        discussionId: "4",
        user: {
            name: "GreenTech",
            username: "GreenTech",
            avatar: "/green-technology.png",
            verified: false,
        },
        content:
            "The renewable energy targets are ambitious but achievable. Solar and wind costs have dropped 85% in the last decade. We can do this! 🌱",
        timestamp: "15m",
        replies: 67,
        retweets: 189,
        likes: 890,
        views: 12000,
    },

    // Sustainability Posts
    {
        id: "sustain-1",
        discussionId: "5",
        user: {
            name: "EcoWarrior",
            username: "EcoWarrior",
            avatar: "/eco-warrior.jpg",
            verified: false,
        },
        content:
            "Small changes that made a big impact in my household:\n• Switched to LED bulbs (-60% electricity)\n• Meal planning (-30% food waste)\n• Bike commuting (-80% transport emissions)",
        timestamp: "6h",
        replies: 89,
        retweets: 156,
        likes: 678,
        views: 8900,
    },
];

export const chatMessages: ChatMessage[] = [
    // AI Discussion Chat
    {
        id: "chat-ai-1",
        discussionId: "1",
        author: "DevMaster",
        verified: true,
        message: "Anyone tried the new Claude 3.5 Sonnet for coding?",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
        id: "chat-ai-2",
        discussionId: "1",
        author: "AIEnthusiast",
        verified: false,
        message: "Yes! It's incredible for React components",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
        id: "chat-ai-3",
        discussionId: "1",
        author: "CodeNewbie",
        verified: false,
        message: "Which AI tool is best for beginners?",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
        id: "chat-ai-4",
        discussionId: "1",
        author: "TechLead",
        verified: true,
        message: "Start with GitHub Copilot, it's more predictable",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
        id: "chat-ai-5",
        discussionId: "1",
        author: "FullStackDev",
        verified: false,
        message: "AI is making junior devs obsolete 😰",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },

    // Remote Work Chat
    {
        id: "chat-remote-1",
        discussionId: "2",
        author: "DigitalNomad",
        verified: false,
        message: "Working from Bali this month! 🏝️",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    },
    {
        id: "chat-remote-2",
        discussionId: "2",
        author: "RemotePro",
        verified: true,
        message: "Time zone management is the hardest part",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    {
        id: "chat-remote-3",
        discussionId: "2",
        author: "WorkLifeBalance",
        verified: false,
        message: "Anyone else struggle with work-life boundaries?",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
        id: "chat-remote-4",
        discussionId: "2",
        author: "ProductivityHack",
        verified: false,
        message: "Separate workspace is key! Even if it's just a corner",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },

    // Football Chat
    {
        id: "chat-football-1",
        discussionId: "3",
        author: "ManUtdFan",
        verified: false,
        message: "Felix would be perfect for Ten Hag's system! 🔴",
        timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
    },
    {
        id: "chat-football-2",
        discussionId: "3",
        author: "ArsenalSupporter",
        verified: false,
        message: "Arsenal's midfield > City's midfield this season",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
        id: "chat-football-3",
        discussionId: "3",
        author: "FootballTactician",
        verified: true,
        message: "Rice's defensive stats are off the charts",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
        id: "chat-football-4",
        discussionId: "3",
        author: "PremierLeagueFan",
        verified: false,
        message: "This transfer window has been wild! 🤯",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },

    // Climate Chat
    {
        id: "chat-climate-1",
        discussionId: "4",
        author: "ClimateActivist",
        verified: false,
        message: "Finally some real action! 🌍",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    {
        id: "chat-climate-2",
        discussionId: "4",
        author: "ScienceTeacher",
        verified: true,
        message: "The science backs these targets. We can achieve this!",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
        id: "chat-climate-3",
        discussionId: "4",
        author: "PolicyWonk",
        verified: false,
        message: "Implementation will be the real challenge",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },

    // Sustainability Chat
    {
        id: "chat-sustain-1",
        discussionId: "5",
        author: "ZeroWasteLife",
        verified: false,
        message: "Composting changed everything for me! 🌱",
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
    },
    {
        id: "chat-sustain-2",
        discussionId: "5",
        author: "EcoMom",
        verified: false,
        message: "Teaching kids about sustainability early is so important",
        timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
    },
    {
        id: "chat-sustain-3",
        discussionId: "5",
        author: "GreenLiving",
        verified: true,
        message: "Solar panels paid for themselves in 3 years! ☀️",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
];

// Helper functions
export function getPostsByDiscussion(discussionId: string | undefined): Post[] {
    return posts.filter((post) => post.discussionId === discussionId);
}

export function getChatMessagesByDiscussion(
    discussionId: string | undefined
): ChatMessage[] {
    return chatMessages.filter(
        (message) => message.discussionId === discussionId
    );
}

export function getDiscussionBySlug(
    slug: string | undefined
): Discussion | undefined {
    return discussions.find((discussion) => discussion.slug === slug);
}
