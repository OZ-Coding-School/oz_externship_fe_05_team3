export const handlers = [
  // ✅ 여기에는 기존에 쓰던 다른 목 핸들러들이 올 수 있음.
  // 예: 로그인, 회원가입, 다른 도메인 API 등
  // 예시)
  // http.get('/api/v1/example', () => {
  //   return HttpResponse.json({ message: 'ok' }, { status: 200 });
  // }),
  // ============================
  // 댓글 관련 핸들러 (현재 비활성화)
  // ============================
  /*



  // 댓글 수정
  http.put(
    '/api/v1/posts/:postId/comments/:commentId',
    async ({ request, params }) => {
      const body = (await request.json()) as { content: string };
      const { commentId } = params;

      return HttpResponse.json(
        {
          id: Number(commentId),
          content: body.content,
          updated_at: new Date().toISOString(),
        },
        { status: 200 },
      );
    },
  ),

  // 댓글 삭제
  http.delete('/api/v1/posts/:postId/comments/:commentId', () => {
    return HttpResponse.json(
      { detail: '댓글이 삭제되었습니다.' },
      { status: 200 },
    );
  }),
  */
];

export default handlers;
