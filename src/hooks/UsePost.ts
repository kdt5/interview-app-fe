import { useEffect, useState } from "react";
import { CommunityPost, PostCategory } from "../models/CommunityPost.model";
import { createPost, editPost, fetchPostCategories, fetchPostComments, fetchPostDetail, fetchPosts } from "../api/Post.api";
import { Comment } from "../models/Comment.model";

export function useCommunityPosts() {
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);

  useEffect(() => {
    try {
      fetchPosts().then((posts) => {
        setCommunityPosts(posts);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { communityPosts };
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

export function useCommunityPostComments(targetId: number, categoryName: string) {
  const [communityPostComments, setCommunityPostComments] = useState<Comment[]>([]);

  useEffect(() => {
    try {
      fetchPostComments(targetId, categoryName).then((comment) => {
        setCommunityPostComments(comment);
      });
    } catch (error) {
      console.error(error);
    }
  }, [targetId, categoryName]);

  return { communityPostComments };
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