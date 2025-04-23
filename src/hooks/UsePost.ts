import { useEffect, useState } from "react";
import { CommunityPost } from "../models/CommunityPost.model";
import { fetchPostDetail, fetchPosts } from "../api/Post.api";

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