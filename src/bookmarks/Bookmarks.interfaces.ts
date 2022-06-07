export interface NewBookmark {
    did: string
    userId: string
    description: string
}

export interface Bookmark extends NewBookmark {
    id: string
    createdAt: Date
}
