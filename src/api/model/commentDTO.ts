// src/api/comment/model/commentDTO.ts

import type { UserDTO } from '@/api/model/postDTO';

export interface CommentListResponseDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: CommentDTO[];
}

export interface CommentDTO {
  id: number;
  author: UserDTO;
  content: string;
  created_at: string;
  updated_at: string;
}

// 요청 DTO
export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}
