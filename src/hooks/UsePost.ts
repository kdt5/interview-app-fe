import { useEffect, useState } from "react";
import { CommunityPost } from "../models/CommunityPost.model";
import { fetchPosts } from "../api/Post.api";

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