// 기존 타입에 추가
export interface Comment {
  id: number;
  author: {
    id: number;
    nickname: string;
    profile_img_url: string;
  };
  tagged_users: Array<{
    id: number;
    nickname: string;
  }>;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CommentListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Comment[];
}

export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}
