export interface CommunityPost {
    id: number;
    title: string;
    content: string;
    postCategoryId: number;
    user: {
        id: number;
        nickname: string;
        profileImageUrl: string;
        level: number;
        answerCount: number;
    }
    createdAt: string;
    updatedAt: string;
    viewCount: number;
    favoriteCount: number;
}