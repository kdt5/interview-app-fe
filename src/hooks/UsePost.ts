import { useCallback, useEffect, useState } from "react";
import { CommunityPost, PostCategory } from "../models/CommunityPost.model";
import { createPost, editPost, fetchMyPosts, fetchPostCategories, fetchPostComments, fetchPostDetail, fetchPosts, fetchTrendingPosts } from "../api/Post.api";
import { Comment } from "../models/Comment.model";

export function useTrendingPosts(categoryId?: number, limit?: number) {
  const [trendingPosts, setTrendingPosts] = useState<CommunityPost[]>([]);

  useEffect(() => {
    try {
      fetchTrendingPosts(categoryId, limit).then((posts) => {
        setTrendingPosts(posts);
      });
    } catch (error) {
      console.error(error);
    }
  }, [categoryId, limit]);

  return { trendingPosts };
}

export function useCommunityPosts(categoryId?: number) {
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);

  useEffect(() => {
    try {
      fetchPosts(categoryId).then((posts) => {
        setCommunityPosts(posts);
      });
    } catch (error) {
      console.error(error);
    }
  }, [categoryId]);

  return { communityPosts };
}

export function useMyPosts(categoryId?: number) {
  const [myPosts, setMyPosts] = useState<CommunityPost[]>([]);

  useEffect(() => {
    try {
      fetchMyPosts(categoryId).then((posts) => {
        setMyPosts(posts);
      });
    } catch (error) {
      console.error(error);
    }
  }, [categoryId]);

  return { myPosts };
}

export function useCommunityPostDetail(postId: number) {
  const [communityPostDetail, setCommunityPostDetail] = useState<CommunityPost>();

  useEffect(() => {
    try {
      fetchPostDetail(postId).then((post) => {
        setCommunityPostDetail(post);
      });
    } catch (error) {
      console.error(error);
    }
  }, [postId]);

  return { communityPostDetail };
}

export function usePostMutation() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitNewPost = async (
    title: string,
    content: string,
    categoryId: number
  ) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const success = await createPost(title, content, categoryId);
      setIsSuccess(success);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateExistingPost = async (
    postId: number,
    title: string,
    content: string,
    categoryId: number,
  ) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const success = await editPost(postId, title, content, categoryId);
      setIsSuccess(success);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isSuccess,
    error,
    submitNewPost,
    updateExistingPost,
  };
}

export function useCommunityPostComments(targetId: number, categoryName: string, sortType?: "createdAt" | "favoriteCount") {
  const [communityPostComments, setCommunityPostComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchPostComments(targetId, categoryName, sortType);
      setCommunityPostComments(result);
    } catch (err) {
      console.error("댓글 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  }, [targetId, categoryName, sortType]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    communityPostComments,
    loading,
    refetchComments: fetchComments,
  };
}

export function usePostCategories(){
  const [postCategories, setPostCategories] = useState<PostCategory[]>([]);

  useEffect(() => {
    try {
      fetchPostCategories().then((category) => {
        setPostCategories(category);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { postCategories };
}