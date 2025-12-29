// 날짜 포맷팅 함수
export default function formatRelativeDate(dataString: string): string {
  const date = new Date(dataString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));

  if (diffMinutes < 1) {
    return '방금 전';
  }
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }
  if (diffDays < 7) {
    return `${diffDays}일 전`;
  }

  // 7일 이상이면 날짜 형식으로 표시
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
