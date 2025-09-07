-- Add migration script here
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    discussion_id INTEGER NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
    parent_post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_posts_discussion_id ON posts(discussion_id);
CREATE INDEX idx_posts_parent_id ON posts(parent_post_id);
CREATE INDEX idx_posts_created_by ON posts(created_by);
