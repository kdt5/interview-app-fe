export interface CommunityPost {
    id: number;
    title: string;
    content: string;
    user: {
        id: number;
        nickname: string;
        profileImageUrl: string;
        answerCount: number;
        level: number;
    }
    createdAt: string;
    updatedAt: string;
    viewCount: number;
    favoriteCount: number;
}