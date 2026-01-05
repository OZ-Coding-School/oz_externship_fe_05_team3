import { apiClient } from '@/api/index';
import type {
  Comment,
  CommentListResponse,
  CreateCommentRequest,
  UpdateCommentRequest,
} from '@/api/api';

const commentService = {
  getComments(postId: number, page = 1, pageSize = 100) {
    return apiClient
      .get<CommentListResponse>(`/posts/${postId}/comments`, {
        params: { page, page_size: pageSize },
      })
      .then((res) => res.data);
  },

  createComment(postId: number, data: CreateCommentRequest) {
    return apiClient
      .post<{ detail: string }>(`/posts/${postId}/comments`, data)
      .then((res) => res.data);
  },

  updateComment(postId: number, commentId: number, data: UpdateCommentRequest) {
    return apiClient
      .patch<Comment>(`/posts/${postId}/comments/${commentId}`, data)
      .then((res) => res.data);
  },

  deleteComment(postId: number, commentId: number) {
    return apiClient
      .delete<{ detail: string }>(`/posts/${postId}/comments/${commentId}`)
      .then((res) => res.data);
  },
};

export default commentService;
