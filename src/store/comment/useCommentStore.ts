// // src/stores/comment/useCommentStore.ts
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { commentService } from '@/api/comment/services';
// import type {
//   CommentListResponse,
//   CreateCommentRequest,
//   UpdateCommentRequest,
// } from '@/types/api';

// const QUERY_KEYS = {
//   comments: (postId: number) => ['comments', postId] as const,
// };

// export const useCommentStore = (postId: number) => {
//   const queryClient = useQueryClient();

//   // 댓글 목록 조회
//   const {
//     data: commentsData,
//     isLoading,
//     error,
//   } = useQuery<CommentListResponse>({
//     queryKey: QUERY_KEYS.comments(postId),
//     queryFn: () => commentService.getComments(postId),
//     enabled: !!postId,
//   });

//   // 댓글 생성
//   const createCommentMutation = useMutation({
//     mutationFn: (data: CreateCommentRequest) =>
//       commentService.createComment(postId, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(postId) });
//     },
//   });

//   // 댓글 수정
//   const updateCommentMutation = useMutation({
//     mutationFn: (params: { commentId: number; data: UpdateCommentRequest }) =>
//       commentService.updateComment(postId, params.commentId, params.data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(postId) });
//     },
//   });

//   // 댓글 삭제
//   const deleteCommentMutation = useMutation({
//     mutationFn: (commentId: number) =>
//       commentService.deleteComment(postId, commentId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(postId) });
//     },
//   });

//   return {
//     // 데이터
//     comments: commentsData?.results || [],
//     count: commentsData?.count || 0,
//     isLoading,
//     error,

//     // 액션
//     createComment: createCommentMutation.mutate,
//     updateComment: updateCommentMutation.mutate,
//     deleteComment: deleteCommentMutation.mutate,

//     // 상태
//     isCreating: createCommentMutation.isPending,
//     isUpdating: updateCommentMutation.isPending,
//     isDeleting: deleteCommentMutation.isPending,
//   };
// };
