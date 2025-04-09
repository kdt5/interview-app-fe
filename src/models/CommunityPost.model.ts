export interface CommunityPost {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    user: {
        nickname: string;
    }
}