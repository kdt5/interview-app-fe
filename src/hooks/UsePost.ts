import { useEffect, useState } from "react";
import { CommunityPost, PostCategory } from "../models/CommunityPost.model";
import { fetchPostCategories, fetchPostComments, fetchPostDetail, fetchPosts } from "../api/Post.api";
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