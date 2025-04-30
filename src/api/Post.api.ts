import axios, { HttpStatusCode } from "axios";
import { BACKEND_URLS } from "../constants/Urls";
import { CommunityPost, PostCategory } from "../models/CommunityPost.model";
import { backendHttpClient } from "./BackendHttpClient.api";
import { replaceUrlParams } from "../utils/Url";
import { Comment } from "../models/Comment.model";

export async function fetchPosts(
  categoryId?: number
): Promise<CommunityPost[]> {
  const params = categoryId ? { categoryId } : {};
  const response = await backendHttpClient
    .get<CommunityPost[]>(BACKEND_URLS.POSTS.ALL, { params })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchPostDetail(postId: number): Promise<CommunityPost> {
  const response = await backendHttpClient
    .get<CommunityPost>(
      replaceUrlParams(BACKEND_URLS.POSTS.POST, {
        postId: postId.toString(),
      })
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchPostOwnership(postId: number): Promise<boolean> {
  try {
    await backendHttpClient.get<boolean>(
      replaceUrlParams(BACKEND_URLS.POSTS.OWNERSHIP, {
        postId: postId.toString(),
      })
    );
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      return false;
    }
    throw error;
  }
}

export async function fetchCommentOwnership(
  commentId: number
): Promise<boolean> {
  try {
    await backendHttpClient.get<boolean>(
      replaceUrlParams(BACKEND_URLS.COMMENT_OWNERSHIP, {
        commentId: commentId.toString(),
      })
    );
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      return false;
    }
    throw error;
  }
}

export async function createPost(
  title: string,
  content: string,
  categoryId: number
): Promise<boolean> {
  const response = await backendHttpClient
    .post(BACKEND_URLS.POSTS.ALL, {
      title: title,
      content: content,
      categoryId: categoryId,
    })
    .then((response) => response.status === HttpStatusCode.Created)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function editPost(
  postId: number,
  title: string,
  content: string,
  categoryId: number
): Promise<boolean> {
  const response = await backendHttpClient
    .patch(
      replaceUrlParams(BACKEND_URLS.POSTS.POST, {
        postId: postId.toString(),
      }),
      {
        title: title,
        content: content,
        categoryId: categoryId,
      }
    )
    .then((response) => response.status === HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function deletePost(postId: number): Promise<boolean> {
  const response = await backendHttpClient
    .delete(
      replaceUrlParams(BACKEND_URLS.POSTS.POST, {
        postId: postId.toString(),
      })
    )
    .then((response) => response.status === HttpStatusCode.NoContent)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function reportPost(
  targetId: number,
  reason: string
): Promise<boolean> {
  const response = await backendHttpClient
    .post(BACKEND_URLS.REPORTS.ALL, {
      targetType: "POST",
      targetId: targetId,
      reason: reason,
    })
    .then((response) => response.status === HttpStatusCode.Created)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchPostComments(
  targetId: number,
  categoryName: string
): Promise<Comment[]> {
  const response = await backendHttpClient
    .get<Comment[]>(`${BACKEND_URLS.COMMENTS}/${targetId}`, {
      params: { categoryName },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function createPostComment(
  targetId: number,
  categoryName: string,
  content: string,
  parentId?: number
): Promise<boolean> {
  const response = await backendHttpClient
    .post(
      `${BACKEND_URLS.COMMENTS}/${targetId}`,
      { content },
      {
        params: {
          categoryName,
          ...(parentId !== undefined && { parentId }),
        },
      }
    )
    .then((response) => response.status === HttpStatusCode.Created)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function editComment(
  commentId: number,
  content: string
): Promise<boolean> {
  const response = await backendHttpClient
    .patch(
      replaceUrlParams(BACKEND_URLS.COMMENTS_DETAIL, {
        commentId: commentId.toString(),
      }),
      {
        content: content,
      }
    )
    .then((response) => response.status === HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function deleteComment(commentId: number): Promise<boolean> {
  const response = await backendHttpClient
    .delete(
      replaceUrlParams(BACKEND_URLS.COMMENTS_DETAIL, {
        commentId: commentId.toString(),
      })
    )
    .then((response) => response.status === HttpStatusCode.NoContent)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchPostCategories(): Promise<PostCategory[]> {
  const response = await backendHttpClient
    .get<PostCategory[]>(BACKEND_URLS.POSTS.CATEGORIES)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
