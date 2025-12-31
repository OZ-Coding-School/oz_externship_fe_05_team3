import { apiClient } from '@/api/apiclient';
import type {
  CommentListResponse,
  CreateCommentRequest,
  UpdateCommentRequest,
  Comment,
} from '@/types/api';

const BASE_PATH = '/api/v1/posts';

export const commentService = {
  // 댓글 목록 조회
  getComments(postId: number, page = 1, pageSize = 100) {
    return apiClient.get<CommentListResponse>(
      `${BASE_PATH}/${postId}/comments`,
      {
        params: { page, page_size: pageSize },
      }
    );
  },

  // 댓글 생성
  createComment(postId: number, data: CreateCommentRequest) {
    return apiClient.post<Comment>(`${BASE_PATH}/${postId}/comments`, data);
  },

  // 댓글 수정
  updateComment(postId: number, commentId: number, data: UpdateCommentRequest) {
    return apiClient.put<Comment>(
      `${BASE_PATH}/${postId}/comments/${commentId}`,
      data
    );
  },

  // 댓글 삭제
  deleteComment(postId: number, commentId: number) {
    return apiClient.delete<{ detail: string }>(
      `${BASE_PATH}/${postId}/comments/${commentId}`
    );
  },
};
